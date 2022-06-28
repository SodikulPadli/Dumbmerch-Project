import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { API } from '../../config/api';

export default function Login() {
  const title = 'Login';
  document.title = 'DumbMerch | ' + title;
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/login', body, config);
      console.log(response.data.data.user);
      // Handling response here
      if (response?.status === 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data.user,
        });

        if (response.data.data.user.status === 'admin') {
          navigate('/product-admin');
        } else {
          navigate('/product');
        }

        const alert = (
          <Alert variant="success" className="py-1">
            Login Success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div className="d-flex justify-content-center">
      <div className="card-auth p-4  bg-dark rounded-2">
        <div style={{ fontSize: '36px', lineHeight: '49px', fontWeight: '700', color: 'white' }} className="mb-3">
          Login
        </div>
        {message && message}
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="mt-3">
            <input type="email" placeholder="Email" id="email" name="email" value={email} onChange={handleChange} className="px-3 py-2 mt-3" />
            <br />
            <input type="password" placeholder="Password" id="password" name="password" value={password} onChange={handleChange} className="px-3 py-2 mt-3" />
          </div>
          <div className="d-grid gap-2 mt-5">
            <button className="btn btn-login btn-danger">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

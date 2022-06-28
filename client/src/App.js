import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext } from './context/UserContext';

import Auth from './pages/Auth';
import Produk from './pages/Produk';
import DetailProduk from './pages/DetailProduk';
import Complain from './pages/Complain';
import Profile from './pages/Profile';
import CategoryProduk from './pages/CategoryProduk';
import ProductAdmin from './pages/ProdukAdmin';
import EditCategory from './pages/EditCategory';
import EditProduk from './pages/EditProduk';
import ComplainAdmin from './pages/ComplainAdmin';
import AddProductAdmin from './pages/AddProduk';
import AddCategoryAdmin from './pages/AddCategory';

import { API, setAuthToken } from './config/api';
// Init token on axios every time the app is refreshed here ...
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();

  // Init user context here ...
  const [state, dispatch] = useContext(UserContext);

  // Redirect Auth here ...
  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/product-admin');
      } else if (state.user.status === 'customer') {
        navigate('/product');
      }
      console.log(state);
    }
  }, [state]);

  // Create function for check user token here ...
  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Call function check user with useEffect didMount here ...
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/product" element={<Produk />} />
        <Route path="/product/:id" element={<DetailProduk />} />
        <Route path="/complain" element={<Complain />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/complain-admin" element={<ComplainAdmin />} />
        <Route path="/category-produk" element={<CategoryProduk />} />
        <Route path="/edit-category/:id" element={<EditCategory />} />
        <Route path="/product-admin" element={<ProductAdmin />} />
        <Route path="/edit-product/:id" element={<EditProduk />} />
        <Route path="/add-product" element={<AddProductAdmin />} />
        <Route path="/add-category" element={<AddCategoryAdmin />} />
      </Routes>
    </div>
  );
}

export default App;

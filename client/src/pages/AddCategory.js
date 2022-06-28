import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import NavbarAdmin from '../components/navbar/NavbarAdmin';

// Import useMutation
import { useMutation } from 'react-query';

// Import API config
import { API } from '../config/api';

export default function AddCategoryAdmin() {
  console.clear();

  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();

  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body
      const body = JSON.stringify({ name: category });

      // Configuration
      const config = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      };
      console.log(config);

      // Insert category data
      const response = await API.post('/category', body, config);

      console.log(response);

      navigate('/category-produk');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="bg-black text-white">
      <NavbarAdmin title={title} />
      <Container className="py-5 vh-100">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4 fw-bold" style={{ color: '#F74D4D' }}>
              Add Category
            </div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="d-grid">
                <input onChange={handleChange} placeholder="category" value={category} name="category" className="input-edit-category mt-4" />
                <div className="d-grid gap-2 mt-4">
                  <Button type="submit" variant="success" size="md">
                    Add
                  </Button>
                </div>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router';

import NavbarAdmin from '../components/navbar/NavbarAdmin';

// Import useQuery and useMutation
import { useQuery, useMutation } from 'react-query';

// Get API config
import { API } from '../config/api';

export default function UpdateCategoryAdmin() {
  const title = 'Category admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();

  const { id } = useParams();

  const [category, setCategory] = useState({ name: '' });

  // Fetching category data by id from database
  let { refetch } = useQuery('categoryCache', async () => {
    const response = await API.get('/category/' + id);
    return setCategory({ name: response.data.data.Category.name });
  });
  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Data body
      const body = JSON.stringify(category);

      // Configuration
      const config = {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
      };

      // Insert category data
      const response = await API.patch('/category/' + id, body, config);

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
            <div className="text-header-category mb-4 fw-bold">Edit Category</div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="d-grid">
                  <input onChange={handleChange} value={category.name} placeholder="category" className="input-edit-category mt-4" />
                  <div className="d-grid gap-2 mt-4">
                    <Button type="submit" variant="success" size="md">
                      Save
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

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

// Import useMutation and useQuery from react-query here ...
import { useMutation } from 'react-query';

import NavbarAdmin from '../components/navbar/NavbarAdmin';

// Get API config here ...
import { API } from '../config/api';

export default function AddProductAdmin() {
  // console.clear();
  const title = 'Product admin';
  document.title = 'DumbMerch | ' + title;

  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview

  // Create variabel for store data with useState here ...
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    stock: '',
  });

  // Fetching category data
  const getCategories = async () => {
    try {
      const response = await API.get('/categories');
      console.log(response.data.data.categories);
      setCategories(response.data.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // Create function for handle insert product data with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Data body
      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('stock', form.stock);
      formData.set('categoryId', categoryId);

      // Insert data user to database
      const response = await API.post('/product', formData, config);
      console.log(response.data.data);
      // Handling response here
      navigate('/product-admin');
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-black text-white">
      <NavbarAdmin title={title} />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="text-header-category mb-4 fw-bold" style={{ color: '#F74D4D' }}>
              Add Product
            </div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <div className="d-grid">
                {preview && (
                  <div>
                    <img
                      src={preview}
                      style={{
                        maxWidth: '150px',
                        maxHeight: '150px',
                        objectFit: 'cover',
                      }}
                      alt={preview}
                    />
                  </div>
                )}
                <input type="file" id="upload" name="image" hidden onChange={handleChange} />
                <label for="upload" className="label-file-add-product">
                  Upload file
                </label>
                <br />
                <input type="text" placeholder="Product Name" name="name" onChange={handleChange} className="input-edit-category mt-4" />
                <br />
                <textarea placeholder="Product Desc" name="desc" onChange={handleChange} className="input-edit-category mt-4" style={{ height: '130px' }}></textarea>
                <br />
                <input type="number" placeholder="Price (Rp.)" name="price" onChange={handleChange} className="input-edit-category mt-4" />
                <br />
                <input type="number" placeholder="Stock" name="stock" onChange={handleChange} className="input-edit-category mt-4" />
                <br />
                <div className="card-form-input mt-4 px-2 py-1 pb-2">
                  <div className="text-secondary mb-1" style={{ fontSize: '15px' }}>
                    Category
                  </div>
                  {categories?.map((item, index) => (
                    <label className="checkbox-inline me-4" key={index}>
                      <input type="checkbox" value={item?.id} onClick={handleChangeCategoryId} /> {item?.name}
                    </label>
                  ))}
                </div>

                <div className="d-grid ">
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

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import NavbarAdmin from '../components/navbar/NavbarAdmin';
import DeleteData from '../components/modal/DeleteData';
import dataProduk from '../fakeData/produk';
import ShowMoreText from 'react-show-more-text';
import rupiahFormat from 'rupiah-format';

// Import useQuery and useMutation
import { useQuery, useMutation } from 'react-query';

// API config
import { API } from '../config/api';

export default function ProductAdmin() {
  const title = 'Product admin';
  document.title = 'DumbMerch | ' + title;
  let navigate = useNavigate();

  // Variabel for delete product data
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  // Modal Confirm delete data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    console.log(response.data.data.products);
    return response.data.data.products;
  });

  // Create function handle get id product & show modal confirm delete data here ...
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  // Create function for handle delete product here ...
  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
    } catch (error) {
      console.log(error);
    }
  });

  // Call function for handle close modal and execute delete data with useEffect here ...
  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div className="bg-black">
      <NavbarAdmin title={title} />
      <Container fluid className="py-5" style={{ height: '89.5vh', color: 'white' }}>
        <Row>
          <Col xs="6">
            <div className="text-header-category mb-4 fw-bold" style={{ color: '#F74D4D' }}>
              List Product
            </div>
          </Col>
          <Col xs="6" className="text-end">
            <Link to={'/add-product'} style={{ textDecoration: 'none' }}>
              <Button className="btn-primary" style={{ width: '100px' }}>
                Add
              </Button>
            </Link>
          </Col>
          <Col xs="12">
            <Table striped hover size="lg" variant="dark">
              <thead>
                <tr>
                  <th width="1%" className="text-center">
                    No
                  </th>
                  <th>Photo</th>
                  <th>Product Name</th>
                  <th>Product Desc</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((data, index) => (
                  <tr>
                    <td className="align-middle text-center">{index + 1}</td>
                    <td className="align-middle">
                      <img
                        src={data.image}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'cover',
                        }}
                      />
                    </td>
                    <td className="align-middle">{data.name}</td>
                    <td className="align-middle">{data.desc}</td>
                    <td className="align-middle">{data.price}</td>
                    <td className="align-middle">{data.stock}</td>
                    <td className="align-middle">
                      <Link to={`/edit-product/` + data.id} style={{ textDecoration: 'none' }}>
                        <Button className="btn-sm btn-success me-2" style={{ width: '135px' }}>
                          Edit
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          handleDelete(data.id);
                        }}
                        className="btn-sm btn-danger"
                        style={{ width: '135px' }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
    </div>
  );
}

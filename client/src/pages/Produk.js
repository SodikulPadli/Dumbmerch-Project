import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import convertRupiah from 'rupiah-format';
import Navbar from '../components/navbar/NavbarUser';
// import dataProduk from '../fakeData/produk';
// import ProductCard from '../components/card/ListProduk';
// import SearchBar from '../components/SearchBar';

// Import useQuery
import { useQuery } from 'react-query';

// API config
import { API } from '../config/api';
import { useState } from 'react';
// import dataCategory from '../fakeData/category';

export default function Produk() {
  const title = 'Shop';
  document.title = 'DumbMerch | ' + title;
  const [searchTerm, setSearchTerm] = useState('');
  // Fetching product data from database
  // Create process for fetching products data from database with useQuery here ...
  let { data: products } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data.products;
  });

  return (
    <div className="bg-black">
      <Navbar title={title} />
      <Container className="mt-5 vh-100 ">
        <Row>
          <Col>
            <div className="my-5 me-3 fw-bold" style={{ color: '#F74D4D', fontSize: '20px' }}>
              <p>Product</p>
              <input
                type="text"
                placeholder="Search ..."
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
            </div>
          </Col>
        </Row>
        <Row xs={1} md={6} className="g-4 ">
          {products
            ?.filter((item) => {
              if (searchTerm == '') {
                return item;
              } else if (item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                return item;
              }
            })
            .map((item) => (
              <Link to={`/product/` + item.id} style={{ textDecoration: 'none' }}>
                <Col>
                  <Card>
                    <Card.Img src={item.image} className="img-fluid img-rounded" alt={item.name} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>{convertRupiah.convert(item.price)}</Card.Text>
                      <Card.Text>Stock : {item.stock}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Link>
            ))}
        </Row>
      </Container>
    </div>
  );
}

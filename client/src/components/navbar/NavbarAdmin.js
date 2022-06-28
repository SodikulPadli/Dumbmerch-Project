import React, { useContext } from 'react';
import { Container, Navbar as NavbarComp, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

import ImgDumbMerch from '../../assets/DumbMerch.png';

export default function NavbarAdmin() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    console.log(state);
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/');
  };
  return (
    <NavbarComp expand="lg" className="bg-black">
      <Container fluid>
        <NavbarComp.Brand>
          <Nav.Link as={Link} to="/product-admin" style={{ color: 'white' }}>
            <img src={ImgDumbMerch} className="img-fluid" style={{ width: '60px', height: '60px' }} alt="brand" />
          </Nav.Link>
        </NavbarComp.Brand>
        <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
        <NavbarComp.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/complain-admin" style={{ color: 'white' }}>
              Complain
            </Nav.Link>
            <Nav.Link as={Link} to="/category-produk" style={{ color: 'white' }}>
              Category
            </Nav.Link>
            <Nav.Link as={Link} to="/product-admin" style={{ color: 'white' }}>
              Product
            </Nav.Link>
            <Nav.Link onClick={logout} style={{ color: 'white' }}>
              Logout
            </Nav.Link>
          </Nav>
        </NavbarComp.Collapse>
      </Container>
    </NavbarComp>
  );
}

import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import dateFormat from 'dateformat';
import convertRupiah from 'rupiah-format';
import Navbar from '../components/navbar/NavbarUser';
import imgDumbMerch from '../assets/DumbMerch.png';

import imgBlank from '../assets/blank-profile.png';
import { UserContext } from '../context/UserContext';
// Import useQuery
import { useQuery } from 'react-query';

// API config
import { API } from '../config/api';

export default function Profile() {
  const title = 'Profile';
  document.title = 'DumbMerch | ' + title;

  const [state] = useContext(UserContext);

  // Fetching profile data from database
  let { data: profile, refetch: profileRefetch } = useQuery('profileCache', async () => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + localStorage.token,
      },
    };
    const response = await API.get('/profile', config);
    return response.data.data.profile;
  });

  // Fetching transactions data from database
  let { data: Transaction, refetch: transactionsRefetch } = useQuery('transactionsCache', async () => {
    const config = {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + localStorage.token,
      },
    };
    const response = await API.get('/transactions', config);
    return response.data.Transaction;
  });

  return (
    <div className="bg-black" style={{ color: 'white' }}>
      <Navbar title={title} />
      <Container fluid className="py-5 vh-100">
        <Row className="mx-3">
          <Col md="6">
            <div className="text-header-product mb-4 fw-bold " style={{ color: '#F74D4D' }}>
              My Profile
            </div>
            <Row>
              <Col md="6">
                <img src={profile?.image ? profile.image : imgBlank} className="img-fluid rounded" />
              </Col>
              <Col md="6">
                <div className="profile-header fw-bold" style={{ color: '#F74D4D' }}>
                  Name
                </div>
                <div className="profile-content">{state.user.name}</div>

                <div className="profile-header fw-bold" style={{ color: '#F74D4D' }}>
                  Email
                </div>
                <div className="profile-content">{state.user.email}</div>

                <div className="profile-header fw-bold" style={{ color: '#F74D4D' }}>
                  Phone
                </div>
                <div className="profile-content"> {profile?.phone ? profile?.phone : '-'}</div>

                <div className="profile-header fw-bold" style={{ color: '#F74D4D' }}>
                  Gender
                </div>
                <div className="profile-content">{profile?.gender ? profile?.gender : '-'}</div>

                <div className="profile-header fw-bold" style={{ color: '#F74D4D' }}>
                  Address
                </div>
                <div className="profile-content">{profile?.address ? profile?.address : '-'}</div>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <div className="text-header-product mb-4 fw-bold" style={{ color: '#F74D4D' }}>
              My Transaction
            </div>
            {Transaction?.length !== 0 ? (
              <>
                {Transaction?.map((item) => (
                  <div style={{ background: '#303030' }} className="p-2 mb-1">
                    <Container fluid className="px-1">
                      <Row>
                        <Col xs="3">
                          <img
                            src={item.product.image}
                            alt="img"
                            className="img-fluid"
                            style={{
                              height: '120px',
                              width: '170px',
                              objectFit: 'cover',
                            }}
                          />
                        </Col>
                        <Col xs="6">
                          <div
                            style={{
                              fontSize: '18px',
                              color: '#F74D4D',
                              fontWeight: '500',
                              lineHeight: '19px',
                            }}
                          >
                            {item.product.name}
                          </div>
                          <div
                            className="mt-2"
                            style={{
                              fontSize: '14px',
                              color: '#F74D4D',
                              fontWeight: '300',
                              lineHeight: '19px',
                            }}
                          >
                            {dateFormat(item.createdAt, 'dddd, d mmmm yyyy, HH:MM ')}
                            WIB
                          </div>

                          <div
                            className="mt-3"
                            style={{
                              fontSize: '14px',
                              fontWeight: '300',
                            }}
                          >
                            Price : {convertRupiah.convert(item.price)}
                          </div>

                          <div
                            className="mt-3"
                            style={{
                              fontSize: '14px',
                              fontWeight: '700',
                            }}
                          >
                            Sub Total : {convertRupiah.convert(item.price)}
                          </div>
                        </Col>
                        <Col xs="3">
                          <div className={`status-transaction-${item.status} rounded h-100 d-flex align-items-center justify-content-center`}>{item.status}</div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                ))}
              </>
            ) : (
              <div className="no-data-transaction">No transaction</div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

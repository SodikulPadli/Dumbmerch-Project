import React from 'react';
import default_profile from '../../assets/blank-profile.png';

export default function Contact() {
  return (
    <>
      <div>
        <img src={default_profile} style={{ width: '30%' }} />
        <div className="ps-1 text-contact d-flex flex-column justify-content-around">
          <p className="mb-0">Sodikul</p>
          <p className="text-contact-chat mt-1 mb-0">Hello</p>
        </div>
      </div>
    </>
  );
}

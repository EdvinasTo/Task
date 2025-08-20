import React from 'react';
import './personalInfo.css'

interface PersonalInfo {
  label: string
  name: string;
  address: string;
  phone: string;
}

const PersonalInformation: React.FC<PersonalInfo> = ({ label, name, address, phone}: PersonalInfo) => {

  return (
    <div className='container'>
      <h2 className='header'>{label} Information</h2>
      <div className='card'>
        <div className='personal-info'>
          <div className='label'>
            Name
          </div>
          <div className='value'>{name}</div>
        </div>

        <div className='personal-info'>
          <div className='label'>
            Address
          </div>
          <div className='value'>{address}</div>
        </div>

        <div className='personal-info'>
          <div className='label'>
            Phone
          </div>
          <div className='value'>{phone}</div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
import React from 'react';
import './client.css';
import client from '../client.json'

const PersonalForm = () => {
  return (
    <div className='form-container'>
    <div className="form-overflow">
      <form>
        <div className="form-group">
          <label className='left-label' htmlFor="name">Primary Address</label>
          <label className='right-label' htmlFor="name">{client.Primary_Address}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="email">RBC Sales Centre</label>
          <label className='right-label' htmlFor="name">{client.RBC_Sales_Centre}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="password">Relationship Manager</label>
          <label className='right-label' htmlFor="name">{client.Relationship_Manager}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="confirm-password">Sales Vice President</label>
          <label className='right-label' htmlFor="name">{client.Sales_Vice_President}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="confirm-password">Risk Manager</label>
          <label className='right-label' htmlFor="name">{client.Risk_Manager}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="confirm-password">Risk Owner(s)</label>
          <label className='right-label' htmlFor="name">{client.Risk_Owner}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="confirm-password">Related Borrowers</label>
          <label className='right-label' htmlFor="name">{client.Related_Borrowers}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="name">Borrower</label>
          <label className='right-label' htmlFor="name">{client.Borr}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="email">SN</label>
          <label className='right-label' htmlFor="name">{client.SN}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="password">Credit Facility Count</label>
          <label className='right-label' htmlFor="name">{client.Credit_Facility_Count}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="confirm-password">Authorized Exposer</label>
          <label className='right-label' htmlFor="name">{client.Authorized_Exposer}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="confirm-password">Outstanding Exposure</label>
          <label className='right-label' htmlFor="name">{client.Outstanding_Exposure}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="confirm-password">VIC Industry</label>
          <label className='right-label' htmlFor="name">{client.VIC_Industry}</label>
        </div>
        <div className="form-group">
          <label className='left-label' htmlFor="confirm-password">SIC Code</label>
          <label className='right-label' htmlFor="name">{client.SIC_Code}</label>
        </div>
      </form>
      </div>
      </div>
  );
};

export default PersonalForm;

import React from 'react';
import './client.css';
import client from '../client.json'

const PersonalForm = () => {
  return (
    <div className="form-container">
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
      </form>
    </div>
  );
};

export default PersonalForm;

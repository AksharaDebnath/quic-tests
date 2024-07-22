import React from 'react';
import './client.css';
import client from '../client.json';

const Overview = () => {
  return (
    <div className="box">
      <div className='top-form'>
        <div className="form-container-overview">
                <form>
                    <div className="form-group-overview">
                    <label className='left-label' htmlFor="name">Borrower</label>
                    <label className='right-label' htmlFor="name">{client.Borr}</label>
                    </div>
                    <div className="form-group-overview">
                    <label className='left-label' htmlFor="email">SN</label>
                    <label className='right-label' htmlFor="name">{client.SN}</label>
                    </div>
                    <div className="form-group-overview">
                    <label className='left-label' htmlFor="password">Credit Facility Count</label>
                    <label className='right-label' htmlFor="name">{client.Credit_Facility_Count}</label>
                    </div>
                    <div className="form-group-overview">
                    <label className='left-label' htmlFor="confirm-password">Authorized Exposer</label>
                    <label className='right-label' htmlFor="name">{client.Authorized_Exposer}</label>
                    </div>
                    <div className="form-group-overview">
                    <label className='left-label' htmlFor="confirm-password">Outstanding Exposure</label>
                    <label className='right-label' htmlFor="name">{client.Outstanding_Exposure}</label>
                    </div>
                    <div className="form-group-overview">
                    <label className='left-label' htmlFor="confirm-password">VIC Industry</label>
                    <label className='right-label' htmlFor="name">{client.VIC_Industry}</label>
                    </div>
                    <div className="form-group-overview">
                    <label className='left-label' htmlFor="confirm-password">SIC Code</label>
                    <label className='right-label' htmlFor="name">{client.SIC_Code}</label>
                    </div>
                </form>
            </div> 
            <div className='flags'>
                fgfhgfhf
            </div>     
          </div>
          <div className="borr-overview" >
              <h3 className='header-overview'>Borrower Overview</h3>
              <div className='overview-label'>{client.Borr_Overview}</div>
          </div>
    </div>
  );
};

export default Overview;

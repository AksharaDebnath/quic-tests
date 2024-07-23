import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryScatter, VictoryTooltip, VictoryAxis, VictoryTheme } from 'victory';
import './client.css';
import ews from './ews.png'

import client from '../client.json';
import historical from '../historical.json';

const Overview = () => {
  const data = [
    { date: historical[0].Date, transaction: historical[0].Type, amount: historical[0].Amount },
    { date: historical[1].Date, transaction: historical[1].Type, amount: historical[1].Amount },
    { date: historical[2].Date, transaction: historical[2].Type, amount: historical[2].Amount },
    { date: historical[3].Date, transaction: historical[3].Type, amount: historical[3].Amount },
    { date: historical[4].Date, transaction: historical[4].Type, amount: historical[4].Amount },
    { date: historical[5].Date, transaction: historical[5].Type, amount: historical[5].Amount },
    { date: historical[6].Date, transaction: historical[6].Type, amount: historical[6].Amount },
    { date: historical[7].Date, transaction: historical[7].Type, amount: historical[7].Amount },
    { date: historical[8].Date, transaction: historical[8].Type, amount: historical[8].Amount },
    { date: historical[9].Date, transaction: historical[9].Type, amount: historical[9].Amount },
  ];

  const sampleDatas = [
    { date: '2024-01-01', BRR: 65, CCRI: 2 },
    { date: '2024-02-01', BRR: 70, CCRI: 3 },
    { date: '2024-03-01', BRR: 75, CCRI: 4 },
    { date: '2024-04-01', BRR: 80, CCRI: 4 },
    { date: '2024-05-01', BRR: 85, CCRI: 4 },
    { date: '2024-06-01', BRR: 60, CCRI: 1 },
    { date: '2024-07-01', BRR: 65, CCRI: 2 },
    { date: '2024-08-01', BRR: 70, CCRI: 3 },
    { date: '2024-09-01', BRR: 68, CCRI: 4 },
    { date: '2024-10-01', BRR: 67, CCRI: 4 },
    { date: '2024-11-01', BRR: 66, CCRI: 4 },
  ];

  const formattedData = data.map((d) => ({
    x: new Date(d.date),
    y: d.amount,
    label: `${d.transaction}: $${d.amount}`
  }));

  const brrThreshold = 80;

  const isBRROverdue = (brr) => {
      return brr > brrThreshold;
  };

  const isCCRIRed4Months = (data) => {
      let consecutiveRedMonths = 0;
      return data.some(item => {
          if (item.CCRI === 4) {
              consecutiveRedMonths += 1;
          } else {
              consecutiveRedMonths = 0;
          }
          return consecutiveRedMonths >= 4;
      });
  };

  const getBRROverdueStatus = () => {
      return sampleDatas.map(data => ({
          date: data.date,
          BRR_Overdue: isBRROverdue(data.BRR),
      }));
  };

  const getPrediction = () => {
      const brrStatus = sampleDatas.some(data => isBRROverdue(data.BRR));
      const ccriStatus = isCCRIRed4Months(sampleDatas);

      return {
          BRR_Overdue: brrStatus,
          CCRI_Red_4_Months: ccriStatus,
      };
  };

  const prediction = getPrediction();
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="box">
      <div className='top-form'>
        <div className='overview'>
        <h3 className='header-overview'>Historical Transaction Data</h3>
        <div className="form-container-overview">
          <VictoryChart
            theme={VictoryTheme.material}
            scale={{ x: "time" }}
            height={160}
            width={600} 
          >
            <VictoryAxis
              tickFormat={(t) => {
                const date = new Date(t);
                return `${date.getMonth() + 1}/${date.getFullYear()}`;
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(t) => `$${t}`} // Format the y-axis values as currency
            />
            <VictoryScatter
              data={formattedData}
              size={5}
              labels={({ datum }) => datum.label}
              labelComponent={<VictoryTooltip />}
              style={{
                data: { fill: ({ datum }) => datum.transaction === 'APP' ? 'green' : 'blue' }
              }}
            />
            </VictoryChart>
            </div>
        </div> 
        <div className='flags'>
          <h1 className='flags-header'>{client.TSNE_Band}</h1>
          <h3 className='flags-header-date'>{'('+ formattedDate +')'} </h3>
            <div className='flags-table'>
                <div className={`circle ${prediction.BRR_Overdue ? 'red' : ''}`}></div>
                <h3>{prediction.BRR_Overdue ? 'BRR Overdue' : `BRR Status: OK`}</h3>
            </div>
            <div className='flags-table'>      
              <div className={`circle ${prediction.CCRI_Red_4_Months? 'red' : 'green'}`}></div>
              <h3>{prediction.CCRI_Red_4_Months ? 'CCRI Red 4-Mth' : 'CCRI Status OK'}</h3>
            </div>
        </div> 
      </div>
      <div className='top-form'>
        <div className="borr-overview" >
            <h3 className='header-overview-borr'>Borrower Overview</h3>
            <div className='overview-label'>{client.Borr_Overview}</div>
        </div>
        <div className='flags-ews ews'>
          <h3 className='header-overview-borr ews'>EWS System</h3>
          <img className='ews image' src={ews} alt="Description of the image" />
        </div> 
      </div>
    </div>
  );
};

export default Overview;

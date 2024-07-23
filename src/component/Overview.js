import React, { useState, useEffect } from 'react';
import { VictoryChart, VictoryScatter, VictoryTooltip, VictoryAxis, VictoryTheme } from 'victory';
import './client.css';

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

  const sampleData = [
    {brrDueDate: '2024-07-01', brrStatus: 'Pending', ccriStatus: 'Green', ccriLastUpdated: '2024-03-01' },
  ];

  const formattedData = data.map((d) => ({
    x: new Date(d.date),
    y: d.amount,
    label: `${d.transaction}: $${d.amount}`
  }));

  const [sampleDatas, setData] = useState(sampleData);

  const isBRROverdue = (brrDueDate, brrStatus) => {
    const today = new Date();
    const dueDate = new Date(brrDueDate);
    return brrStatus === 'Pending' && dueDate < today;
  };

  const isHighRiskCCRI = (ccriStatus) => {
    return ccriStatus === 'Red';
  };

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
              {sampleDatas.map((data, index) => {
                const overdue = isBRROverdue(data.brrDueDate, data.brrStatus);
                return (
                  <div className='flags-table' key={index}>
                    <div className={`circle ${overdue ? 'red glow' : ''}`}></div>
                    <h3>{overdue ? 'BRR Overdue' : data.brrStatus}</h3>
                  </div>
                );
              })}
            </div>
            <div className='flags-table'>
                {sampleDatas.map((data, index) => {
                    const overdue = isBRROverdue(data.brrDueDate, data.brrStatus);
                    return (
                      <div className='flags-table' key={index}>
                        <div className={`circle ${data.ccriStatus === 'Red' ? 'red' : 'green'}`}></div>
                        <h3>{data.ccriStatus === 'Red' ? 'CCRI Red' : 'CCRI Status'}</h3>
                      </div>
                    );
                  })}
            </div>
        </div> 
      </div>
      <div className="borr-overview" >
          <h3 className='header-overview-borr'>Borrower Overview</h3>
          <div className='overview-label'>{client.Borr_Overview}</div>
      </div>
    </div>
  );
};

export default Overview;

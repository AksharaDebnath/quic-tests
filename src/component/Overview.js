import React from 'react';
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

  const formattedData = data.map((d) => ({
    x: new Date(d.date),
    y: d.amount,
    label: `${d.transaction}: $${d.amount}`
  }));

  return (
    <div className="box">
      <div className='top-form'>
        <div className='overview'>
        <h3 className='header-overview'>Historical Transaction Data</h3>
        <div className="form-container-overview">
          <VictoryChart
            theme={VictoryTheme.material}
            scale={{ x: "time" }}
            height={230}
            width={450} 
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
            fgfhgfhf
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

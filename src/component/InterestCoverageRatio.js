import React from 'react';
import './Benchmarking.css';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryScatter, VictoryAxis } from 'victory';
import data from '../data.json';

const InterestCoverageRatio = () => {
  const { coverageRatio } = data;
  const { firstRowTable, secondRowTable, chartData } = coverageRatio;

  return (
    <div className="square">
      <h3 className='header-square'>Coverage Ratio</h3>
      <h3 className='First-row-header'>Interest Coverage Ratio</h3>
      <div className='First-row'>
        <div className='FirstRow-square'>
          <div className='FirstColumn-table'>
            <table className='FirstColumn-table-style'>
              <tr>
                <th>FY 2022</th>
                <th>FY 2023</th>
              </tr>
              <tbody>
                {firstRowTable.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='SecondColumn-table'>
            hello
          </div>
        </div>
      </div>
      <div className='Second-row'>
        <table className='SecondRow-table'>
            <tr>
                <th className='Second-row-th'>Peer Group</th>
                <td>{data.coverageRatio.secondRowTable.data[0]}</td>
                <td>{data.coverageRatio.secondRowTable.data[1]}</td>
                <td>{data.coverageRatio.secondRowTable.data[2]}</td>
            </tr>
            <tr>
                <th className='Second-row-th'>Client</th>
                <td>{data.coverageRatio.secondRowTable.data[0]}</td>
                <td>{data.coverageRatio.secondRowTable.data[1]}</td>
                <td>{data.coverageRatio.secondRowTable.data[2]}</td>
            </tr>
        </table>
      </div>
      <div className='Third-row'>
        <VictoryChart theme={VictoryTheme.material} width={800}>
          <VictoryAxis style={{ axis: { stroke: "transparent" }, tickLabels: { fill: "transparent" } }} />
          <VictoryAxis dependentAxis style={{ axis: { stroke: "transparent" }, tickLabels: { fill: "transparent" } }} />
          <VictoryLine
            data={chartData.data1}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#0a1e59" }
            }}
          />
          <VictoryScatter
            data={chartData.data1}
            labels={({ datum }) => datum.y}
            size={4}
            style={{
              data: { fill: "#0a1e59" },
              labels: { fill: "#0a1e59", fontSize: 30 }
            }}
          />
          <VictoryLine
            data={chartData.data2}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            style={{
              data: { stroke: "#00a2ee" }
            }}
          />
          <VictoryScatter
            data={chartData.data2}
            labels={({ datum }) => datum.y}
            size={4}
            style={{
              data: { fill: "#00a2ee" },
              labels: { fill: "#00a2ee", fontSize: 30 }
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default InterestCoverageRatio;

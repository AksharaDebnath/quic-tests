import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Button from '../component/Button';
import CoverageRatio from '../component/CoverageRatio';
import EBITDA from '../component/EBITDA';
import TNW from '../component/TNW';
import LTV from '../component/LTV';
import NOI from '../component/NOI';
import InterestCoverageRatio from '../component/InterestCoverageRatio';
import CurrentRatio from '../component/CurrentRatio';
import styled from 'styled-components';
import ChecklistComponent from '../component/ChecklistComponent'
import './gome.css';
import data from '../data.json';
import client from '../client.json';
import Box from '../component/Box';
import MapComponent from '../component/map';
import PersonalForm from '../component/PersonalForm';
import Overview from '../component/Overview';
 
const HomePageContainer = styled.div`
  display: flex;
`;

const Content = styled.div`

`;

const HomePage = () => {
  const [selectedShapes, setSelectedShapes] = useState([]);

  const handleCheckboxChange = (selectedOptions) => {
    setSelectedShapes(selectedOptions);
  };

  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (label) => {
    setSelectedButtons(prevSelectedButtons => {
      if (prevSelectedButtons.includes(label)) {
        return prevSelectedButtons.filter(item => item !== label);
      } else {
        return [...prevSelectedButtons, label];
      }
    });
  };

  const industry = data.industry;

  const manufacturing = [
    { name: 'CoverageRatio', component: <CoverageRatio /> },
    { name: 'EBITDA', component: <EBITDA /> },
    { name: 'TNW', component: <TNW /> },
    { name: 'CurrentRatio', component: <CurrentRatio /> },
  ];

  const realEstate = [
    { name: 'LTV', component: <LTV /> },
    { name: 'NOI', component: <NOI /> },
    { name: 'CurrentRatio', component: <CurrentRatio /> },
    { name: 'InterestCoverageRatio', component: <InterestCoverageRatio /> },
  ];

  const renderComponents = () => {
    if (industry === 'manufacturing') {
      return manufacturing.map((metric) => (
        <div key={metric.name}>{metric.component}</div>
      ));
    } else if (industry === 'realEstate') {
      return realEstate.map((metric) => (
        <div key={metric.name}>{metric.component}</div>
      ));
    } else {
      return <div>No components available for the selected industry</div>;
    }
  };

  return (
    <HomePageContainer>
      
      <Content>
        {/* <Sidebar onCheckboxChange={handleCheckboxChange} />
        <h1>Select Buttons</h1>
          <div>
            {['a', 'b', 'c'].map(label => (
              <Button 
                key={label} 
                label={label} 
                onClick={handleButtonClick} 
                isSelected={selectedButtons.includes(label)} 
              />
            ))}
          </div>
          <div>
            <h2>Selected Buttons</h2>
            <p>{selectedButtons.join(', ')}</p>
          </div>
           */}
        <div className="benchmarking">
          <ChecklistComponent />
          {renderComponents()}
        </div>
        <div className="clientAtGlance">
          <MapComponent address={client.Primary_Address} />
            <PersonalForm />
            <Overview/>
        </div>
      </Content>
    </HomePageContainer>
  );
};

export default HomePage;

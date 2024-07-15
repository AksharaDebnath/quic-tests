import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Button from '../component/Button';
import styled from 'styled-components';
import './gome.css';
 

const HomePageContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-left: 250px; /* Width of the sidebar */
  padding: 20px;
  flex: 1;
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

  return (
    <HomePageContainer>
      <Sidebar onCheckboxChange={handleCheckboxChange} />
      <Content>
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
      </Content>
    </HomePageContainer>
  );
};

export default HomePage;

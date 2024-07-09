import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Shapes from '../component/Shapes';
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

  return (
    <HomePageContainer>
      <Sidebar onCheckboxChange={handleCheckboxChange} />
      <Content>
      <div className="container">
      <div className="box map-box">
        <h2>Map</h2>
      </div>
      <div className="box form-box">
        <h2>Form</h2>
        <form>
          <div>
            <label>Name:</label>
            <input type="text" name="name" />
          </div>
          <div>
            <label>Address:</label>
            <input type="text" name="address" />
          </div>
          {/* Add more fields as needed */}
        </form>
      </div>
      <div className="box image-box">
0        <img src="https://via.placeholder.com/150" alt="Placeholder" />
      </div>
    </div>
      </Content>
    </HomePageContainer>
  );
};

export default HomePage;

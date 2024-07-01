import React, { useState } from 'react';
import Sidebar from '../component/Sidebar';
import Shapes from '../component/Shapes';
import styled from 'styled-components';

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
        <Shapes selectedShapes={selectedShapes} />
      </Content>
    </HomePageContainer>
  );
};

export default HomePage;

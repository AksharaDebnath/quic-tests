import React from 'react';
import styled from 'styled-components';

const ShapeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50%;
`;

const Square = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid green;
`;

const Shapes = ({ selectedShapes }) => {
  return (
    <ShapeContainer>
      {selectedShapes.includes('circle') && <Circle />}
      {selectedShapes.includes('square') && <Square />}
      {selectedShapes.includes('triangle') && <Triangle />}
      {/* Add more shapes as needed */}
    </ShapeContainer>
  );
};

export default Shapes;

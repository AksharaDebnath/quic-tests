// src/Button.js
import React from 'react';

const Button = ({ label, onClick, isSelected }) => {
  return (
    <button 
      onClick={() => onClick(label)} 
      style={{ 
        backgroundColor: isSelected ? 'blue' : 'white', 
        color: isSelected ? 'white' : 'black',
        margin: '5px'
      }}>
      {label}
    </button>
  );
};

export default Button;

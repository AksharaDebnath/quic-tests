import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  z-index: 1;

  &:focus {
    outline: none;
  }
`;

const SidebarContent = styled.div`
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  padding: 2em 1em 1em 0em;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
`;

const CheckboxContainer = styled.div`
  padding: 20px;

  label {
    display: block;
    margin-bottom: 10px;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }
`;

const WhiteFaTimes = styled(FaTimes)`
  color: white;
  height:0.6em;
`;

const Sidebar = ({ onCheckboxChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedOptions = checked
      ? [...selectedOptions, name]
      : selectedOptions.filter(option => option !== name);

    setSelectedOptions(updatedOptions);
    onCheckboxChange(updatedOptions);
  };

  return (
    <SidebarContainer>
      <ToggleButton onClick={handleToggle}>
        {isOpen ? <WhiteFaTimes /> : <FaBars />}
      </ToggleButton>
      <SidebarContent isOpen={isOpen}>
        <CheckboxContainer>
          <label>
            <input
              type="checkbox"
              name="circle"
              onChange={handleCheckboxChange}
            />
            Circle
          </label>
          <label>
            <input
              type="checkbox"
              name="square"
              onChange={handleCheckboxChange}
            />
            Square
          </label>
          <label>
            <input
              type="checkbox"
              name="triangle"
              onChange={handleCheckboxChange}
            />
            Triangle
          </label>
          {/* Add more checkboxes as needed */}
        </CheckboxContainer>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;

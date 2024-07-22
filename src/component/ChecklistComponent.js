import React, { useState } from 'react';
import './Benchmarking.css'; // Assuming you will style it with CSS

const ChecklistComponent = () => {
  // Initial state for checklists and selected items
  const [checklist1, setChecklist1] = useState({
    Market: false,
    MarketGroup: false,
    TSNEBand: false,
    Sector: false,
    Segment: false,
    VICIndustry: false,
  });

  const handleChecklist1Change = (event) => {
    const { name, checked } = event.target;
    setChecklist1({
      ...checklist1,
      [name]: checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedValues1 = Object.keys(checklist1)
      .filter((key) => checklist1[key])
      .join(', ');
    alert(`${selectedValues1}`);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="header">Benchmarking</div>
      <div className="checklist-container">
        <div className="column column1">
          <h3 className="header-peer">Peergroup One</h3>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="Market"
              checked={checklist1.option1}
              onChange={handleChecklist1Change}
            />
            Market
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="MarketGroup"
              checked={checklist1.option2}
              onChange={handleChecklist1Change}
            />
            Market Group
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="TSNEBand"
              checked={checklist1.option3}
              onChange={handleChecklist1Change}
            />
            TSNE Band
           </label>
           <label className="checkbox-label">
            <input
              type="checkbox"
              name="Sector"
              checked={checklist1.option3}
              onChange={handleChecklist1Change}
            />
            Sector Name
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="Segment"
              checked={checklist1.option3}
              onChange={handleChecklist1Change}
            />
            Segment Name
            </label>
            <label className="checkbox-label">
            <input
              type="checkbox"
              name="VICIndustry"
              checked={checklist1.option3}
              onChange={handleChecklist1Change}
            />
            VIC Industry
          </label>
        </div>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ChecklistComponent;

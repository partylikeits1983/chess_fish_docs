import React, { useState, CSSProperties } from 'react';

export const DividendCalculator = () => {
  const [monthlyVolume, setMonthlyVolume] = useState('');
  const [ownershipPercentage, setOwnershipPercentage] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);

  const calculateRevenue = () => {
    const volume = Number(monthlyVolume) || 0;
    const ownership = Number(ownershipPercentage) || 0;
    const calculatedRevenue = volume * 0.07 * (ownership / 100);
    setMonthlyRevenue(calculatedRevenue);
    setYearlyRevenue(calculatedRevenue * 12);
  };
  

  const handleMonthlyVolumeChange = (e) => {
    setMonthlyVolume(e.target.value);
  };
  
  const handleOwnershipPercentageChange = (e) => {
    setOwnershipPercentage(e.target.value);
  };
  

  const calculatorStyle: CSSProperties = {
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px',
    margin: 'auto'
  };

  const inputStyle = {
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  };
  
  const labelStyle: CSSProperties = {
    width: '30%', // Adjust this value as needed
    textAlign: 'left', // TypeScript should recognize this as a valid value for TextAlign
    paddingRight: '5px' // Adds space between label and input
  };
  
  const inputFieldStyle = {
    width: '50%', // Adjust this value as needed
    marginLeft: '10px', // Keeps space between label and input
    border: '1px solid black' // Adds a 1px black border to the input fields
  };
  

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    border: '1px solid',
    borderRadius: '5px',

    cursor: 'pointer'
  };

  const revenueStyle: CSSProperties = {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  return (
    <div style={calculatorStyle}>
    <div style={inputStyle}>
      <label style={labelStyle}>
        Monthly Volume in USD:
      </label>
      <input
        type="number"
        value={monthlyVolume}
        onChange={handleMonthlyVolumeChange}
        style={inputFieldStyle}
      />
    </div>
    <div style={inputStyle}>
      <label style={labelStyle}>
        Percentage of Ownership:
      </label>
      <input
        type="number"
        value={ownershipPercentage}
        onChange={handleOwnershipPercentageChange}
        style={inputFieldStyle}
      />
    </div>
      <button style={buttonStyle} onClick={calculateRevenue}>Calculate Revenue</button>
      <div style={revenueStyle}>
        <p>Estimated Monthly Revenue: ${monthlyRevenue.toFixed(2)}</p>
        <p>Estimated Yearly Revenue: ${yearlyRevenue.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default DividendCalculator;

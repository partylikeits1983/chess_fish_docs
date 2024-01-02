import React, { useState } from 'react';

export const DividendCalculator = () => {
  const [monthlyVolume, setMonthlyVolume] = useState('');
  const [ownershipPercentage, setOwnershipPercentage] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);

  const calculateRevenue = () => {
    const calculatedRevenue = (Number(monthlyVolume) || 0) * 0.07 * ((Number(ownershipPercentage) || 0) / 100);
    setMonthlyRevenue(calculatedRevenue);
    setYearlyRevenue(calculatedRevenue * 12);
  };

  const handleMonthlyVolumeChange = (e) => {
    const value = e.target.value;
    setMonthlyVolume(value === '' ? '' : Number(value));
  };

  const handleOwnershipPercentageChange = (e) => {
    const value = e.target.value;
    setOwnershipPercentage(value === '' ? '' : Number(value));
  };

  const calculatorStyle = {
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
  
  const labelStyle = {
    width: '30%', // Adjust this value as needed
    textAlign: 'left',
    paddingRight: '5px' // Adds space between label and input
  };
  
  const inputFieldStyle = {
    width: '50%', // Adjust this value as needed
    marginLeft: '10px' // Keeps space between label and input
  };

  const buttonStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    border: '1px solid',
    borderRadius: '5px',

    cursor: 'pointer'
  };

  const revenueStyle = {
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

import React from 'react';

const QuantityButton = ({ quantity, handleQuantityChange }) => {
  const handleClick = (e) => {
    const buttonWidth = e.target.offsetWidth;
    const clickPosition = e.clientX - e.target.getBoundingClientRect().left;

    if (clickPosition < buttonWidth / 2) {
      // Left side click - Decrease
      handleQuantityChange(false);
    } else {
      // Right side click - Increase
      handleQuantityChange(true);
    }
  };

  return (
    <button onClick={handleClick} style={{
      width: '140px',
      height: '50px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '18px',
      padding: '0 15px',
      cursor: 'pointer',
      borderRadius: '5px',
      backgroundColor: '#f0f0f0',
      border: '1px solid #ccc',
      color:'black'
    }}>
      <span style={{ flexGrow: 1, textAlign: 'left' }}>-</span>
      <span style={{ fontWeight: 'bold' }}>{quantity}</span>
      <span style={{ flexGrow: 1, textAlign: 'right' }}>+</span>
    </button>
  );
};

export default QuantityButton;

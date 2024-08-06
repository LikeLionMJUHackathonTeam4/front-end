import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import '../styles/CustomButton.css';

const CustomButton = ({ text, onClick, type = 'button' }) => {
  return (
    <Button 
      variant="outline-primary" 
      className="button" 
      onClick={onClick} 
      type={type}
    >
      {text}
    </Button>
  );
};

export default CustomButton;

import React from 'react';

const Input = ({ type, value, onChange, placeholder, onBlur }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
};

export default Input;

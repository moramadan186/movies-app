import React from "react";
import "./input.scss";
const Input = ({ type, placholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placholder}
      value={value}
      onChange={onChange ? (e) => onChange(e) : null}
    />
  );
};

export default Input;

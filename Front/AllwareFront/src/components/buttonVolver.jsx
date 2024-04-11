import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonVolver = ({ setVisible }) => {
  const handleOnClick = () => {
    setVisible((prev) => !prev);
  };

  return <StyledButton onClick={handleOnClick}>Volver</StyledButton>;
};

export default ButtonVolver;

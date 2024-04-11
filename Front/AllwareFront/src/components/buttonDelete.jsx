import React from "react";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteVenta } from "./redux/reducers/ventasRed";

// Define the styled button component
const DeleteButton = styled.button`
  background-color: #ff6347;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #cc4b38;
  }
`;

// Style the delete icon
const DeleteIcon = styled(FaTrash)`
  margin-right: 4px;
`;

const DeleteButtonWithIcon = ({ rut }) => {
  const dispatch = useDispatch();
  const handleOnClickDelete = async () => {
    try {
      const response = await axios.post("http://localhost:4050/deleteVendedor", { rut });
      dispatch(deleteVenta(rut));
      console.log("Data deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <DeleteButton onClick={handleOnClickDelete}>
      <DeleteIcon />
    </DeleteButton>
  );
};

export default DeleteButtonWithIcon;

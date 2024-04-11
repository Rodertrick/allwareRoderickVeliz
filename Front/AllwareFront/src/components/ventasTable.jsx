import styled from "styled-components";
import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVentas, resetVentas } from "./redux/reducers/ventasRed";
import axios from "axios";
import DeleteButtonWithIcon from "./buttonDelete";

// Styled components for table, table row, and table data
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableData = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const ButtonContainer = styled.div`
  position: relative;
  text-align: center;
  margin-top: 20px;
  & > * {
    margin-right: 10px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;

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

const PAGE_SIZE = 10;

const VentasTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const ventasDat = useSelector((state) => state.ventas);

  const totalPages = Math.ceil(ventasDat.length / PAGE_SIZE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleData = ventasDat.slice(startIndex, startIndex + PAGE_SIZE);

  useEffect(() => {
    axios
      .get("http://localhost:4050/ventas")
      .then((response) => {
        dispatch(resetVentas());
        dispatch(addVentas(response.data));
        console.log(ventasDat);
      })
      .catch((error) => console.error("Ventas error:", error));
  }, []);

  return (
    <>
      <Table>
        <thead>
          <TableRow>
            <TableData>Nombre</TableData>
            <TableData>RUT Vendedor</TableData>
            <TableData>Patente Vehículo</TableData>
            <TableData>Marca Vehículo</TableData>
            <TableData>Modelo Vehículo</TableData>
            <TableData>Color</TableData>
            <TableData></TableData>
          </TableRow>
        </thead>
        <tbody>
          {visibleData.map((item, index) => (
            <TableRow key={index}>
              <TableData>{item.nombre + " " + item.apellido}</TableData>
              <TableData>{item.rut}</TableData>
              <TableData>{item.patente}</TableData>
              <TableData>{item.marca}</TableData>
              <TableData>{item.modelo}</TableData>
              <TableData>{item.color}</TableData>
              <TableData>
                <DeleteButtonWithIcon rut={item.rut} />
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ButtonContainer>
        <StyledButton onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </StyledButton>
        <StyledButton onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </StyledButton>
      </ButtonContainer>
    </>
  );
};

export default VentasTable;

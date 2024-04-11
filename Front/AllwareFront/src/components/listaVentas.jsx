import React from "react";
import styled from "styled-components";
import ButtonVolver from "./buttonVolver";
import VentasTable from "./ventasTable";

const CardContainer = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  color: #333;
`;

const CardContent = styled.p`
  color: #666;
`;

const CardVentas = ({ setListaVentasVisible }) => {
  return (
    <CardContainer>
      <CardTitle>Listado de Ventas</CardTitle>
      <CardContent>
        <VentasTable />
      </CardContent>
      <ButtonVolver setVisible={setListaVentasVisible} />
    </CardContainer>
  );
};

export default CardVentas;

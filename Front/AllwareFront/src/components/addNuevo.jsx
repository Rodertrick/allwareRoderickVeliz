import React from "react";
import styled from "styled-components";
import ButtonVolver from "./buttonVolver";
import Formulario from "./formulario";

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

const CardAddNuevo = ({ setAddNuevoVisible }) => {
  return (
    <CardContainer>
      <CardTitle>Agregar Nueva Venta</CardTitle>
      <CardContent>
        <Formulario setAddNuevoVisible={setAddNuevoVisible} />
      </CardContent>
      <ButtonVolver setVisible={setAddNuevoVisible} />
    </CardContainer>
  );
};

export default CardAddNuevo;

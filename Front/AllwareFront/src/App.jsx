import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonLista from "./components/buttonLista";
import "./App.css";
import ButtonAdd from "./components/buttonAdd";
import { addVendedores, resetVendedores } from "./components/redux/reducers/vendedoresRed";
import { addAutomoviles, resetAutomoviles } from "./components/redux/reducers/automovilesRed";
import { useDispatch, useSelector } from "react-redux";
import CardVentas from "./components/listaVentas";
import CardAddNuevo from "./components/addNuevo";
import styled from "styled-components";

const CenteredContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: calc(100% - 40px); /* Adjust the width as needed */
  max-width: 1000px; /* Set a maximum width */
  height: calc(100% - 40px); /* Adjust the height as needed */
  max-height: 1200px; /* Set a maximum height */
  overflow-y: auto; /* Add vertical scrollbar if needed */
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

function App() {
  const [isListaVentasVisible, setListaVentasVisible] = useState(false);
  const [isAddNuevoVisible, setAddNuevoVisible] = useState(false);
  const vendedoresDat = useSelector((state) => state.vendedores);
  const automovilesDat = useSelector((state) => state.automoviles);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch all vendedores
    axios
      .get("http://localhost:4050/vendedores")
      .then((response) => {
        dispatch(resetVendedores());
        dispatch(addVendedores(response.data.return));
        console.log(vendedoresDat);
      })
      .catch((error) => console.error("Vendedores error:", error));

    // Fetch all automoviles
    axios
      .get("http://localhost:4050/automoviles")
      .then((response) => {
        dispatch(resetAutomoviles());
        dispatch(addAutomoviles(response.data.return));
        console.log(automovilesDat);
      })
      .catch((error) => console.error("Automoviles error:", error));
  }, []);

  return (
    <>
      {isListaVentasVisible && (
        <CenteredContainer>
          <CardVentas setListaVentasVisible={setListaVentasVisible} />
        </CenteredContainer>
      )}
      {isAddNuevoVisible && (
        <CenteredContainer>
          <CardAddNuevo setAddNuevoVisible={setAddNuevoVisible} />
        </CenteredContainer>
      )}
      {!isListaVentasVisible && (
        <ButtonContainer>
          <ButtonLista setListaVentasVisible={setListaVentasVisible} />
          <ButtonAdd setAddNuevoVisible={setAddNuevoVisible} />
        </ButtonContainer>
      )}
    </>
  );
}

export default App;

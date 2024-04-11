import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { extractData } from "./utils/nuevoSep";
import axios from "axios";

// Styled components
const FormContainer = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const SectionWrapper = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
`;

const FormContent = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

const Formulario = ({ setAddNuevoVisible }) => {
  const automoviles = useSelector((state) => state.automoviles);

  const marcas = automoviles ? Array.from(new Set(automoviles.map((auto) => auto.marca))) : [];

  const [selectedMarca, setSelectedMarca] = useState("");

  // Extrae modelos únicos para la lista
  const modelos =
    automoviles && selectedMarca
      ? Array.from(
          new Set(
            automoviles.filter((auto) => auto.marca === selectedMarca).map((auto) => auto.modelo)
          )
        )
      : [];

  // Maneja cambios en la marca seleccionada
  const handleMarcaChange = (event) => {
    setSelectedMarca(event.target.value);
  };

  // Resetea selectedMarca
  useEffect(() => {
    setSelectedMarca("");
  }, []);

  console.log("Selected marca:", selectedMarca);
  console.log("Modelos:", modelos);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const nombreCompleto = formData.get("nombreCompleto");
    const rutVendedor = formData.get("rutVendedor");
    const patente = formData.get("patente");
    const precio = formData.get("precio");
    const color = formData.get("color");

    console.log(formData);

    // Funciones para validar
    const isText = (value) => /^[a-zA-Z\s]*$/.test(value);
    const isTextColor = (value) => /^[a-zA-Z]*$/.test(value);
    const isRut = (value) => /^[0-9]+[0-9kK]{1}$/.test(value);
    const isNumber = (value) => /^[0-9]+$/.test(value);
    const isPatenteValid = (value) => {
      const pattern = /^[a-zA-Z]{4}\d{2}$|^[a-zA-Z]{2}\d{4}$|^[a-zA-Z]{3}\d{3}$/;
      return pattern.test(value);
    };

    // Validaciones
    if (!isText(nombreCompleto)) {
      alert("Nombre Completo debe contener solo letras y espacios.");
      return;
    }

    if (!isTextColor(color)) {
      alert("Color debe contener solo letras y espacios.");
      return;
    }

    if (!isRut(rutVendedor)) {
      alert("Rut Vendedor debe contener solo números y 'k' (o 'K').");
      return;
    }

    if (!isNumber(precio)) {
      alert("Precio debe ser un número.");
      return;
    }

    if (!isPatenteValid(patente)) {
      alert("Patente debe seguir el formato AASS55 o AA5566 ASD456");
      return;
    }

    const dataToSend = extractData(formData);
    console.log(dataToSend);

    axios
      .post("http://localhost:4050/addNuevo", dataToSend)
      .then((response) => {
        console.log(response);
        alert("Datos ingresados exitosamente");
        setAddNuevoVisible((prev) => !prev);
      })
      .catch((error) => console.error("Vendedores error:", error));
  };

  return (
    <FormContainer>
      <SectionWrapper>
        <SectionTitle>Datos del Vendedor</SectionTitle>
        <FormContent onSubmit={handleSubmit}>
          <Label htmlFor="nombreCompleto">Nombre Completo:</Label>
          <Input type="text" id="nombreCompleto" name="nombreCompleto" required />

          <Label htmlFor="rutVendedor">Rut Vendedor:</Label>
          <Input type="text" id="rutVendedor" name="rutVendedor" required />

          <SectionTitle>Datos del Vehículo</SectionTitle>
          <Label htmlFor="patente">Patente:</Label>
          <Input type="text" id="patente" name="patente" required />

          <Label htmlFor="marca">Marca:</Label>
          <Select
            id="marca"
            name="marca"
            value={selectedMarca}
            required
            onChange={handleMarcaChange}>
            {marcas.map((marca, index) => (
              <option key={index} value={marca}>
                {marca}
              </option>
            ))}
          </Select>

          <Label htmlFor="modelo">Modelo:</Label>
          <Select id="modelo" name="modelo" required disabled={!selectedMarca}>
            {modelos.map((modelo, index) => (
              <option key={index} value={modelo}>
                {modelo}
              </option>
            ))}
          </Select>

          <Label htmlFor="precio">Precio:</Label>
          <Input type="number" id="precio" name="precio" required />

          <Label htmlFor="color">Color:</Label>
          <Input type="text" id="color" name="color" required />

          <SubmitButton type="submit">Enviar</SubmitButton>
        </FormContent>
      </SectionWrapper>
    </FormContainer>
  );
};

export default Formulario;

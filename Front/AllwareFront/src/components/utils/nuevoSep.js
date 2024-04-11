export const extractData = (formData) => {
  // Extraer vendedor data
  const nombreCompleto = formData.get("nombreCompleto");
  const rutVendedor = formData.get("rutVendedor");
  const [nombre, apellido] = nombreCompleto.split(" ");
  const vendedorData = {
    rut_vendedor: rutVendedor,
    nombre: nombre,
    apellido: apellido ? apellido : "",
  };

  // Extraer automovil data
  const automovilData = {
    patente: formData.get("patente"),
    marca: formData.get("marca"),
    modelo: formData.get("modelo"),
    precio: formData.get("precio"),
    rut_vendedor: formData.get("rutVendedor"),
    color: formData.get("color"),
  };

  console.log({ vendedorData, automovilData });

  return { vendedorData, automovilData };
};

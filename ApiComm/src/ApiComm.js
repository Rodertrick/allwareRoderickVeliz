import express from "express";
import soap from "soap";
import cors from "cors";
import dotenv from "dotenv";
import {
  insertDataVendedor,
  insertDataAutomovil,
  deleteDataVendedorFromTable,
  deleteAutomovilByVendedorRut,
} from "./database.js";

dotenv.config();

const url = process.env.URL;
const PORT = process.env.PORT || 3000;

const createSoapClient = (url) => {
  return new Promise((resolve, reject) => {
    soap.createClient(url, (err, client) => {
      if (err) {
        reject(err);
      } else {
        resolve(client);
      }
    });
  });
};

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (req, res) => {
  const status = {
    Status: "Running",
  };
  res.send(status);
});

app.get("/vendedores", async (req, res) => {
  try {
    const client = await createSoapClient(url);
    client.DatabaseServiceImplService.DatabaseServiceImplPort.fetchAllVendedores((err, result) => {
      if (err) {
        console.error("Error llamando SOAP method:", err);
        res.status(500).send("Error llamando SOAP method");
        return;
      }
      console.log("Vendedores:", result);
      res.send(result);
    });
  } catch (error) {
    console.error("Error creando SOAP client:", error);
    res.status(500).send("Error creando SOAP client");
  }
});

app.get("/automoviles", async (req, res) => {
  try {
    const client = await createSoapClient(url);
    client.DatabaseServiceImplService.DatabaseServiceImplPort.fetchAllAutomoviles((err, result) => {
      if (err) {
        console.error("Error llamando SOAP method:", err);
        res.status(500).send("Error llamando SOAP method");
        return;
      }
      console.log("Automoviles:", result);
      res.send(result);
    });
  } catch (error) {
    console.error("Error creando SOAP client:", error);
    res.status(500).send("Error creando SOAP client");
  }
});

app.get("/ventas", async (req, res) => {
  try {
    const client = await createSoapClient(url);
    client.DatabaseServiceImplService.DatabaseServiceImplPort.fetchAllVendedores(
      async (err, vendedoresResponse) => {
        if (err) {
          console.error("Error llamando SOAP method:", err);
          res.status(500).send("Error llamando SOAP method");
          return;
        }

        console.log("Vendedores Response:", vendedoresResponse); // Log SOAP response

        // Extrae vendedores array
        const vendedores = vendedoresResponse.return || [];

        console.log("Vendedores:", vendedores); // Log converted array

        // Fetch automoviles
        client.DatabaseServiceImplService.DatabaseServiceImplPort.fetchAllAutomoviles(
          (err, automovilesResponse) => {
            if (err) {
              console.error("Error llamando SOAP method:", err);
              res.status(500).send("Error llamando SOAP method");
              return;
            }

            console.log("Automoviles Response:", automovilesResponse); // Log SOAP response

            // Extrae automoviles array
            const automoviles = automovilesResponse.return || [];

            console.log("Automoviles:", automoviles); // Log converted array

            // Arreglo para almacenar vendedores y automoviles según correlación
            const matchedData = [];

            // Itera sobre vendedores
            vendedores.forEach((vendedor) => {
              // Encuentra automoviles vendidos por este vendedor
              const vendedorAutomoviles = automoviles.filter(
                (automovil) => automovil.vendedor === vendedor.rut
              );

              // Añade información del vendedor al automóvil y la une
              vendedorAutomoviles.forEach((automovil) => {
                matchedData.push({
                  nombre: vendedor.nombre,
                  apellido: vendedor.apellido,
                  rut: vendedor.rut,
                  patente: automovil.patente,
                  marca: automovil.marca,
                  modelo: automovil.modelo,
                  color: automovil.color,
                });
              });
            });

            // Log matched data
            console.log("Matched Data:", matchedData);

            res.send(matchedData);
          }
        );
      }
    );
  } catch (error) {
    console.error("Error creando SOAP client:", error);
    res.status(500).send("Error creando SOAP client");
  }
});

app.post("/addNuevo", async (req, res) => {
  try {
    const newDataVendedor = req.body.vendedorData;
    const newDataAutomovil = req.body.automovilData;
    console.log(newDataVendedor);
    console.log(newDataAutomovil);

    // Llamada de inserts con los datos obtenidos de la request
    await insertDataVendedor(newDataVendedor);
    await insertDataAutomovil(newDataAutomovil);

    res.status(200).json({ message: "Data añadida exitosamente" });
  } catch (error) {
    console.error("Error añadiendo nuevos datos: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/deleteVendedor", async (req, res) => {
  try {
    console.log(req.body);
    const { rut } = req.body;

    // Llamada de funciones para borrar
    await deleteAutomovilByVendedorRut(rut);
    await deleteDataVendedorFromTable(rut);

    res.status(200).json({ message: "Data eliminada exitosamente" });
  } catch (error) {
    console.error("Error borrando data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

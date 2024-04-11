import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOSTDB,
  user: process.env.USERDB,
  password: process.env.PASSDB,
  database: process.env.DBNAME,
  port: process.env.PORTDB,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Function to insert data into a table
export const insertDataVendedor = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO vendedor (rut, nombre, apellido) VALUES (?, ?, ?)`;
    const values = [data.rut_vendedor, data.nombre, data.apellido];
    console.log(values);

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting data: ", err);
        reject(err);
        return;
      }
      console.log("Data inserted successfully");
      resolve(result);
    });
  });
};

export const insertDataAutomovil = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO automovil (patente, marca, modelo, color, vendedor_rut, precio) VALUES (?, ?, ?, ?, ?,?)`;
    const values = [
      data.patente,
      data.marca,
      data.modelo,
      data.color,
      data.rut_vendedor,
      data.precio,
    ];
    console.log(values);

    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting data: ", err);
        reject(err);
        return;
      }
      console.log("Data inserted successfully");
      resolve(result);
    });
  });
};

// Funcion que borra filas relacionadas al rut eliminado
export const deleteAutomovilByVendedorRut = (rut) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM automovil WHERE vendedor_rut = ?`;

    connection.query(sql, [rut], (err, result) => {
      if (err) {
        console.error("Error deleting associated automovil data:", err);
        reject(err);
        return;
      }
      console.log("Associated automovil data deleted successfully");
      resolve(result);
    });
  });
};

// Funcion para borrar vendedor
export const deleteDataVendedorFromTable = (rut) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM vendedor WHERE rut = ?`;

    connection.query(sql, [rut], (err, result) => {
      if (err) {
        console.error("Error deleting vendedor data:", err);
        reject(err);
        return;
      }
      console.log("Vendedor data deleted successfully");
      resolve(result);
    });
  });
};

// Cierra conexión a base de datos
process.on("exit", () => {
  connection.end();
});

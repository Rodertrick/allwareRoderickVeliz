package com.allware.ws;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.jws.WebService;
import javax.xml.ws.WebServiceContext;

@WebService(endpointInterface = "com.allware.ws.DatabaseService")
public class DatabaseServiceImpl implements DatabaseService {
    private static final String URL = "jdbc:mariadb://localhost:3306/allwaredbprueba";
    private static final String USERNAME = "userDB";
    private static final String PASSWORD = "userDB";
    
    @Resource
    private WebServiceContext context;
    
    @Override
    public List<Vendedor> fetchAllVendedores(){
    	List<Vendedor> vendedores = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM vendedor")) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                String rut = rs.getString("rut");
                String nombre = rs.getString("nombre");
                String apellido = rs.getString("apellido");
                Vendedor vendedor = new Vendedor(rut, nombre, apellido);
                vendedores.add(vendedor);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return vendedores;
    }
    
    @Override
    public List<Automovil> fetchAllAutomoviles() {
        List<Automovil> automoviles = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement("SELECT * FROM automovil")) {
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                String patente = rs.getString("patente");
                String marca = rs.getString("marca");
                String modelo = rs.getString("modelo");
                String color = rs.getString("color");
                String vendedor = rs.getString("vendedor_rut");
                int precio = rs.getInt("precio");
                Automovil automovil = new Automovil(patente,marca,modelo,color,vendedor,precio);
                automoviles.add(automovil);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return automoviles;
    }
    
    @Override
    public String addNewAutomovil(String patente, String marca, String modelo, String color, String vendedor, int precio) {
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement("INSERT INTO automovil (patente, marca, modelo, color, vendedor, precio) VALUES (?, ?, ?, ?, ?, ?)")) {
            // Seteo parametros
            stmt.setString(1, patente);
            stmt.setString(2, marca);
            stmt.setString(3, modelo);
            stmt.setString(4, color);
            stmt.setString(5, vendedor);
            stmt.setInt(6, precio);
            
            // Ejecucion SQL Statement
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                return "Se añadió un nuevo automóvil";
            } else {
                return "Error al añadir nuevo automovil";
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
    
    @Override
    public String addNewVendedor(String rut, String nombre, String apellido) {
        try (Connection conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
             PreparedStatement stmt = conn.prepareStatement("INSERT INTO vendedor (rut, nombre, apellido) VALUES (?, ?, ?)")) {
        	// Seteo parametros
            stmt.setString(1, rut);
            stmt.setString(2, nombre);
            stmt.setString(3, apellido);
            
         // Ejecucion SQL Statement
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                return "New vendedor added successfully";
            } else {
                return "Failed to add new vendedor";
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }



}

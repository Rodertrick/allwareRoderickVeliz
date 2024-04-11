package com.allware.ws;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebService;

@WebService
public interface DatabaseService {
    
    @WebMethod
    List<Vendedor> fetchAllVendedores();
    
    @WebMethod
    List<Automovil> fetchAllAutomoviles();
    
    @WebMethod
    String addNewAutomovil(String patente, String marca, String modelo, String color, String vendedor, int precio);
    
    @WebMethod
    String addNewVendedor(String rut, String nombre, String apellido);
}


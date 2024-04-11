package com.allware.ws;

import javax.xml.ws.Endpoint;

public class WebServicePublisher {
    public static void main(String[] args) {
        Endpoint.publish("http://localhost:8080/database", new DatabaseServiceImpl());
        System.out.println("DatabaseService se ha publicado en http://localhost:8080/database");
    }
}
Prueba AllWare - Roderick Véliz

Tecnologías utilizadas:
  - Java 1.8 (Maven): para webservice utilizando JAX-WS. (Carpeta AllWareWebService)
  - MariaDB: para base de datos a utilizar en la solución, compatible con conectores MySql. Se añade Script de creación y esquemas elaborados en MySql Workbench. (Carpeta Base de Datos)
  - NodeJs: para crear servicio REST que comunica front-end con webservice. (Se detallará más adelante el porque de esta implementación. Carpeta ApiComm).
  - ReactJs: para desarrollar frontend de la solución. (Carpeta Front/AllwareFront)

Herramientas utilizadas:
  - IDEs: Eclipse 2023-12 (4.30.0) y Visual Studio Code.
  - Xampp para montar servidor de base de datos.
  - MySql Workbench 8.0 CE para elaborar esquema de base de datos y script de creación.
  - Postman para pruebas de API REST y SOAP

Para propósitos de prueba y revisión, agrego link a video mostrando la solución:

https://www.youtube.com/watch?v=xpejasqERVg

Levantamiento de componentes de la solución:

- Base de datos:
   - Utilizando Xampp, se levanta el servicio MySql y se accede a phpMyAdmin para confirmar funcionamiento.
   - Estando arriba, se importa el script adjunto al proyecto para la creación de tablas y usuarios.

- WebService:
   - Para levantar el webservice, se puede realizar de dos formas. La primera es ejecutando el comando "mvn package" para la creación de un archivo war el cual puede ser utilizado en
     Tomcat, y la segunda realizar una ejecución directa desde el IDE (en este caso Eclipse).
   - Una vez en funcionamiento se entregará un aviso en logs que indicará la url del servicio, si se accede a ella se podrá encontrar el wsdl.
 
- ApiComm:
   - Ejecución desde consola con comando "npm run dev"
 
- AllWareFront:
   - Ejecución desde consola con comando "npm run dev"


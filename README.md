## Visor de causas de muertes en Estados Unidos

### Arquitectura
<a href="https://imgur.com/7h2cIa2.png"><img src="https://imgur.com/7h2cIa2.png" style="width: 500px; max-width: 100%; height: auto" title="Arquitectura de la aplicación." /></a>
 
- Front-End: Aplicación de React
- Back-End: Aplicación de Express.js
- Base de Datos: Mongo Atlas (Cloud)
 
### Funcionalidad

El usuario puede seleccionar una causa de muerte dentro de una lista. \
Es posible filtrar las causas usando una barra de búsqueda. \
El usuario puede marcar alguna causa como favorita y sera guardará su preferencia a través de cookies. \
Al seleccionar una causa, se filtran los datos por año. 

### Porque esta aplicación?

Una de las mayores ventajas de migrar una app a containers es que hay mayor eficiencia en los recursos de hardware. Siendo esta una app que trabaja con una grán cantidad de datos, este es un aspecto que se puede aprovechar. Este visor además se puede adaptar para otros tipos de datos que sigan un formato similar por lo que migrar a contenedores hace que sea más facil replicar el deployment de la aplicación haciendo que sea mas facil reproducir el funcionamiento con otro dataset. \
 \
 Como se mencionó anteriormente, la gran cantidad de datos con la que se trabaja hace que pueda ocurrir una sobrecarga si se trata de un solo nodo. Por esto es que se debe aprovechar la posibilidad de hacer un deploy multi-node para que el servicio de la aplicación nunca caiga.

### Referencias

Dataset: https://catalog.data.gov/es_AR/dataset/monthly-counts-of-deaths-by-select-causes-2014-2019

### Ejecución
Ejecutar `npm install` en la carpeta base. \
Ejecutar con: `npm start` \
 \
Para ejecutar en kubernetes: `kubectl apply -f deployment.yaml` ya teniendo un cluster creado.

### Trabajo a futuro
#### Monitoreo
Aunque se llego a implementar prometheus, esto quedo en una etapa temprana. Se pueden trabajar las métricas disponibles para tener una que sirva para otras tareas como escalabilidad. Una métrica sencilla para esto sería utilización de CPU pero también podríamos tomar disponibilidad RAM y disco. 
 
 #### Escalabilidad
 Una vez que se han implementado mejores métricas en Prometheus, estas se pueden utilizar para tener auto-scaling en el sistema. Una manera de hacer esto sería con Grafana ya que al utilizar las métricas de Prometheus podemos tener horizontal auto-scaling si pasan un threshold que definimos.

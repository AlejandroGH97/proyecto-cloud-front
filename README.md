## Visor de causas de muertes en Estados Unidos

### Arquitectura
<a href="https://i.imgur.com/I4ici3j.png"><img src="https://i.imgur.com/I4ici3j.png" style="width: 500px; max-width: 100%; height: auto" title="Arquitectura de la aplicación." /></a>
 
- Front-End: Aplicación de React
- Back-End: Aplicación de Express.js
- Base de Datos: Mongo Atlas (Cloud)
 
### Funcionalidad

El usuario puede seleccionar una causa de muerte dentro de una lista. \
Es posible filtrar las causas usando una barra de búsqueda. \
El usuario puede marcar alguna causa como favorita y sera guardará su preferencia a través de cookies. \
Al seleccionar una causa, se filtran los datos por año. \

### Referencias

Dataset: https://catalog.data.gov/es_AR/dataset/monthly-counts-of-deaths-by-select-causes-2014-2019

### Ejecución
Ejecutar `npm install` en la carpeta base. \
Ejecutar con: `npm start` \
*El back-end ya debe estar ejecutando para mostrar los datos*

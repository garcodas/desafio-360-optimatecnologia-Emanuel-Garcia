# Desafío WEB 360 Emanuel Garcia

<hr/>

Este proyecto es una aplicación backend desarrollada en Express con TypeScript. Incluye una base de datos configurada para ejecutarse en Docker. A continuación, encontrarás las instrucciones para poner en funcionamiento el entorno.

## Configuración de la Base de Datos

Se incluye un archivo `docker-compose.yml` que define la configuración para la base de datos. Para iniciar la instancia de la base de datos, sigue estos pasos:

1. Abre una terminal en la raíz del proyecto.
2. Ejecuta el siguiente comando:

   ```bash
   docker-compose up --build -d

   Este comando creará y ejecutará los contenedores en segundo plano.
   ```

3. Una vez que los contenedores estén en funcionamiento, ejecuta los scripts SQL que se encuentran en la carpeta:

   ```bash
   src/sql-scripts

   Estos scripts son necesarios para inicializar las tablas y datos de la base de datos.
   ```

## Configuración del Archivo `.env`

Antes de ejecutar la aplicación, configura las variables de entorno en un archivo `.env` en la raíz del proyecto. Puedes usar el archivo `.env.example` como referencia.

## Ejecución del Servidor

Para iniciar el servidor en modo de desarrollo: `npm run dev`
El servidor estará disponible en la dirección:`http://localhost:3000 `

## Instalación de Dependencias

Antes de ejecutar la aplicación, instala las dependencias del proyecto. Utiliza el siguiente comando:

```bash
npm install
```

## Estructura del proyecto

- <b>src/:</b> Carpeta principal del proyecto
  - <b>config/:</b> Configuración de la base de datos y variables de entorno
  - <b>middlewares:/</b> Middlewares que se ejecutarán en las rutas.
  - <b>modules:/</b>Módulos organizados por funcionalidad
  - <b>routes/:</b> Definición de rutas para la API.
- <b>.env:</b>Archivo con las variables de entorno necesarias.
- <b>Desafio 360.postman_collection.json:</b> Postman Collection
- <b>docker-compose.yml:</b>Configuración para la base de datos en Docker.

## Derechos de Autor

Este proyecto es desarrollado y mantenido por Emanuel Garcia. Puedes encontrar más información sobre el autor en su perfil de GitHub: <a href="https://github.com/garcodas/">garcodas</a>

<p> Si tienes algún inconveniente, no dudes en contactarme. </p>

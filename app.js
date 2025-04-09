const express = require('express'); // Importamos el framework Express
const app = express(); // Creamos una instancia de la app
const PORT = 3000; // Definimos el puerto en el que correrá el servidor

// Configuración del motor de plantillas EJS (para renderizar vistas con HTML dinámico)
app.set('view engine', 'ejs');

// Middleware para recibir datos de formularios (urlencoded) y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos (scripts y estilos)
app.use(express.static('public'));

// Importamos las rutas desde /routes/tareas.js
const tareasRouter = require('./routes/tareas');
app.use('/', tareasRouter); // Todas las rutas van por aquí

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

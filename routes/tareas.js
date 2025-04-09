// Importamos el módulo Express
const express = require('express');

// Módulos de Node.js para trabajar con archivos
const fs = require('fs');
const path = require('path');

// Creamos un router para manejar las rutas específicas de las tareas
const router = express.Router();

// Ruta absoluta al archivo JSON que contiene las tareas
const filePath = path.join(__dirname, '..', 'tareas.json');

/**
 * Función auxiliar para leer tareas desde el archivo JSON.
 * Si el archivo existe, las convierte a un arreglo.
 * Si hay error, devuelve un arreglo vacío.
 */
function leerTareas() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data); // Convertimos el texto a arreglo de objetos
  } catch (error) {
    return []; // Si hay error o el archivo no existe, devolvemos arreglo vacío
  }
}

/**
 * Función auxiliar para guardar tareas en el archivo JSON.
 * Convierte el arreglo a texto JSON y lo escribe en disco.
 */
function guardarTareas(tareas) {
  fs.writeFileSync(filePath, JSON.stringify(tareas, null, 2), 'utf8');
}

/**
 * Ruta GET "/"
 * Muestra la vista principal con la lista de tareas.
 * Lee las tareas desde el archivo JSON y las pasa a la vista 'index.ejs'.
 */
router.get('/', (req, res) => {
  const tareas = leerTareas(); // Cargamos las tareas actuales
  res.render('index', { tareas }); // Renderizamos la vista con los datos
});

/**
 * Ruta POST "/tareas"
 * Recibe una nueva tarea desde el frontend.
 * Si la tarea es válida (no vacía), se agrega al archivo JSON.
 * Devuelve un mensaje JSON indicando éxito o error.
 */
router.post('/tareas', (req, res) => {
  const textoTarea = req.body.tarea;
  const tareas = leerTareas(); // Leemos el arreglo actual

  if (textoTarea && textoTarea.trim() !== '') {
    const nuevaTarea = {
      texto: textoTarea.trim(),
      completada: false
    };
    tareas.push(nuevaTarea); // Agregamos el objeto tarea al arreglo
    guardarTareas(tareas); // Guardamos el nuevo arreglo en el archivo
    // Respondemos con la nueva tarea y su índice para actualizar el DOM dinámicamente
    return res.status(200).json({
      mensaje: 'Tarea guardada correctamente',
      index: tareas.length - 1,
      tarea: nuevaTarea
    });
  }

  // Si es vacía o no válida, respondemos con error 400
  res.status(400).json({ mensaje: 'Tarea inválida' });
});

/**
 * Ruta DELETE "/delete/:index"
 * Elimina una tarea según su posición en el arreglo.
 * Si el índice es válido, elimina la tarea del JSON.
 */
router.delete('/delete/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const tareas = leerTareas(); // Leemos tareas actuales

  // Validamos que el índice esté dentro del rango
  if (!isNaN(index) && index >= 0 && index < tareas.length) {
    tareas.splice(index, 1); // Eliminamos la tarea del arreglo
    guardarTareas(tareas); // Guardamos el arreglo actualizado
    return res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
  }

  // Si el índice es inválido, respondemos con error
  res.status(400).json({ mensaje: 'Índice inválido' });
});

/**
 * Ruta PATCH "/tareas/:index"
 * Marca o desmarca una tarea como completada.
 * Recibe { completada: true/false } desde el cliente.
 */
router.patch('/tareas/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const tareas = leerTareas(); // Leemos tareas actuales

  // Validamos que el índice esté en el rango y la propiedad completada sea booleana
  if (!isNaN(index) && index >= 0 && index < tareas.length && typeof req.body.completada === 'boolean') {
    tareas[index].completada = req.body.completada; // Actualizamos el estado
    guardarTareas(tareas); // Guardamos el arreglo actualizado
    return res.status(200).json({ mensaje: 'Tarea actualizada correctamente' });
  }

  // Si el índice o los datos son inválidos, respondemos con error
  res.status(400).json({ mensaje: 'Datos inválidos para actualizar la tarea' });
});

// Exportamos el router para que pueda ser usado en app.js
module.exports = router;

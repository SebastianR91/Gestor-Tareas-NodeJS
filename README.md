
# 🗂️ Gestor de Tareas

Aplicación web desarrollada con Node.js y Express que permite a los usuarios gestionar sus tareas diarias de forma sencilla. Se pueden agregar nuevas tareas, marcarlas como completadas, eliminarlas, y visualizar cuántas están pendientes. Además, incluye un modo claro/oscuro con diseño moderno usando Bootstrap.


## 🚀 Funcionalidades principales

- ✅ Agregar tareas nuevas  
- 🗑️ Eliminar tareas existentes  
- ✔️ Marcar tareas como completadas  
- 🔢 Contador de tareas pendientes  
- 🌗 Alternar entre modo claro y modo oscuro  
- 💾 Persistencia de datos mediante archivo `tareas.json`

## 🛠️ Tecnologías utilizadas

- **Node.js** – Entorno de ejecución para JavaScript  
- **Express** – Framework para servidor web  
- **EJS** – Motor de plantillas para generar HTML dinámico  
- **Bootstrap 5** – Estilos modernos y responsivos  
- **Bootstrap Icons** – Íconos elegantes y funcionales  
- **jQuery** – Manipulación DOM y manejo de eventos  
- **JSON** – Almacenamiento local de tareas
# 🗂️ Gestor de Tareas

Aplicación web desarrollada con Node.js y Express que permite a los usuarios gestionar sus tareas diarias de forma sencilla. Se pueden agregar nuevas tareas, marcarlas como completadas, eliminarlas, y visualizar cuántas están pendientes. Además, incluye un modo claro/oscuro con diseño moderno usando Bootstrap.

---

## 🚀 Funcionalidades principales

- ✅ Agregar tareas nuevas  
- 🗑️ Eliminar tareas existentes  
- ✔️ Marcar tareas como completadas  
- 🔢 Contador de tareas pendientes  
- 🌗 Alternar entre modo claro y modo oscuro  
- 💾 Persistencia de datos mediante archivo `tareas.json`

---

## 🛠️ Tecnologías utilizadas

- **Node.js** – Entorno de ejecución para JavaScript  
- **Express** – Framework para servidor web  
- **EJS** – Motor de plantillas para generar HTML dinámico  
- **Bootstrap 5** – Estilos modernos y responsivos  
- **Bootstrap Icons** – Íconos elegantes y funcionales  
- **jQuery** – Manipulación DOM y manejo de eventos  
- **JSON** – Almacenamiento local de tareas  

---

## 📁 Estructura del proyecto

```bash
gestor-tareas/
├── node_modules/           # Dependencias del proyecto (instaladas con npm)
├── public/                 # Archivos públicos accesibles por el navegador
│   ├── css/                # Estilos personalizados
│   └── js/                 
│       └── main.js         # Lógica de la interfaz (modo oscuro, AJAX, etc.)
├── routes/
│   └── tareas.js           # Rutas para manejar las tareas (agregar, eliminar, completar)
├── views/
│   └── index.ejs           # Plantilla principal que renderiza las tareas
├── tareas.json             # Archivo donde se guardan las tareas
├── app.js                  # Archivo principal que arranca el servidor y configura Express
├── package.json            # Configuración del proyecto y dependencias
├── package-lock.json       # Detalles exactos de las versiones instaladas
└── README.md               # Este archivo
```

---

## 📦 Instalación y uso

1. Clona el repositorio:

   ```bash
   git clone https://github.com/SebastianR91/Gestor-Tareas-NodeJS
   cd gestor-tareas
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta la aplicación:

   ```bash
   node app.js
   ```

4. Abre tu navegador y visita:

   ```
   http://localhost:3000
   ```

---

## 👨‍💻 Autor

**Edwar Sebastián Ruiz Álvarez**  
Proyecto realizado como prueba técnica para desarrollador junior.

---

## 📄 Licencia

Este proyecto se encuentra bajo la Licencia MIT. Puedes usarlo, modificarlo y compartirlo libremente.

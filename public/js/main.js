$(document).ready(function () {

  // Muestra mensajes de alerta personalizados y los cierra automáticamente
  function mostrarMensaje(texto, tipo = 'success') {
    $('#mensaje').html(`
      <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${texto}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `);

    // Oculta la alerta automáticamente después de 3 segundos
    setTimeout(() => {
      $('#mensaje .alert').alert('close');
    }, 3000);
  }

  // Actualiza el contador de tareas mostrado en el DOM
  function actualizarContador() {
    const total = $('.eliminar-tarea').length; // Cuenta cuántas tareas hay
    $('#contadorTareas').html(`🔢 Tienes <strong>${total}</strong> ${total === 1 ? 'tarea pendiente' : 'tareas pendientes'}`);
  }

  // Agrega la tarea al DOM directamente
  function agregarTareaAlDOM(texto, completada, index) {
    const nuevaTarea = $(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="form-check">
          <input class="form-check-input me-2 completar-tarea" type="checkbox" data-index="${index}" ${completada ? 'checked' : ''}>
          <label class="form-check-label ${completada ? 'text-decoration-line-through text-muted' : ''}">
            ${texto}
          </label>
        </div>
        <button class="btn btn-sm btn-danger eliminar-tarea" data-index="${index}">
          <i class="bi bi-trash3-fill"></i>
        </button>
      </li>
    `);

    $('#listaTareas').append(nuevaTarea);

    // Volver a asociar eventos para el nuevo elemento
    nuevaTarea.find('.eliminar-tarea').on('click', eliminarTarea);
    nuevaTarea.find('.completar-tarea').on('change', completarTarea);

    actualizarContador();
  }

  // Función para eliminar tarea (usada tanto en evento como en DOM nuevo)
  function eliminarTarea() {
    const index = $(this).data('index');
    fetch(`/delete/${index}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          mostrarMensaje('🗑️ Tarea eliminada correctamente');
          setTimeout(() => location.reload(), 1000); // Recargamos para reflejar los índices
        } else {
          mostrarMensaje('❌ Error al eliminar la tarea', 'danger');
        }
      })
      .catch(error => {
        console.error('Error en fetch DELETE:', error);
        mostrarMensaje('❌ Error de conexión al eliminar tarea', 'danger');
      });
  }

  // Función para marcar una tarea como completada
  function completarTarea() {
    const index = $(this).data('index');
    const completada = $(this).is(':checked');

    fetch(`/tareas/${index}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completada })
    })
      .then(response => {
        if (response.ok) {
          // Actualizar el estilo visual
          const label = $(this).next('label');
          if (completada) {
            label.addClass('text-decoration-line-through text-muted');
          } else {
            label.removeClass('text-decoration-line-through text-muted');
          }
        } else {
          mostrarMensaje('❌ No se pudo actualizar el estado de la tarea', 'danger');
        }
      })
      .catch(error => {
        console.error('Error en fetch PATCH:', error);
        mostrarMensaje('❌ Error al actualizar estado de tarea', 'danger');
      });
  }

  // Evento al enviar el formulario para agregar tarea
  $('#formTarea').on('submit', function (e) {
    e.preventDefault();

    const tarea = $('#tarea').val().trim();

    if (tarea !== '') {
      fetch('/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tarea })
      })
        .then(response => response.json())
        .then(data => {
          if (data.index !== undefined) {
            mostrarMensaje('✅ Tarea agregada con éxito');
            agregarTareaAlDOM(data.tarea.texto, data.tarea.completada, data.index);
            $('#tarea').val('');
          } else {
            mostrarMensaje('❌ No se pudo agregar la tarea', 'danger');
          }
        })
        .catch(error => {
          console.error('Error en fetch POST:', error);
          mostrarMensaje('❌ Error de conexión al agregar tarea', 'danger');
        });

    } else {
      mostrarMensaje('⚠️ No puedes enviar una tarea vacía', 'warning');
    }
  });

  // Asociamos eventos a tareas existentes
  $('.eliminar-tarea').on('click', eliminarTarea);
  $('.completar-tarea').on('change', completarTarea);

  // Mostrar contador al cargar
  actualizarContador();

  // 🌙 Cambiar entre modo oscuro y claro (y guardar preferencia en localStorage)
  // 🌙 Cambiar entre modo oscuro y claro (y guardar preferencia en localStorage)
function aplicarTemaOscuro(oscuro) {
  if (oscuro) {
    // Modo oscuro con fondo personalizado
    $('#body')
      .removeClass('bg-light text-dark bg-dark text-light')
      .css('background-color', '#212529') // color personalizado
      .addClass('text-light');

    $('#contenidoTarjeta')
      .removeClass('bg-dark text-light')
      .addClass('bg-light text-dark');

    $('#btnTema').html('<i class="bi bi-moon-fill"></i> Modo Oscuro');
  } else {
    // Modo claro
    $('#body')
      .removeClass('bg-dark text-light')
      .css('background-color', '') // quitar fondo custom
      .addClass('bg-light text-dark');

    $('#contenidoTarjeta')
      .removeClass('bg-light text-dark')
      .addClass('bg-dark text-light');

    $('#btnTema').html('<i class="bi bi-brightness-high-fill"></i> Modo Claro');
  }
}


  // Al hacer clic en el botón de tema
  $('#btnTema').on('click', function () {
    const temaActual = localStorage.getItem('modoOscuro') === 'true';
    const nuevoTema = !temaActual;
    localStorage.setItem('modoOscuro', nuevoTema);
    aplicarTemaOscuro(nuevoTema);
  });

  // Aplica el tema guardado al cargar
  aplicarTemaOscuro(localStorage.getItem('modoOscuro') === 'true');

});

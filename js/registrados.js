//CHEQUEAR SI HAY ALGO EN EL STORAGE,OBTENERLO Y GUARDARLO EN UN ARREGLO
const registradosInStorage = [];
if ("pacientes" in localStorage) {
    console.log("EXISTE LA CLAVE");
    const guardados = JSON.parse(localStorage.getItem("pacientes"));
    console.log(guardados);
    for (const paciente of guardados) {
        console.log(paciente)
        registradosInStorage.push(new Paciente({ datosPaciente: { id: paciente.datosPaciente.id, nombre: paciente.datosPaciente.nombre.toUpperCase(), apellido: paciente.datosPaciente.apellido.toUpperCase(), edad: paciente.datosPaciente.edad, dni: paciente.datosPaciente.dni, telefono: paciente.datosPaciente.telefono, email: paciente.datosPaciente.email.toUpperCase(), cobertura: paciente.datosPaciente.cobertura.toUpperCase() }, turnoPaciente: { especialidad: paciente.turnoPaciente.especialidad.toUpperCase(), fecha: paciente.turnoPaciente.fecha, hora: paciente.turnoPaciente.hora } }))

    }
}



//FUNCION QUE GENERA LA INTERFAZ HTML CON DATOS DEL PACIENTE Y TURNO
function turnoUI(paciente) {
    $('#datosPaciente').html('').hide();
    for (const registrado of paciente) {
        $('#datosPaciente').append(`<div class="turno  p-3 m-3 col-md-5 col-xl-3">
                         <ul class="field-list">

                        <li> <label class= "form-label">Nombre:</label><div class="form-input"><input type="text" disabled value="${registrado.datosPaciente.nombre}"></div></li>
                        <li>  <label class= "form-label"> Apellido:</label><div class="form-input"><input type="text"  disabled value="${registrado.datosPaciente.apellido}"></div></li> 
                        <li>  <label class= "form-label">Edad:</label><div class="form-input"><input type="text" disabled value="${registrado.datosPaciente.edad}"></div></li>
                        <li>  <label class= "form-label">Dni:</label><div class="form-input"><input type="text" disabled value="${registrado.datosPaciente.dni}"></div></li>
                        <li>  <label class= "form-label">Telefono:</label><div class="form-input"><input type="text" disabled value="${registrado.datosPaciente.telefono}"></div> </li>
                        <li>  <label class= "form-label">Email:</label><div class="form-input"><input type="text" disabled value="${registrado.datosPaciente.email}"></div></li>
                        <li>  <label class= "form-label">Cobertura:</label><div class="form-input"><input type="text" disabled value="${registrado.datosPaciente.cobertura}"></div></li>
                        <li>  <label class= "form-label">Especialidad:</label><div class="form-input"><input type="text" disabled value="${registrado.turnoPaciente.especialidad}"></div></li>
                        <li>  <label class= "form-label">Fecha:</label><div class="form-input"><input type="text" disabled value="${registrado.turnoPaciente.fecha}"></div></li> 
                        <li>  <label class= "form-label">Hora:</label><div class="form-input"><input type="text" disabled value="${registrado.turnoPaciente.hora}"></div></li></ul> <div class="botones text-right"><button id="${registrado.datosPaciente.id}" class="btn btn-editar"type="button" data-toggle="modal" data-target="#exampleModal">Editar</button><button id="${registrado.datosPaciente.id}" class="btn btn-eliminar">Eliminar</button></div></div> `).fadeIn(1500)

    }
    // EVENTOS PARA LOS BOTONES

    $('.btn-eliminar').on("click", eliminarTurno);
    $('.btn-editar').on("click", editarTurno)

    // CAMBIAR EL TEXTO EN PANTALLA SI NO HAY REGISTROS

    if (registradosInStorage.length == 0) {
        $('h1').text('No hay turnos registrados');
        $('#btn-registro').text('Registrar un nuevo turno')
    };
}

turnoUI(registradosInStorage);

// FUNCION PARA ELIMINAR TURNOS
function eliminarTurno(e) {
    e.preventDefault();
    Swal.fire({
        title: 'Estas seguro?',
        text: "No lo podras deshacer!",
        icon: 'warning',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        confirmButtonColor: '#009688',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Cancelar turno!'
    }).then((result) => {
        if (result.isConfirmed) {
            console.log(e.target.id);

            let posicion = registradosInStorage.findIndex(p => p.datosPaciente.id == e.target.id);
            registradosInStorage.splice(posicion, 1);
            //GUARDAR EN STORAGE EL NUEVO ARREGLO
            localStorage.setItem("pacientes", JSON.stringify(registradosInStorage));
            turnoUI(registradosInStorage)

            Swal.fire(
                'Eliminado!',
                'El turno ha sido cancelado',
                'success'
            )
        }
    })


}

//FUNCION PARA EDITAR TURNOS

function editarTurno(e) {
    e.preventDefault();

    let posicion = registradosInStorage.findIndex(p => p.datosPaciente.id == e.target.id);
    console.log(registradosInStorage[posicion].datosPaciente.nombre);
    console.log(posicion)

    //OBTENGO LA INFORMACION GUARDADA EN LOS ARCHIVOS .JSON Y LA  CARGO EN EL FORMULARIO
    $.get('data/coberturas.json', function(datos, estado) {
        if (estado == 'success') {
            selectUI(datos, "#cobertura", `${registradosInStorage[posicion].datosPaciente.cobertura}`)
        };
    })

    $.get('data/especialidades.json', function(datos, estado) {
        if (estado == 'success') {
            selectUI(datos, "#especialidad", `${registradosInStorage[posicion].turnoPaciente.especialidad}`)
        };
    })

    //GENERO LA INTERFAZ CON LOS DATOS A EDITAR
    $('#modalContainer').html(`<form id="formulario"><div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog ">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">${registradosInStorage[posicion].datosPaciente.nombre} ${registradosInStorage[posicion].datosPaciente.apellido}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
       <input type="text" name="patient_name" id="nombre" value="${registradosInStorage[posicion].datosPaciente.nombre}">
        <input type="text" name="patient_last_name" id="apellido" value="${registradosInStorage[posicion].datosPaciente.apellido}">
        <input type="text" name="patient_age" id="edad" value="${registradosInStorage[posicion].datosPaciente.edad}" class="required number">
        <input type="text" name="patient_dni" id="dni" value="${registradosInStorage[posicion].datosPaciente.dni}" class="required number">
        <input type="text" name="patient_phone" id="telefono" value="${registradosInStorage[posicion].datosPaciente.telefono}" class="required number">
        <input type="email" name="patient_email" id="email" value="${registradosInStorage[posicion].datosPaciente.email}" class="required email">
        <select class="form-dropdown required" name="patient_medic" id="cobertura"></select>
        <select class="form-dropdown required" name="patient_speciality" id="especialidad"></select>
        <input type="date" name="patient_date" id="date" class="required" value="${registradosInStorage[posicion].turnoPaciente.fecha}">
        <input type="time" name="patient_time" id="time"  class="required"  value="${registradosInStorage[posicion].turnoPaciente.hora}">
    </div>
        <div class="modal-footer">
          <button type="button" id="cerrar" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          <button type="button" id="salvar-cambios" class="btn btn-primary" data-dismiss="modal">Guardar cambios</button>
        </div>
      </div>
    </div>
  </div></form>`);


    //EVENTO PARA BOTON GUARDAR CAMBIOS

    $('#salvar-cambios').click(function(e) {

        e.preventDefault();

        registradosInStorage[posicion].datosPaciente.nombre = $('#nombre').val().toUpperCase();
        registradosInStorage[posicion].datosPaciente.apellido = $('#apellido').val().toUpperCase();
        registradosInStorage[posicion].datosPaciente.edad = $('#edad').val();
        registradosInStorage[posicion].datosPaciente.dni = $('#dni').val();
        registradosInStorage[posicion].datosPaciente.telefono = $('#telefono').val();
        registradosInStorage[posicion].datosPaciente.email = $('#email').val().toUpperCase();
        registradosInStorage[posicion].datosPaciente.cobertura = $('#cobertura').val();
        registradosInStorage[posicion].turnoPaciente.especialidad = $('#especialidad').val();
        registradosInStorage[posicion].turnoPaciente.fecha = $('#date').val();
        registradosInStorage[posicion].turnoPaciente.hora = $('#time').val();

        // GUARDO EN EL STORAGE Y VUELVO A GENERAR LA INTERFAZ CON LOS DATOS ACTUALIZADOS 
        localStorage.setItem("pacientes", JSON.stringify(registradosInStorage));

        turnoUI(registradosInStorage)
    })

    //EVENTO PARA BOTON CERRAR

    $('#cerrar').click(function(e) {
        e.preventDefault();
        document.getElementById('formulario').reset();
    });



}
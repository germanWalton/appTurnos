const registrados = [];


// AL RECARGAR LA PAGINA  SE CHEQUEA SI HAY ALGO EN EL STORAGE Y LO AGREGA A REGISTRADOS
if ("pacientes" in localStorage) {
    console.log("EXISTE LA CLAVE");
    const guardadosInStorage = JSON.parse(localStorage.getItem("pacientes"));
    for (const paciente of guardadosInStorage) {
        registrados.push(new Paciente({ datosPaciente: { id: paciente.datosPaciente.id, nombre: paciente.datosPaciente.nombre.toUpperCase(), apellido: paciente.datosPaciente.apellido.toUpperCase(), edad: paciente.datosPaciente.edad, dni: paciente.datosPaciente.dni, telefono: paciente.datosPaciente.telefono, email: paciente.datosPaciente.email.toUpperCase(), cobertura: paciente.datosPaciente.cobertura.toUpperCase() }, turnoPaciente: { especialidad: paciente.turnoPaciente.especialidad.toUpperCase(), fecha: paciente.turnoPaciente.fecha, hora: paciente.turnoPaciente.hora } }))

    }
}

// ANIMACION PARA CAMBIAR EL FONDO DE PANTALLA
let fondos = ["url(img/fondo.jpg)", "url(img/fondo2.jpg)"];
let aux = 0;
$("#cambiarFondo").click((e) => {
    e.preventDefault();
    aux == 0 ? aux = 1 : aux = 0;
    $(".w3ls-banner").css({
        "background": fondos[aux],
        "background-size": "cover",
        "background-position": "center",
        "transition": "background 1s linear"
    }, 1500).fadeIn("slow")

})

// ENVIO DE FORMULARIO
$("#formulario").submit(nuevoTurno);


//OBTENGO LA INFORMACION GUARDADA EN LOS ARCHIVOS .JSON Y LA  CARGO EN EL FORMULARIO
$.get('data/coberturas.json', function(datos, estado) {
    if (estado == 'success') {
        selectUI(datos, "#cobertura", "Seleccione cobertura")
    };
})

$.get('data/especialidades.json', function(datos, estado) {
    if (estado == 'success') {
        selectUI(datos, "#especialidad", "Seleccione especialidad")
    };
})


//FUNCION PARA VALIDAR EL FORMULARIO
function validarFormulario(nombre, apellido, edad, dni, telefono, email, cobertura, especialidad, fecha, hora) {

    if (nombre == '' || apellido == '' || edad == '' || dni == '' || telefono == '' || email == '' || cobertura == 'Seleccione cobertura' || especialidad == 'Seleccione especialidad' || fecha == '' || hora == '') {
        Swal.fire({
            icon: 'warning',
            confirmButtonColor: '#009688',
            title: 'Todos los campos son obligatorios!',

        });

    } else if (isNaN(edad) || isNaN(dni) || isNaN(telefono)) {
        Swal.fire({
            icon: 'warning',
            confirmButtonColor: '#009688',
            title: 'Atención',
            text: 'Complete los campos correctamente!'
        });
    } else if ((email.includes('@' + '')) == false) { console.log('ingrese una direccion correcta'); } else {

        Swal.fire({
            icon: 'success',
            confirmButtonColor: '#009688',
            title: 'Turno agendado',
            text: 'Su turno ha sido registrado con exito!'
        });
        return true;

    };
}


//FUNCION PARA CREAR UN TURNO NUEVO
function nuevoTurno(e) {
    e.preventDefault();
    const id = Math.floor(Math.random() * (1000));
    const nombre = $('#nombre').val();
    const apellido = $('#apellido').val();
    const edad = parseInt($('#edad').val());
    const dni = parseInt($('#dni').val());
    const telefono = parseInt($('#telefono').val());
    const email = $('#email').val();
    const cobertura = $('#cobertura').val();
    const especialidad = $('#especialidad').val();
    const fecha = $('#date').val();
    const hora = $('#time').val();
    const validacion = validarFormulario(nombre, apellido, edad, dni, telefono, email, cobertura, especialidad, fecha, hora);
    if (validacion == true) {
        const paciente = new Paciente({ datosPaciente: { id: id, nombre: nombre.toUpperCase(), apellido: apellido.toUpperCase(), edad: edad, dni: dni, telefono: telefono, email: email, cobertura: cobertura.toUpperCase() }, turnoPaciente: { especialidad: especialidad.toUpperCase(), fecha: fecha, hora: hora } });
        console.log(paciente);
        registrados.push(paciente);
        localStorage.setItem('pacientes', JSON.stringify(registrados));
        formulario.reset()
    }


}
//FUNCION PARA GENERAR OPCIONES DE UN SELECT
function selectUI(lista, selector, titulo) {
    //VACIAR OPCIONES EXISTENTES
    $(selector).empty();
    //RECORRER LISTA Y AÑADIR UNA OPCION POR CADA ELEMENTO
    lista.forEach(element => {
        $(selector).append(`<option value='${element}'>${element}</option>`);
    });
    $(selector).prepend(`<option selected>${titulo}</option>`);
}
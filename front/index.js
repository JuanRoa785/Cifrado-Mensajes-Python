//Clase para almacenar los mensajes publicados:
let Mensaje = class {
    constructor(autor = window.PUBLISHER, fecha, routing_key, exchange, mensaje){
        this.autor = autor
        this.fecha = fecha;
        this.routing_key = routing_key;
        this.exchange = exchange;
        this.mensaje = mensaje;
    }
}

//Devuelve la fecha actual en formato UTC teniendo en cuenta la zona horaria
function UTCZonaHoraria(zona="America/Bogota") {
    let fecha = new Date();

    return fecha.toLocaleString("es-GB", {
        timeZone: zona,
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

let mensajePublicadoPorDefecto = new Mensaje(window.PUBLISHER, UTCZonaHoraria(), "N.A", "N.A", "N.A");
let mensajeRecibidoPorDefecto = new Mensaje("N.A", UTCZonaHoraria(), "N.A", "N.A", "N.A");

//Arreglos Temporales que carga los mensajes guardados en el localStorage
let mensajesPublicadosGuardados = localStorage.getItem("mensajesPublicados");
let mensajesRecibidosGuardados = localStorage.getItem("mensajesRecibidos");

if (mensajesPublicadosGuardados) {
    mensajesPublicados = JSON.parse(mensajesPublicadosGuardados);
} else {
    mensajesPublicados = [mensajePublicadoPorDefecto];
}

if (mensajesRecibidosGuardados) {
    mensajesRecibidos = JSON.parse(mensajesRecibidosGuardados);
} else {
    mensajesRecibidos = [mensajeRecibidoPorDefecto];
}

let contMensPub = document.querySelector("#mensajesPublicados");
let contMensRec = document.querySelector("#mensajesRecibidos");

function mostrarMensaje(mensaje){
    let divMensaje = document.createElement("div");
    divMensaje.classList.add("mensajePublicado");

    divMensaje.innerHTML = `
        <p class="col">Date: ${mensaje.fecha}</p>
        <div class="row">
            <p class="col">Routing Key: ${mensaje.routing_key}</p>
            <p class="col">Exchange Type: ${mensaje.exchange}</p>
        </div>

        <p>Message:</p>
        <textarea readonly class="form-control" rows="2" style="width: 90%;" >${mensaje.mensaje}</textarea>
    `;
    //Agrega el mensaje como el primer hijo del contenedor:
    contMensPub.prepend(divMensaje); 
}

function mostrarMensajeRecibido(mensaje){
    let divMensaje = document.createElement("div");
    divMensaje.classList.add("mensajePublicado");
    divMensaje.style.height = "175px";

    divMensaje.innerHTML = `
        <div class="row">
            <p class="col">Publisher: ${mensaje.autor}</p>
            <p class="col">Date: ${mensaje.fecha}</p>
        </div>
        <div class="row">
            <p class="col">Routing Key: ${mensaje.routing_key}</p>
            <p class="col">Exchange Type: ${mensaje.exchange}</p>
        </div>

        <p>Message:</p>
        <textarea readonly class="form-control" rows="2" style="width: 90%;" >${mensaje.mensaje}</textarea>
    `;
    //Agrega el mensaje como el primer hijo del contenedor:
    contMensRec.prepend(divMensaje); 
}

if (mensajesPublicados.length != 1) {
    //Eliminar el mensaje por default para que no se muestre en pantalla
    mensajesPublicados = mensajesPublicados.filter((i) => i.exchange !== "N.A");
}

if (mensajesRecibidos.length != 1) {
    //Eliminar el mensaje por default para que no se muestre en pantalla
    mensajesRecibidos = mensajesRecibidos.filter((i) => i.exchange !== "N.A");
}

//Muestra los mensajes en su respectivo contenedor
mensajesPublicados.forEach(mensaje => {
    mostrarMensaje(mensaje);
});

//Muestra los mensajes en su respectivo contenedor
mensajesRecibidos.forEach(mensaje => {
    mostrarMensajeRecibido(mensaje);
});

//Función para enviar el mensaje consumiendo la API
async function mensajeEnviado(nuevoMensaje) {
    try {
        const respuesta = await fetch("http://" + window.API_URL + "/publisher/publishMessage", {
            method: "POST",
            body: JSON.stringify(nuevoMensaje),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            alert("Error al enviar mensaje:\n\n " + JSON.stringify(errorData, null, 2));
            return false
        }
        return true;

    } catch (error) {
        alert("Error al enviar mensaje: " + error.message);
        return false;
    }
}

//Se llamará cada tres segundos la función consumirMensajes
const intervalID = setInterval(consumirMensajes, 3000);

async function consumirMensajes() {
    try {
        const respuesta = await fetch("http://" + window.API_URL + "/consumer/getMessages", {
            method: "GET",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })

        if (!respuesta.ok) {
            const errorData = await respuesta.json();
            console.log(errorData)
            alert("Error al consumir mensajes:\n\n " + JSON.stringify(errorData, null, 2));
            return false
        }

        const data = await respuesta.json(); 
        if (data != null){
            //console.log("Mensajes recibidos:", data.mensajes);
            data.mensajes.forEach(mensaje => {

                let nuevoMensaje = new Mensaje(
                    mensaje.autor,
                    mensaje.fecha, 
                    mensaje.routing_key, 
                    mensaje.exchange, 
                    mensaje.mensaje
                );

                //Verificar que el mensaje que llegó NO sea del mismo autor
                //Sucede porque el binding es muy basico
                if (nuevoMensaje.autor != PUBLISHER) {
                    mensajesRecibidos.push(nuevoMensaje);
                    localStorage.setItem("mensajesRecibidos", JSON.stringify(mensajesRecibidos));
                    mostrarMensajeRecibido(nuevoMensaje);
                }
            });
        }
        return true;

    } catch (error) {
        console.log(error)
        alert("Error al consumir mensajes: " + error.message);
        return false;
    }
}

//Event Listener para publicar los mensajes:
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("publicarMensaje").addEventListener("click", async function () {
        let nuevoMensaje = new Mensaje(
            window.PUBLISHER,
            UTCZonaHoraria(), 
            document.getElementById("selectRK").value, 
            document.getElementById("selectExchange").value, 
            document.getElementById("areaMensaje").value
        );

        const envioExitoso = await mensajeEnviado(nuevoMensaje);
        if (!envioExitoso) {
            return;
        }

        //Se envia a rabbitMQ, si es exitoso:
        if (mensajesPublicados.length == 1) {
            contMensPub.removeChild(contMensPub.firstElementChild);
        }
        mensajesPublicados.push(nuevoMensaje);
        localStorage.setItem("mensajesPublicados", JSON.stringify(mensajesPublicados));
        mostrarMensaje(nuevoMensaje);
        reiniciarFormulario();
    });
});

function reiniciarFormulario() {
    document.getElementById("areaMensaje").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reiniciarMensajesPublicados").addEventListener("click", function () {
        localStorage.removeItem("mensajesPublicados");
        window.location.reload();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reiniciarMensajesRecibidos").addEventListener("click", function () {
        localStorage.removeItem("mensajesRecibidos");
        window.location.reload();
    });
});
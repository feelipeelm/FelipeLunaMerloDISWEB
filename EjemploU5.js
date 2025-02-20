// Array de palabras para adivinar con su pista correspondiente
var palabras = [
    ["atlantico", "Un océano"], ["ordenador", "Una máquina"], ["laurel", "Un árbol"],
    ["plaza", "Espacio público"], ["rueda", "Gran invento"], ["cereza", "Una fruta"],
    ["petanca", "Un juego"], ["higuera", "Un árbol"], ["everest", "Un monte"],
    ["relampago", "Antecede al trueno"], ["jirafa", "Un animal"], ["luxemburgo", "Un país"],
    ["uruguay", "Un país"], ["ilustracion", "Representación gráfica"], ["excursion", "Actividad en la naturaleza"],
    ["empanadilla", "De la panadería"], ["pastel", "De la pastelería"], ["colegio", "Lugar para estudiar"],
    ["carrera", "Competición"], ["mermelada", "Confitura"]
];

// Variables globales para almacenar la palabra, intentos y elementos HTML
var palabra = ""; // Palabra a adivinar
var rand; // Índice aleatorio para seleccionar palabra
var oculta = []; // Array que muestra los guiones y letras adivinadas
var hueco = document.getElementById("palabra"); // Elemento HTML para mostrar la palabra
var cont = 6; // Contador de intentos
var buttons; // Botones del abecedario
var btnInicio = document.getElementById("reset"); // Botón para reiniciar el juego

// Mostrar pantalla de carga inicial
function mostrarCarga() {
    const pantallaCarga = document.createElement("div");
    pantallaCarga.id = "pantalla-carga";
    pantallaCarga.innerHTML = `<h2>Cargando...</h2>`;
    document.body.appendChild(pantallaCarga);

    setTimeout(() => {
        pantallaCarga.remove();
        mostrarInstrucciones(); // Muestra las instrucciones tras 2 seg.
    }, 2000);
}

// Mostrar instrucciones del juego antes de comenzar
function mostrarInstrucciones() {
    const instrucciones = document.createElement("div");
    instrucciones.id = "pantalla-instrucciones";
    instrucciones.innerHTML = `
      <h2>Instrucciones del Juego</h2>
      <p>Adivina la palabra secreta antes de que se complete el dibujo del ahorcado.</p>
      <p>Tienes 6 intentos. Usa el abecedario para seleccionar letras.</p>
      <button onclick="cerrarInstrucciones()">Comenzar Juego</button>
    `;
    document.body.appendChild(instrucciones);
}

// Cierra las instrucciones y comienza el juego
function cerrarInstrucciones() {
    document.getElementById("pantalla-instrucciones").remove();
    inicio(); // Inicia el juego
}

// Selecciona una palabra aleatoria y la prepara para adivinar
async function generaPalabra() {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simula carga
    rand = (Math.random() * palabras.length).toFixed(0); // Índice aleatorio
    palabra = palabras[rand][0].toUpperCase(); // Convierte a mayúsculas
    console.log(palabra); // Muestra la palabra en consola para pruebas
}

// Dibuja los guiones en pantalla según la longitud de la palabra
function pintarGuiones(num) {
    oculta = Array(num).fill("_"); // Rellena con guiones
    hueco.innerHTML = oculta.join(" "); // Muestra los guiones
}

// Crea botones del abecedario usando WebComponents
class LetraButton extends HTMLElement {
    constructor() {
        super();
        const letra = this.getAttribute('letra');
        this.innerHTML = `<button value='${letra}' onclick='intento("${letra}")' class='letra' id='${letra}'>${letra}</button>`;
    }
}
customElements.define('letra-button', LetraButton); // Registra el componente

// Genera el abecedario en pantalla
function generaABC(a, z) {
    const abcdario = document.getElementById("abcdario");
    abcdario.innerHTML = "";
    for (let i = a.charCodeAt(0); i <= z.charCodeAt(0); i++) {
        const letra = String.fromCharCode(i).toUpperCase();
        abcdario.innerHTML += `<letra-button letra='${letra}'></letra-button>`;
        if (i == 110) abcdario.innerHTML += `<letra-button letra='Ñ'></letra-button>`; // Incluye la Ñ
    }
    buttons = document.getElementsByClassName('letra');
}

// Verifica si la letra seleccionada está en la palabra
function intento(letra) {
    document.getElementById(letra).disabled = true; // Desactiva la letra seleccionada
    if (palabra.includes(letra)) {
        palabra.split("").forEach((l, i) => {
            if (l === letra) oculta[i] = letra; // Reemplaza guión por letra
        });
        hueco.innerHTML = oculta.join(" "); // Actualiza la palabra visible
        mostrarMensaje("¡Bien hecho!", "verde");
    } else {
        cont--; // Resta intento si falla
        document.getElementById("intentos").innerHTML = cont;
        mostrarMensaje("¡Fallo!", "rojo");
        document.getElementById("image" + cont).classList.add("fade-in"); // Muestra parte del ahorcado
    }
    compruebaFin(); // Comprueba si terminó el juego
}

// Muestra mensajes breves cuando se acierta o falla
function mostrarMensaje(msg, clase) {
    const mensaje = document.getElementById("acierto");
    mensaje.innerHTML = msg;
    mensaje.className = `acierto ${clase}`;
    setTimeout(() => mensaje.className = "", 800); // Desaparece en 0.8s
}

// Muestra la pista de la palabra actual
async function pista() {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simula retardo
    document.getElementById("hueco-pista").innerHTML = palabras[rand][1];
}

// Comprueba si el juego ha terminado (ganado o perdido)
function compruebaFin() {
    if (!oculta.includes("_")) {
        mostrarFinal("¡Felicidades, ganaste! 🎉");
    } else if (cont === 0) {
        mostrarFinal(`Game Over - La palabra era: ${palabra}`);
    }
}

// Muestra el mensaje final del juego
function mostrarFinal(mensaje) {
    const msgFinal = document.getElementById("msg-final");
    msgFinal.innerHTML = mensaje;
    msgFinal.classList.add("zoom-in"); // Animación

    let parpadeo = setInterval(() => {
        msgFinal.style.opacity = msgFinal.style.opacity == "0" ? "1" : "0";
    }, 500); // Parpadeo del mensaje

    setTimeout(() => clearInterval(parpadeo), 4000); // Para tras 4s

    Array.from(buttons).forEach(btn => btn.disabled = true); // Desactiva botones
    btnInicio.innerHTML = "Empezar";
    btnInicio.onclick = () => location.reload(); // Recarga para reiniciar
}

// Inicia el juego desde cero
async function inicio() {
    await generaPalabra(); // Selecciona nueva palabra
    pintarGuiones(palabra.length); // Muestra guiones
    generaABC("a", "z"); // Genera abecedario
    cont = 6; // Reinicia contador de intentos
    document.getElementById("intentos").innerHTML = cont;
}

// Ejecuta la pantalla de carga al iniciar la página
window.onload = mostrarCarga;

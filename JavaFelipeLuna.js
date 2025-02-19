

// Array de palabras
var palabras = [["atlantico", "Un océano"], ["ordenador", "Una máquina"], ["laurel", "Un árbol"], ["plaza", "Espacio público"], ["rueda", "Gran invento"], ["cereza", "Una fruta"], ["petanca", "Un juego"], ["higuera", "Un árbol"], ["everest", "Un monte"], ["relampago", "Antecede al trueno"], ["jirafa", "Un animal"], ["luxemburgo", "Un país"], ["uruguay", "Un país"], ["ilustracion", "Representación gráfica"], ["excursion", "Actividad en la naturaleza"], ["empanadilla", "De la panadería"], ["pastel", "De la pastelería"], ["colegio", "Lugar para estudiar"], ["carrera", "Competición"], ["mermelada", "Confitura"]];

// Palabra a averiguar
var palabra = "";
var rand;
var oculta = [];
var hueco = document.getElementById("palabra");
var cont = 6;
var buttons;
var btnInicio = document.getElementById("reset");


async function generaPalabra() {
    await new Promise(resolve => setTimeout(resolve, 500));
    rand = (Math.random() * palabras.length).toFixed(0);
    palabra = palabras[rand][0].toUpperCase();
    console.log(palabra);
  }

// Pintar guiones
function pintarGuiones(num) {
    oculta = Array(num).fill("_");
    hueco.innerHTML = oculta.join(" ");
  }

// Generar abecedario
  class LetraButton extends HTMLElement {
    constructor() {
      super();
      const letra = this.getAttribute('letra');
      this.innerHTML = `<button value='${letra}' onclick='intento("${letra}")' class='letra' id='${letra}'>${letra}</button>`;
    }
  }
  customElements.define('letra-button', LetraButton);
  
  function generaABC(a, z) {
    const abcdario = document.getElementById("abcdario");
    abcdario.innerHTML = "";
    for (let i = a.charCodeAt(0); i <= z.charCodeAt(0); i++) {
      const letra = String.fromCharCode(i).toUpperCase();
      abcdario.innerHTML += `<letra-button letra='${letra}'></letra-button>`;
      if (i == 110) abcdario.innerHTML += `<letra-button letra='Ñ'></letra-button>`;
    }
    buttons = document.getElementsByClassName('letra');
  }
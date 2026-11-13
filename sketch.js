
/* eslint-disable no-undef, no-unused-vars */

let speech;

let velocidad = 1.0;
let idioma = "es-ES";
let frase = "Hola, bienvenidos al curso de Arquitectura de Sistemas Multimedia.";

let voces = [];
let vozSeleccionada = 0;
let vocesCargadas = false;

let botonHablar;
let botonVelocidadMenos;
let botonVelocidadMas;
let botonIdioma;
let botonVoz;

function setup() {
    createCanvas(600, 550);

    speech = new p5.Speech();

    speech.setLang(idioma);
    speech.setRate(velocidad);

    speech.onLoad = function() {
        voces = speech.voices;

        if (voces.length > 0) {
            vocesCargadas = true;

            let vozEspanol = voces.findIndex(
                voz => voz.lang.toLowerCase().startsWith("es")
            );

            vozSeleccionada = vozEspanol >= 0 ? vozEspanol : 0;
            speech.setVoice(vozSeleccionada);
        }
    };

    // Botones
    botonVelocidadMenos = createButton("-");
    botonVelocidadMenos.position(220, 300);
    botonVelocidadMenos.mousePressed(() => cambiarVelocidad(-0.2));

    botonVelocidadMas = createButton("+");
    botonVelocidadMas.position(300, 300);
    botonVelocidadMas.mousePressed(() => cambiarVelocidad(0.2));

    botonIdioma = createButton("Cambiar idioma");
    botonIdioma.position(220, 350);
    botonIdioma.mousePressed(cambiarIdioma);

    botonVoz = createButton("Siguiente voz");
    botonVoz.position(220, 390);
    botonVoz.mousePressed(cambiarVoz);

    botonHablar = createButton("REPRODUCIR VOZ");
    botonHablar.position(220, 440);
    botonHablar.mousePressed(hablar);
}

function draw() {
    background(25, 28, 40);

    fill(255);
    textAlign(CENTER);
    textStyle(BOLD);
    textSize(27);
    text("SINTESIS DE VOZ - p5.js", width / 2, 40);

    stroke(100, 120, 180);
    line(30, 60, 570, 60);
    noStroke();

    textAlign(LEFT);
    textSize(17);
    fill(100, 200, 255);
    text("RETO 1 - VELOCIDAD", 40, 100);

    fill(255);
    text("Velocidad: " + velocidad.toFixed(1) + "x", 40, 130);

    textSize(17);
    fill(100, 200, 255);
    text("RETO 2 - IDIOMA", 40, 175);

    fill(255);
    text("Idioma: " + idioma, 40, 205);

    fill(100, 200, 255);
    text("RETO 3 - FRASE", 40, 245);

    fill(255);
    textSize(13);
    text(frase, 40, 270, 510, 40);

    textSize(17);
    fill(100, 200, 255);
    text("RETO 4 Y 5 - VOCES", 40, 330);

    fill(255);
    textSize(13);

    if (vocesCargadas) {
        text("Voces disponibles: " + voces.length, 40, 365);

        let voz = voces[vozSeleccionada];

        if (voz) {
            text("Voz seleccionada: " + voz.name, 40, 390, 500, 30);
        }
    } else {
        text("Cargando voces...", 40, 365);
    }

    fill(100, 200, 255);
    textAlign(CENTER);
    textSize(13);
    text("Utiliza los botones para probar cada configuracion", 300, 510);
}

function cambiarVelocidad(cambio) {
    velocidad = constrain(velocidad + cambio, 0.5, 2.0);
    speech.setRate(velocidad);
}

function cambiarIdioma() {
    idioma = idioma === "es-ES" ? "en-US" : "es-ES";

    speech.setLang(idioma);

    if (vocesCargadas) {
        let indice = voces.findIndex(
            voz => voz.lang.toLowerCase().startsWith(
                idioma.substring(0, 2).toLowerCase()
            )
        );

        if (indice >= 0) {
            vozSeleccionada = indice;
            speech.setVoice(indice);
        }
    }
}

function cambiarVoz() {
    if (vocesCargadas && voces.length > 0) {
        vozSeleccionada = (vozSeleccionada + 1) % voces.length;
        speech.setVoice(vozSeleccionada);
    }
}

function hablar() {
    speech.setLang(idioma);
    speech.setRate(velocidad);
    speech.speak(frase);
}

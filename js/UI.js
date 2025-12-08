export const UI = {
    status: {
        ON: 1,
        OFF: 0
    },

    listButtons: [],
    recognition: null,


    init(configButtons, inputCallback) {
        // Guardamos la configuración de los botones en la variable listButtons para usarla más tarde
        UI.listButtons = configButtons;
        UI.listButtons.forEach((item) => {
            item.element = document.getElementById(item.id);

            item.element.addEventListener('click', () => {
                console.log("Click en", item.colorOn);
                // Si hay una función de callback definida (que se pasa desde el script principal), la llamamos con el color pulsado
                if (inputCallback) {
                    inputCallback(item.colorOn);
                }
            });


        });

        // Iniciamos el reconocimiento de voz
        UI.initVoice(inputCallback);
    },
    change: (item, status) => {
        // Función que cambia el color del botón y espera antes de cambiarlo de nuevo
        return new Promise((resolve) => {
            setTimeout(() => {
                // item.element.style.backgroundColor = (status === UI.status.ON) ? item.colorOn : item.colorOff;
                item.element.style.backgroundColor = (status === UI.status.ON) ? item.colorOn : item.colorOff;
                resolve(true);
            }, 500);
        });
    },
    showSequence: async (sequence) => {
        // Recorremos la secuencia de colores y encendemos y apagamos los botones correspondientes
        for (const color of sequence) {
            const item = UI.listButtons.find(btn => btn.colorOn === color);
            await UI.change(item, UI.status.ON);
            await UI.change(item, UI.status.OFF);
        }
    },

    animateEntry: () => {
        return new Promise((resolve) => {
            const elements = UI.listButtons.map(btn => btn.element);

            // Primero aseguramos que estén invisibles o pequeños
            anime.set(elements, { opacity: 0, scale: 0 });

            anime({
                targets: elements,
                opacity: [0, 1],
                scale: [0, 1],
                delay: anime.stagger(150),
                duration: 800,
                easing: 'easeOutElastic(1, .6)',
                complete: () => resolve(true)
            });
        });
    },
    msgEstado: (message) => {
        document.getElementById('estado').innerHTML = message;
    },

    initVoice(inputCallback) {
        // Comprobamos si el navegador soporta la API de reconocimiento de voz
        if (!('webkitSpeechRecognition' in window)) {
            console.log("Tu navegador no soporta voz");
            return;
        }

        // Configuramos el reconocimiento de voz
        UI.recognition = new webkitSpeechRecognition();
        UI.recognition.lang = 'es-ES'; // Idioma español
        UI.recognition.continuous = true; // Para que siga escuchando continuamente
        UI.recognition.interimResults = false; // No queremos resultados parciales, solo el final

        // Evento que salta cuando el reconocimiento de voz detecta algo
        UI.recognition.onresult = (event) => {
            const results = event.results;
            const frase = results[results.length - 1][0].transcript.toLowerCase().trim();
            console.log("Has dicho:", frase);

            // Mapa para traducir los colores de español a inglés (que es como los tenemos guardados)
            const mapaColores = {
                'rojo': 'red',
                'verde': 'green',
                'azul': 'blue',
                'amarillo': 'yellow'
            };

            // Buscamos si la frase dicha contiene alguno de los colores
            let colorDetectado = null;
            for (const [espanol, ingles] of Object.entries(mapaColores)) {
                if (frase.includes(espanol)) {
                    colorDetectado = ingles;
                    break;
                }
            }

            if (colorDetectado) {
                console.log("Color detectado:", colorDetectado);
                const btn = UI.listButtons.find(b => b.colorOn === colorDetectado);
                if (btn) {
                    // Si encontramos el botón, lo iluminamos y llamamos al callback con el color
                    UI.change(btn, UI.status.ON).then(() => UI.change(btn, UI.status.OFF));
                    if (inputCallback) inputCallback(colorDetectado);
                }
            }
        };

        try {
            UI.recognition.start();
            console.log("Reconocimiento de voz activado");
        } catch (e) {
            console.error("Error al activar voz:", e);
        }
    }
}

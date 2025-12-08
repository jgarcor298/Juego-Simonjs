import { UI } from './UI.js';
import { SimonGame } from './SimonGame.js';

const game = new SimonGame(['red', 'blue', 'green', 'yellow']);

const onInput = (color) => {
    // Validamos el color que ha pulsado el usuario con la lógica del juego
    const result = game.validateInput(color);
    console.log("Resultado:", result);

    // Si el resultado es pasar de nivel (ha acertado toda la secuencia)
    if (result === 'NEXT_LEVEL') {
        console.log("¡Nivel completado!");
        game.nextLevel(); // Aumentamos nivel

        // Mostramos mensajes y la nueva secuencia
        UI.msgEstado("Observa...");
        setTimeout(async () => {
            await UI.showSequence(game.getSequence());
            UI.msgEstado("Tu turno");
        }, 1000);
    } else if (result === 'GAME_OVER') {
        // Si ha fallado, mostramos mensaje de perder
        console.log("Perdiste :(");
        alert("Game Over");
    }
};

// Inicializamos la UI con los botones y sus colores (tanto en estado normal como iluminado)
// También pasamos la función onInput para que se llame cuando se pulse un botón
UI.init(
    [
        { id: "pulsador1", colorOn: "red", colorOff: "#d37272ff" },
        { id: "pulsador2", colorOn: "blue", colorOff: "#428aedff" },
        { id: "pulsador3", colorOn: "green", colorOff: "#7dd3b6ff" },
        { id: "pulsador4", colorOn: "yellow", colorOff: "#c9e082ff" }
    ],
    onInput
);

// Evento para el botón de empezar a jugar
document.getElementById('start-btn').addEventListener('click', async () => {
    game.startGame(); // Reseteamos variables del juego

    // Animación de entrada triunfal
    await UI.animateEntry();

    UI.msgEstado("Observa..."); // Cambiamos mensaje de estado
    await UI.showSequence(game.getSequence()); // Mostramos la secuencia inicial
    UI.msgEstado("Tu turno"); // Indicamos que le toca al usuario
});
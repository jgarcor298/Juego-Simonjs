import { UI } from "./UI.js";
import { GameSimon } from "./GameSimon.js";

const game = new GameSimon();

const onClick = (color) => {
    const result = game.validateInput(color);

    if(result === 'Siguiente nivel') {
        console.log("Nivel completado");
        game.nextLevel();

        setTimeout(async () => {
            await UI.play(game.secuencia);
        }, 1000);
    } else if (result === 'Has perdido') {
        
    }


}

UI.init(
    [
        { id: "pulsador1", colorOn: "red", colorOff: "#d37272ff" },
        { id: "pulsador2", colorOn: "blue", colorOff: "#428aedff" },
        { id: "pulsador3", colorOn: "green", colorOff: "#7dd3b6ff" },
        { id: "pulsador4", colorOn: "yellow", colorOff: "#c9e082ff" }
    ],
    onClick
);

document.getElementById('start-btn').addEventListener('click', async () => {
    game.startGame()
    UI.msgEstado("Observa la secuencia");

    await UI.play(game.secuencia);
    UI.msgEstado("Repite la secuencia");
})


import { UI } from "./UI.js";
import { GameSimon } from "./GameSimon.js";


// import { TimeHandler } from "./TimeHandler.js";

// UI.init({
//     container: "container",
//     template: "template",
// });

// TimeHandler.timeAdder(UI, 10, 3000);
// TimeHandler.timeAdder(UI, 10, 2000);
// console.log(TimeHandler.status());

const game = new GameSimon();

game.addColors('red', 'yellow');
game.addColors('blue', 'green');

const secuencia = async () => {

    let tecla1 = () => new Promise((resolve, reject) => {
        game.setColors('tecla1', 0);
        console.log("Se ha cambiado el color de tecla1.");
        resolve(1);
    });

    await tecla1();

    let tecla2 = () => new Promise((resolve, reject) => {
        game.setColors('tecla2', 1);
        console.log("Se ha cambiado el color de tecla1.");
        resolve(1);
    });

   await tecla2();
}

secuencia();






import { UI } from "./UI.js";

export class GameSimon {
    secuencia = [];
    userSecuencia = [];
    nivel = 0;

    startGame() {
        console.log("Empieza el juego")
        this.secuencia = [];
        this.userSecuencia = [];
        this.nivel = 0;
        this.nextLevel();
    }

    generateSecuencia() {
        this.secuencia.push(Math.floor(Math.random() * 4));
    }

    nextLevel() {
        this.nivel++
        this.userSecuencia = [];
        this.generateSecuencia();
        console.log("La secuencia es " + this.secuencia);
    }

    validateInput(color) {
        this.userSecuencia.push(color);

        const ultimoColor = this.userSecuencia.length - 1;
        if(this.userSecuencia[ultimoColor] != this.secuencia[ultimoColor]) {
            return 'Has perdido';
            UI.msgEstado('Has perdido');
        }

        if(this.userSecuencia.length === this.secuencia.length) {
            return 'Siguiente nivel';           
            console.log('Enhorabuena has pasado al siguiente nivel');
        }
    }
    




}
export class SimonGame {
    constructor(colors) {
        this.colors = colors;
    }

    startGame() {
        // Inicializamos las variables que va tener el juego y van a seguir el curso del juego
        this.sequence = [];
        this.userSequence = [];
        this.level = 0;
        this.nextLevel();
    }

    nextLevel() {
        // Aumentamos en 1 el nivel, vaciamos el array con la secuencia del usuario y llamamos a generateSequence para crear una nueva secu
        this.level++;
        this.userSequence = [];
        this.generateSequence();
    }

    generateSequence() {
        const randomColor = this.colors[Math.floor(Math.random() * 4)];
        this.sequence.push(randomColor);
    }

    validateInput(color) {
        // Validamos la entrada del usuario, metemos en el array de la secuencia del usuario el color que ha pulsado
        this.userSequence.push(color);

        // Comprobamos si el color que ha pulsado que es el ultimo del array, es distinto del que tocaba en la secuencia
        const colorActual = this.userSequence.length - 1;
        if (this.userSequence[colorActual] !== this.sequence[colorActual]) {
            return 'GAME_OVER';
        }

        // Comprobamos que ambos arrays tienen la misma longitud para ver si ha finalizado correctamente porque si se hubiera equivocado no hubiera pasado del if de arriba
        if (this.userSequence.length === this.sequence.length) {
            return 'NEXT_LEVEL';
        }

        return 'CONTINUE';
    }

    getSequence() {
        return this.sequence;
    }

    getLevel() {
        return this.level;
    }

}
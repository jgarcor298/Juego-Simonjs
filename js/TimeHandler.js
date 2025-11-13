export class TimeHandler {
    static contador = null;
    static indice = null;
    static activo = false;

    static timeAdder(UI, numberElements, time) {
        if (TimeHandler.activo === false) {
            TimeHandler.contador = numberElements;
            TimeHandler.activo = true;

            TimeHandler.indice = setInterval(() => {
                console.log("Añado un hijo");
                UI.add();

                TimeHandler.contador--;
                
                if (TimeHandler.contador === 8) TimeHandler.stop();
            }, time);

        } else console.log("Ya se ha lanzado un contador");
    }

    static stop() {
        clearInterval(TimeHandler.indice);
    }

    static status() {
        return TimeHandler.contador;
    }

}
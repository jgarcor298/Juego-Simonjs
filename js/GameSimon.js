import { UI } from "./UI.js";


export class GameSimon {
    Colors = [];

    addColors = (colorOn, colorOff) => {
        this.Colors.push({
            colorOn: colorOn,
            colorOff: colorOff,
        })
    }

    getColors = (posicion) => {
        if (this.Colors.length < posicion) console.log('No existen colores en esa posición');
        else {
            let elemento = this.Colors[posicion];
            console.log(elemento.colorOn, elemento.colorOff);
            return this.Colors[posicion];
        }
    }

    setColors = (id, posicion) => {
        let color = this.getColors(posicion);

        UI.changeColor(id, color.colorOn, color.colorOff);
    }

    playSequence = (secuencia) => {
            
        let secuencia = secuencia.replace(" ", "").split(",");

    }
}
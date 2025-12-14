export const UI = {
    status : {
        ON : 1,
        OFF : 0
    },

    listButtons : [],
    
    init(configButtons, onClick) {
        UI.listButtons = configButtons;
        UI.listButtons.forEach((item, index) => {
            item.element = document.getElementById(item.id);

            item.element.addEventListener('click', () => {
                console.log("Click en", item.id);
                if (onClick) {
                    onClick(index);
                }
            });
        })
    },

    change: (element, status) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                element.element.style.backgroundColor = (status === UI.status.ON) ? element.colorOn : element.colorOff;
                resolve(true);
            }, 500);
        });
    },

    play : async (secuencia) => {
        for( let item of secuencia) {
            await UI.change(UI.listButtons[item], UI.status.ON);
            await UI.change(UI.listButtons[item], UI.status.OFF);
        }
    },

    msgEstado : (mensaje) => {
        document.getElementById('estado').innerHTML = mensaje;
    }

}
export const UI = {
    container:null,
    template:null,

    init: (config) =>{
        UI.container = document.getElementById(config.container);
        UI.template = document.getElementById(config.template);   
    },

    add:() => {
        const clon = UI.template.content.cloneMode(true);
        const box = clon.querySelector('.box');

        UI.container.appendChild(clon);
        
    },

    changeColor : (id, colorOn, colorOff) => {
    const tecla = document.getElementById(id);
    tecla.style.backgroundColor = colorOn;

    setInterval(() => {
        tecla.style.backgroundColor = colorOff;
    }, 2000);
}



}
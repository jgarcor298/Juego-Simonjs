import { UI} from "./UI.js";
import { TimeHandler } from "./TimeHandler.js";

UI.init({
    container: "container",
    template: "template",
});

TimeHandler.timeAdder(UI, 10, 3000);
TimeHandler.timeAdder(UI, 10, 2000);
console.log(TimeHandler.status());
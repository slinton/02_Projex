//
// ContentView
//
import { View } from "./View.js";
import { SummaryView } from "./SummaryView.js";
import { DetailView } from "./DetailView.js";

export class ContentView extends View {
    constructor(projexModel, parentElement, classList = "content-view") {
        super();
        this._projexModel = projexModel;

        this._element = document.createElement("div");
        this._element.classList.add(classList);
        parentElement.appendChild(this._element);


    }

    render() {
        console.log("Rendering ContentView");
        this._element.innerHTML = "";

        (new SummaryView(this._projexModel, this._element)).render();
        (new DetailView(this._projexModel, this._element)).render();
    }
}

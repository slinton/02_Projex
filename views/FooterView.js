//
// FooterView
//
import { View } from "./View.js";

export class FooterView extends View {
    constructor(projexModel, parentElement, classList="footer-view") {
        super();
        this._projexModel = projexModel;
        this._element = document.createElement("div");
        this._element.classList.add(classList);
        parentElement.appendChild(this._element);
    }

    render() {
        this._element.innerHTML = "Footer";

    }
}
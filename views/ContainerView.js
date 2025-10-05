//
// ContainerView - View class wrapper for a styled div
//
import { View } from "./View.js";

export class ContainerView extends View {
    constructor(parentView, className) {
        super();
        parentView.addChild(this);

        this._element = document.createElement("div");
        this._element.classList.add(className);
    }

    render() {
    }
}

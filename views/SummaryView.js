//
// SummaryView
//
import { View } from "./View.js";
import { SummaryContents } from "./SummaryContents.js";


export class SummaryView extends View {
    constructor(projexModel, parentElement) {
        super();
        this._projexModel = projexModel;

        this._element = document.createElement("div");
        this._element.classList.add("summary-view");
        parentElement.appendChild(this._element);
    }

    render() {
        console.log("Rendering SummaryView");
        this._element.innerHTML = "";
        const project = this._projexModel.currentProject;
        if (project === null) {
            this._element.textContent = "No Project Selected";
            return;
        }

        // Erase existing contents
        this._element.innerHTML = "";

        // Add summary contents
        (new SummaryContents(this._projexModel, this._element)).render();

        // Handle keystrokes for adding tasks and subprojects
        // this._element.tabIndex = 0; // Make div focusable
        // this._element.focus();
        // this._element.addEventListener("keydown", (event) => {
        //     console.log('Keydown event:', event.key);
        //     if (event.key === "ArrowUp") {
        //         event.preventDefault();
        //         this._projexModel.actionList.doAction(new MoveItemAction(this._projexModel, -1));
        //         this._projexModel.notifyViews();
        //     }
        //     else if (event.key === "ArrowDown") {
        //         event.preventDefault();
        //         this._projexModel.doAction(new MoveItemAction(this._projexModel, 1));
        //         this._projexModel.notifyViews();
        //     }
        // });

    }
}
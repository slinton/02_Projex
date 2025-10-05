//
// Detail View

import { View } from "./View.js"
import { Task } from "../models/Task.js";
import { Project } from "../models/Project.js";
import { TaskDetailsView } from "./TaskDetailsView.js";
import { ProjectDetailsView } from "./ProjectDetailsView.js";


export class DetailView extends View {
    constructor(projexModel) {
        super();
        this._projexModel = projexModel;

        this._element = document.createElement("div");
        this._element.classList.add("detail-view");

        this.addChildView(new TaskDetailsView(this._projexModel));
        this.addChildView(new ProjectDetailsView(this._projexModel));
    }

    render() {
        console.log("Rendering DetailView");

        this._element.innerHTML = "";
        const selectedItem = this._projexModel.selectedItem;
        console.log('DetailView rendering for selected item:', selectedItem ? selectedItem.name : 'None');

        if (selectedItem === null) {
            const itemLabel = document.createElement("h2");
            itemLabel.textContent = "No item selected";
            this._element.appendChild(itemLabel);
            return this._element;
        }

        this.renderChildViews();

        // if (selectedItem instanceof Task) {
        //     this._taskDetailsView.render();
        // } else if (selectedItem instanceof Project) {
        //     this._projectDetailsView.render();
        // }

        // // TODO: create this in the constructor and just update it here
        // if (selectedItem instanceof Task) {
        //     new TaskDetailsView(this._projexModel, selectedItem, this);
        // } else if (selectedItem instanceof Project) {
        //     new ProjectDetailsView(this._projexModel, selectedItem, this);
        // }

    }
}
//
// TaskDetailsView
//
import { ModifyItemAction } from "../actions/ModifyItemAction.js";
import { View } from "./View.js";
import { Task, TaskStatus } from "../models/Task.js";

export class TaskDetailsView extends View {
    constructor(projexModel, parentElement) {
        super();
        this._projexModel = projexModel;
        this._element = document.createElement("div");
        this._element.classList.add("task-details-view");
        parentElement.appendChild(this._element);
    }

    render() {
        console.log("Rendering TaskDetailsView");
        this._element.innerHTML = "";
        
        const task = this._projexModel.selectedItem;
        if (!(task instanceof Task)) {
            this._element.style.display = "none";
            return;
        }
        this._element.style.display = "block";

        // Title
        const name = document.createElement("input");
        if (task.name === "") {
            name.placeholder = "Enter Name";
        }
        else {
            name.value = task.name;
        }
        name.classList.add("item-name");
        this._element.appendChild(name);
        name.onchange = () => {
            const action = new ModifyItemAction(task, () => {
                task.name = name.value;
            });
            this._projexModel.doAction(action);
            this._projexModel.notifyViews();
        };

        const statusSelect = document.createElement("select");
        Object.values(TaskStatus).forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            if (task.status === type) option.selected = true;
            statusSelect.appendChild(option);
        });
        statusSelect.onchange = () => {
            const action = new ModifyItemAction(task, () => {
                task.status = statusSelect.value;
            });
            this._projexModel.actionList.doAction(action);
            this._projexModel.notifyViews();
        };
        this._element.appendChild(statusSelect);

        // Description
        if (task.description) {
            const descriptionLabel = document.createElement("h3");
            descriptionLabel.textContent = "Description";
            this._element.appendChild(descriptionLabel);

            const descriptionDiv = document.createElement("div");
            descriptionDiv.textContent = this._task.description;
            this._element.appendChild(descriptionDiv);
        }

    }
}
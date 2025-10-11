//
// ProjectDetailsView
//
import { View } from "./View.js";
import { ModifyItemAction } from "../actions/ModifyItemAction.js";
import { Project, ProjectStatus } from "../models/Project.js";

export class ProjectDetailsView extends View {
    constructor(projexModel, parentElement) {
        super();
        this._projexModel = projexModel;
        this._element = document.createElement("div");
        this._element.classList.add("project-details-view");
        parentElement.appendChild(this._element);
    }

    render() {
        console.log("Rendering ProjectDetailsView");

        this._element.innerHTML = "";
        const project = this._projexModel.selectedItem;
        if (!(project instanceof Project)) {
            this._element.style.display = "none";
            return;
        }
        this._element.style.display = "block";
        this._element.style.backgroundColor = project.color || "#3498db";

        // Title
        const name = document.createElement("input");
        name.value = project.name;
        name.classList.add("item-name");
        this._element.appendChild(name);
        name.onchange = () => {
            const action = new ModifyItemAction(project, () => {
                project.name = name.value;
            });
            this._projexModel.doAction(action);
            this._projexModel.notifyViews();
        };

        // Color Picker
        const colorContainer = document.createElement("div");
        colorContainer.classList.add("color-picker-container");
        
        const colorLabel = document.createElement("label");
        colorLabel.textContent = "Project Color: ";
        colorLabel.classList.add("color-label");
        
        const colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.value = project.color || "#3498db";
        colorPicker.classList.add("project-color-picker");
        
        colorContainer.appendChild(colorLabel);
        colorContainer.appendChild(colorPicker);
        this._element.appendChild(colorContainer);
        
        colorPicker.onchange = () => {
            const action = new ModifyItemAction(project, () => {
                project.color = colorPicker.value;
            });
            this._projexModel.doAction(action);
            this._projexModel.notifyViews();
        };

        // Status
        const statusSelect = document.createElement("select");
        statusSelect.classList.add("project-status");
        Object.values(ProjectStatus).forEach(status => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            statusSelect.appendChild(option);
        });
        statusSelect.value = project.status;
        this._element.appendChild(statusSelect);
        statusSelect.onchange = () => {
            const action = new ModifyItemAction(project, () => {
                project.status = statusSelect.value;
            });
            this._projexModel.doAction(action);
            this._projexModel.notifyViews();
        };

        // Notes
        const notesArea = document.createElement("textarea");
        notesArea.value = project.notes;
        notesArea.classList.add("project-notes");
        this._element.appendChild(notesArea);
        notesArea.onchange = () => {
            const action = new ModifyItemAction(project, () => {
                project.notes = notesArea.value;
            });
            this._projexModel.doAction(action);
            this._projexModel.notifyViews();
        };
    }
}
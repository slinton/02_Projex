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
            const action = new ModifyItemAction(this._project, () => {
                this._project.status = statusSelect.value;
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
            projexModel.doAction(action);
            projexModel.notifyViews();
        };

    }
}
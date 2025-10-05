import { TaskStatus } from "../models/Task.js";
//
// TaskSummaryView
//
import { View } from "./View.js";
import { TaskContextMenu } from "./TaskContextMenu.js";

export class TaskSummaryView extends View {
    constructor(task, parentElement) {
        super();
        this._task = task;

        this._element = document.createElement("div");
        this._element.classList.add("item-view");
        parentElement.appendChild(this._element);

        this._element.oncontextmenu = (event) => {
            event.preventDefault();
            const contextMenu = new TaskContextMenu(this._task);
            contextMenu.render(event);
        };
    }

    render() {
        this._element.innerHTML = "";

        // Task name
        const taskName = document.createElement("h3");
        taskName.textContent = this._task.name;
        this._element.appendChild(taskName);

        // Task status
        const statusLabel = document.createElement("label");
        statusLabel.textContent = this._task.status;
        this._element.appendChild(statusLabel);

    }
}
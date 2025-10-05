//
// NewTaskAction.js
//
// Action to add a new task
import { Action } from "./Action.js";
import { Task } from "../models/Task.js";

export class NewTaskAction extends Action {
    constructor(projexModel) {
        super();
        this._projexModel = projexModel;
        this._task = null;
        this._selectedItem = null;
    }

    do() {
        this._selectedItem = this._projexModel.selectedItem;
        this._task = new Task("New Task");
        this._projexModel.currentProject.addTask(this._task);
        this._projexModel.selectedItem = this._task;
    }

    undo() {
        this._projexModel.currentProject.removeTask(this._task);
        this._projexModel.selectedItem = this._selectedItem;
        this._projexModel.currentProject = this._selectedItem.parentProject;
    }

    redo() {
        this._projexModel.currentProject.addTask(this._task);
        this._projexModel.selectedItem = this._task;
        this._projexModel.currentProject = this._task.parentProject;
    }
}
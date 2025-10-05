//
// NewProjectAction
//
// An action to create a new project
import { Action } from "../actions/Action.js";
import { Project } from "../models/Project.js";

export class NewProjectAction extends Action {
    constructor(projexModel) {
        super();
        this._projexModel = projexModel;
        this._project = null;
        this._selectedItem = null;
    }

    do() {
        this._selectedItem = this._projexModel.selectedItem;
        this._project = new Project("New Project");
        this._projexModel.currentProject.addSubproject(this._project);
        this._projexModel.selectedItem = this._project;
    }

    undo() {
        this._projexModel.currentProject.removeSubproject(this._project);
        this._projexModel.selectedItem = this._selectedItem;
        this._projexModel.currentProject = this._selectedItem.parentProject;
    }

    redo() {
        this._projexModel.currentProject.addSubproject(this._project);
        this._projexModel.selectedItem = this._project;
        this._projexModel.currentProject = this._project.parentProject;
    }
}
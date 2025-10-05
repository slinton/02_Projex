//
// DeleteAction
//
// Action to delete a task or project
import { Action } from "./Action.js";

export class DeleteAction extends Action {
    constructor(projexModel) {
        super();
        this._projexModel = projexModel;
        this._currenProject = null;
        this._deletedItem = null;
    }

    do() {
        this._currenProject = this._projexModel.currentProject;
        this._deletedItem = this._projexModel.selectedItem;
        this._currenProject.removeItem(this._deletedItem);
        this._currenProject.selectedItem = this._currenProject.selectFirstItem();
    }

    undo() {
        this._currenProject.addItem(this._deletedItem);
        this._currenProject.selectedItem = this._deletedItem;
        this._projexModel.currentProject = this._currenProject;
    }

    redo() {
        this._currenProject.removeItem(this._deletedItem);
        this._currenProject.selectedItem = this._currenProject.selectFirstItem();
        this._projexModel.currentProject = this._currenProject;
    }
}
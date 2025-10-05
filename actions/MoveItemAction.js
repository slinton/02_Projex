//
// MoveItemAction
// Action to move an item (task or project) from one parent project to another
import { Action } from "./Action.js";

export class MoveItemAction extends Action {
    constructor(projexModel, direction) {
        super();
        this._projexModel = projexModel;
        this._item = null;
        this._direction = direction; // -1 for up, 1 for down
    }

    do() {
        this._item = this._projexModel.selectedItem;
        this._projexModel.moveItem(this._item, this._direction);

    }

    undo() {
        this._projexModel.moveItem(this._item, -this._direction);
        this._projexModel.selectedItem = this._item;
        this._projexModel.currentProject = this._item.parentProject;
    }

    redo() {
        this._projexModel.moveItem(this._item, this._direction);
        this._projexModel.currentProject = this._item.parentProject;
        this._projexModel.selectedItem = this._item;
    }

}
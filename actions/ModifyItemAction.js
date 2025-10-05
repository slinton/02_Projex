//
// ModifyItemAction.js
//
// Action to modify an item's details
import { Action } from "./Action.js";

export class ModifyItemAction extends Action {
    constructor(item, modifyCallback) {
        super();
        this._item = item;
        this._oldValues = {};
        this._newValues = {};
        Object.assign(this._oldValues, item);
        this.modify = modifyCallback;
    }
    

    do() {
        Object.assign(this._oldValues, this._item);
        this.modify();
        Object.assign(this._newValues, this._item);
    }

    undo() {
        Object.assign(this._item, this._oldValues);
    }

    redo() {
        Object.assign(this._item, this._newValues);
    }
}
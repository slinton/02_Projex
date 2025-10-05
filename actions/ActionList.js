//
// ActionList
//
// Manages actions to support undo/redo functionality
import { Action } from "./Action.js";

export class ActionList {
    constructor() {
        this._actions = [];
        this._currentIndex = -1; // Points to the last performed action
        ActionList._instance = this;
    }

    get canUndo() {
        return this._currentIndex > -1;
    }

    get canRedo() {
        return this._currentIndex < this._actions.length - 1;
    }

    addAction(action) {
        this._actions.push(action);
        this._currentIndex++;
    }

    doAction(action) {
        // If we're adding a new action, remove any "redo" actions
        action.do();
        this._actions = this._actions.slice(0, this._currentIndex + 1);
        this._actions.push(action);
        this._currentIndex++;
    }

    undo() {
        if (this._currentIndex >= 0) {
            const action = this._actions[this._currentIndex];
            action.undo();
            this._currentIndex--;
        }
    }

    redo() {
        if (this._currentIndex < this._actions.length - 1) {
            const action = this._actions[this._currentIndex + 1];
            action.redo();
            this._currentIndex++;
        }
    }
}
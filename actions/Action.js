//
// Action.js
//
// Super class for all undoable actions
export class Action {
    constructor() {
    }

    do() {
        //throw new Error("do() method must be implemented by subclasses");
    }

    undo() {
        //throw new Error("undo() method must be implemented by subclasses");
    }

    redo() {
        
    }
}

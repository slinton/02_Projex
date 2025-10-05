import { ProjectItem } from "./ProjectItem.js"; 

export const TaskStatus = {
    NOT_STARTED: "not started",
    IN_PROGRESS: "in progress",
    COMPLETED: "completed"
};

export class Task extends ProjectItem {
    constructor(name, status = TaskStatus.NOT_STARTED) {
        super(name); // Call base constructor
        this._status = status;
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
       if (Object.values(TaskStatus).includes(newStatus)) {
           this._status = newStatus;
       } else {
           throw new Error(`Invalid task status: ${newStatus}`);
       }
    }
}
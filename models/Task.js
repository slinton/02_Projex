import { ProjectItem } from "./ProjectItem.js"; 

export const TaskStatus = {
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed"
};

export class Task extends ProjectItem {
    constructor(name, status = TaskStatus.NOT_STARTED) {
        super(name); 
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

    toJSON() {
        return {
            name: this.name,
            status: this._status,
            notes: this.notes
        };
    }

    fromJSON(data) {
        this.name = data.name;
        this._status = data.status;
        this.notes = data.notes || "";
    }
}
import { Task, TaskStatus } from "./Task.js";
import { ProjectItem } from "./ProjectItem.js"; // Import the base class

export const ProjectStatus = {
    NOT_STARTED: "Not Started",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed",
    PAUSED: "Paused",
    FUTURE: "Future"

};

export class Project extends ProjectItem {
    constructor(name, status = ProjectStatus.NOT_STARTED, notes = "", color = "#3498db") {
        super(name, notes);
        this.color = color; 
        this._tasks = [];
        this._subprojects = [];
        this._status = status;
        this._notes = notes;
        this._selectedItem = this._tasks[0] || this._subprojects[0] || null;
    }

    selectFirstItem() {
        return this._tasks[0] || this._subprojects[0] || null;
    }

    get selectedItem() {
        return this._selectedItem;
    }

    set selectedItem(item) {
        this._selectedItem = item;
    }

    get tasks() {
        return this._tasks;
    }

    get subprojects() {
        return this._subprojects;
    }

    get status() {
        return this._status;
    }

    set status(newStatus) {
        if (Object.values(ProjectStatus).includes(newStatus)) {
            this._status = newStatus;
        } else {
            throw new Error(`Invalid project status: ${newStatus}`);
        }
    }

    get notes() {
        return this._notes;
    }

    set notes(notes) {
        this._notes = notes;
    }

    get color() {
        return this._color;
    } 

    set color(newColor) {
        this._color = newColor;
    }

    addTask(task) {
        this._tasks.push(task);
        task.parentProject = this;
    }

    addTasks(tasks) {
        this._tasks.push(...tasks);
        tasks.forEach(task => task.parentProject = this);
    }

    addSubproject(subproject) {
        this._subprojects.push(subproject);
        subproject.parentProject = this;
    }

    addSubprojects(subprojects) {
        this._subprojects.push(...subprojects);
        subprojects.forEach(subproject => subproject.parentProject = this);
    }

    removeItem(item) {
        if (item instanceof Task) {
            this.removeTask(item);
        } else if (item instanceof Project) {
            this.removeSubproject(item);
        }
    }

    addItem(item) {
        if (item instanceof Task) {
            this.addTask(item);
        } else if (item instanceof Project) {
            this.addSubproject(item);
        }
    }

    removeTask(task) {
        const index = this._tasks.indexOf(task);
        if (index > -1) {
            this._tasks.splice(index, 1);
            task.parentProject = null;
        }
        if (this._selectedItem === task) {
            this._selectedItem = this._tasks[0] || this._subprojects[0] || null;
        }
    }

    removeSubproject(subproject) {
        const index = this._subprojects.indexOf(subproject);
        if (index > -1) {
            this._subprojects.splice(index, 1);
            subproject.parentProject = null;
        }
        if (this._selectedItem === subproject) {
            this._selectedItem = this._tasks[0] || this._subprojects[0] || null;
        }
    }

    getCompletedPercentage() {
        let total = this._tasks.length + this._subprojects.length;
        if (total <= 0.0) {
            return 0.0;
        }

        let completed = 0;
        this._tasks.forEach(task => {
            if (task.status === TaskStatus.COMPLETED) {
                completed++;
            }
        });
        
        this._subprojects.forEach(project => {
            completed += 0.01 * project.getCompletedPercentage();
        });

        return 100 * completed / total;
    }

    toJSON() {
        return {
            name: this.name,
            status: this._status,
            notes: this._notes,
            color: this.color,  // Add this line
            tasks: this._tasks.map(task => task.toJSON()),
            subprojects: this._subprojects.map(project => project.toJSON())
        };
    }

    fromJSON(data) {
        this.name = data.name || "";
        this._status = data.status || ProjectStatus.NOT_STARTED;
        this._notes = data.notes || "";
        this.color = data.color || "#3498db";  // Add this line
        
        // Clear existing items
        this._tasks = [];
        this._subprojects = [];
        
        // Recreate tasks
        if (data.tasks) {
            data.tasks.forEach(taskData => {
                const task = new Task();
                task.fromJSON(taskData);
                this.addTask(task);
            });
        }
        
        // Recreate subprojects
        if (data.subprojects) {
            data.subprojects.forEach(projectData => {
                const project = new Project();
                project.fromJSON(projectData);
                this.addSubproject(project);
            });
        }
        
        // Reset selected item
        this._selectedItem = this._tasks[0] || this._subprojects[0] || null;
    }

}
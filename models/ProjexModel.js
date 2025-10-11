import { Project } from "./Project.js";
import { Task, TaskStatus } from "./Task.js";
import { Model } from "./Model.js";
import { ActionList } from "../actions/ActionList.js";

export class ProjexModel extends Model {
    constructor() {
        super();
        this._rootProject = null;
        this.init();
        this._currentProject = this._rootProject;
        this._actionList = new ActionList();
    }

    get currentProject() {
        return this._currentProject;
    } 

    // Might be nicer to keep selected item from the last time this project was active
    set currentProject(project) {
        this._currentProject = project;
        console.log('Current project set to:', project.name);
        // Auto-select first item in new current project
        this.selectedItem = this._currentProject.tasks[0] || this._currentProject.subprojects[0] || null;
        console.log('Selected item set to:', this.selectedItem ? this.selectedItem.name : 'None');
    }

    get selectedItem() {
        return this._currentProject.selectedItem;
    }

    set selectedItem(item) {
        this._currentProject.selectedItem = item;
    }

    get actionList() {
        return this._actionList;
    }

    init() {
        // Top-level project
        this._rootProject = new Project("All Projects");
        // this._rootProject.addTask(new Task("Review all projects", TaskStatus.NOT_STARTED));
        // this._rootProject.addTask(new Task("Prepare summary report", TaskStatus.IN_PROGRESS));

        // Subproject 1
        const personal = new Project("Personal");
        this._rootProject.addSubproject(personal);
        personal.addTasks([
            new Task("Buy groceries", TaskStatus.NOT_STARTED),
            new Task("Call plumber", TaskStatus.IN_PROGRESS),
            new Task("Plan weekend trip", TaskStatus.COMPLETED)
        ]);

        this._rootProject.addSubproject(new Project("School"));
        this._rootProject.addSubproject(new Project("ORBIT"));

        // const alpha = new Project("Project Alpha");
        // this._rootProject.addSubproject(alpha);
        // alpha.addTasks([
        //     new Task("Design UI", TaskStatus.COMPLETED),
        //     new Task("Set up database", TaskStatus.IN_PROGRESS),
        //     new Task("Write documentation", TaskStatus.NOT_STARTED),
        //     new Task("Design UI 2", TaskStatus.COMPLETED)
        // ]);
        // alpha.addTask(new Task("Set up database 2", TaskStatus.IN_PROGRESS));
        // alpha.addTask(new Task("Write documentation 2", TaskStatus.NOT_STARTED));
        // alpha.addTask(new Task("Design UI 3", TaskStatus.COMPLETED));
        // alpha.addTask(new Task("Set up database 3", TaskStatus.IN_PROGRESS));
        // alpha.addTask(new Task("Write documentation 3", TaskStatus.NOT_STARTED));
        // alpha.addTask(new Task("Design UI 4", TaskStatus.COMPLETED));
        // alpha.addTask(new Task("Set up database 4", TaskStatus.IN_PROGRESS));
        // alpha.addTask(new Task("Write documentation 4", TaskStatus.NOT_STARTED));
        // alpha.addTask(new Task("Design UI 5", TaskStatus.COMPLETED));
        // alpha.addTask(new Task("Set up database 5", TaskStatus.IN_PROGRESS));
        // alpha.addTask(new Task("Write documentation 5", TaskStatus.NOT_STARTED));
        // alpha.addTask(new Task("Design UI 6", TaskStatus.COMPLETED));
        // alpha.addTask(new Task("Set up database 6", TaskStatus.IN_PROGRESS));
        // alpha.addTask(new Task("Write documentation 6", TaskStatus.NOT_STARTED));
        // alpha.addTask(new Task("Design UI 7", TaskStatus.COMPLETED));
        // alpha.addTask(new Task("Set up database 7", TaskStatus.IN_PROGRESS));
        // alpha.addTask(new Task("Write documentation 7", TaskStatus.NOT_STARTED));
        // alpha.addTask(new Task("Design UI 8", TaskStatus.COMPLETED));
        // alpha.addTask(new Task("Set up database 8", TaskStatus.IN_PROGRESS));
        // alpha.addTask(new Task("Write documentation 8", TaskStatus.NOT_STARTED));

        // Sub-subprojects for Alpha
        // const alphaMobile = new Project("Alpha - Mobile");
        // alphaMobile.addTask(new Task("Build Android app", TaskStatus.IN_PROGRESS));
        // alphaMobile.addTask(new Task("Test iOS app", TaskStatus.NOT_STARTED));

        // const alphaWeb = new Project("Alpha - Web");
        // alphaWeb.addTask(new Task("Deploy frontend", TaskStatus.COMPLETED));
        // alphaWeb.addTask(new Task("Integrate API", TaskStatus.NOT_STARTED));

        // alpha.addSubproject(alphaMobile);
        // alpha.addSubproject(alphaWeb);

        // Subproject 2
        // const beta = new Project("Project Beta");
        // this._rootProject.addSubproject(beta);
        // beta.addTask(new Task("Research market", TaskStatus.COMPLETED));
        // beta.addTask(new Task("Create prototype", TaskStatus.IN_PROGRESS));

        // // Sub-subproject for Beta
        // const betaAnalysis = new Project("Beta - Analysis");
        // betaAnalysis.addTask(new Task("Collect feedback", TaskStatus.NOT_STARTED));
        // betaAnalysis.addTask(new Task("Analyze data", TaskStatus.NOT_STARTED));
        // beta.addSubproject(betaAnalysis);

        // Make the root project the current project
        this.currentProject = this._rootProject;
    }

    get rootProject() {
        return this._rootProject;
    }

    doAction(action) {
        this._actionList.doAction(action);
    }

    undoAction() {
        this._actionList.undo();
    }

    redoAction() {
        this._actionList.redo();
    }

    deleteItem(item) {
        if (item === null) return;

        const parent = item.parentProject;
        if (parent === null) return; // Can't delete root project

        if (item instanceof Project) {
            parent.removeSubproject(item);
        } else if (item instanceof Task) {
            parent.removeTask(item);
        }
    }

    changeSelectedItem(direction) {
        const item = this.selectedItem;
        if (item === null) return;
        const parent = item.parentProject;
        if (parent === null) return; // Should never be true

        if (item instanceof Project) {
            const index = parent.subprojects.indexOf(item);
            if (index + direction < 0 || index + direction >= parent.subprojects.length) {
                return;
            }
            this.selectedItem = parent.subprojects[index + direction];
        } 
        else if (item instanceof Task) {
            const index = parent.tasks.indexOf(item);
            if (index + direction < 0 || index + direction >= parent.tasks.length) {
                return;
            }
            this.selectedItem = parent.tasks[index + direction];
        }
    }

    canSelectedItemCanMove(direction) {
        const item = this.selectedItem;
        if (item === null) return false;
        const parent = item.parentProject;
        if (parent === null) return false; // Should never be true

        if (item instanceof Task) {
            const index = parent.tasks.indexOf(item);
            if (index + direction < 0 || index + direction >= parent.tasks.length) {
                return false;
            }
            return true;
        }
        else if (item instanceof Project) {
            const index = parent.subprojects.indexOf(item);
            if (index + direction < 0 || index + direction >= parent.subprojects.length) {
                return false;
            }
            return true;
        }
        return false;
    }

    moveItem(item, direction) {
        if (item === null) return;

        const parent = item.parentProject;
        console.log('Parent project:', parent ? parent.name : 'None');

        if (parent === null) return; // Can't move root project


        if (item instanceof Project) {
            const index = parent.subprojects.indexOf(item);
            const newIndex = index + direction;
            console.log('Current index:', index, 'New index:', newIndex);
            if (newIndex < 0 || newIndex >= parent.subprojects.length) return;
            parent.subprojects.splice(index, 1);
            parent.subprojects.splice(newIndex, 0, item);

        }
        else if (item instanceof Task) {
            const index = parent.tasks.indexOf(item);
            const newIndex = index + direction;
            console.log('Current index:', index, 'New index:', newIndex);
            if (newIndex < 0 || newIndex >= parent.tasks.length) return;
            console.log('Moving task :', item.name);
            parent.tasks.splice(index, 1);
            parent.tasks.splice(newIndex, 0, item);
        }
    }

    saveToLocalStorage() {
        try {
            console.log('Saving project data to localStorage...');
            const data = JSON.stringify(this._rootProject.toJSON());
            localStorage.setItem('projexData', data);
            console.log('Data successfully saved to localStorage');
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('projexData');
            if (data) {
                console.log('Loading project data from localStorage...');
                const parsedData = JSON.parse(data);
                this._rootProject = new Project();
                this._rootProject.fromJSON(parsedData);
                this.currentProject = this._rootProject;
                console.log('Data successfully loaded from localStorage');
                return true;
            } else {
                console.log('No data found in localStorage');
                return false;
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            return false;
        }
    }

    saveToFile() {
        try {
            const data = JSON.stringify(this._rootProject.toJSON(), null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'projex-data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            console.log('Data exported to file');
            return true;
        } catch (error) {
            console.error('Error saving to file:', error);
            return false;
        }
    }

    loadFromFile(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file provided'));
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    this._rootProject = new Project();
                    this._rootProject.fromJSON(data);
                    this.currentProject = this._rootProject;
                    console.log('Data successfully loaded from file');
                    resolve(true);
                } catch (error) {
                    console.error('Error parsing file:', error);
                    reject(error);
                }
            };
            reader.onerror = () => reject(new Error('Error reading file'));
            reader.readAsText(file);
        });
    }

}
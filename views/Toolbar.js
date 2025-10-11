//
// Toolbar
//
import { View } from "./View.js";
// import { Project } from "../models/Project.js";
// import { Task, TaskStatus } from "../models/Task.js";
// import { Action } from "../actions/Action.js";
// import { ActionList } from "../actions/ActionList.js";
import { NewTaskAction } from "../actions/NewTaskAction.js";
import { NewProjectAction } from "../actions/NewProjectAction.js";
import { DeleteAction } from "../actions/DeleteAction.js";
import { MoveItemAction } from "../actions/MoveItemAction.js";

// TODO: how to deal with selected item change

export class Toolbar extends View {
    constructor(projexModel, parentElement) {
        super();
        this._projexModel = projexModel;
        this._element = document.createElement("div");
        this._element.id = "toolbar";
        this._element.classList.add("toolbar");
        parentElement.appendChild(this._element);

          // Jump to root project
        const rootProjectButton = document.createElement("button");
        this._element.appendChild(rootProjectButton);
        rootProjectButton.innerHTML = `<span class="material-icons">home</span>`;
        rootProjectButton.title = "Root Project";
        rootProjectButton.onclick = () => {
            this._projexModel.currentProject = this._projexModel.rootProject;
            this._projexModel.notifyViews(this);
        };

         // Jump to parent project
        const parentProjectButton = document.createElement("button");
        this._element.appendChild(parentProjectButton);
        parentProjectButton.innerHTML = `<span class="material-icons">arrow_back</span>`;
        parentProjectButton.title = "Parent Project";
        parentProjectButton.onclick = () => {
            this._projexModel.currentProject = this._projexModel.currentProject.parentProject || this._projexModel.rootProject;
            this._projexModel.notifyViews(this);
        };

        // Move item up
        const moveUpButton = document.createElement("button");
        moveUpButton.disabled = ! this._projexModel.canSelectedItemCanMove(-1);
        this._element.appendChild(moveUpButton);
        moveUpButton.innerHTML = `<span class="material-icons">arrow_upward</span>`;
        moveUpButton.title = "Move Up";
        moveUpButton.onclick = () => {
            this._projexModel.doAction(new MoveItemAction(this._projexModel, -1));
            this._projexModel.notifyViews();
        };

        // Move item down
        const moveDownButton = document.createElement("button");
        moveDownButton.disabled = ! this._projexModel.canSelectedItemCanMove(1);
        this._element.appendChild(moveDownButton);
        moveDownButton.innerHTML = `<span class="material-icons">arrow_downward</span>`;
        moveDownButton.title = "Move Down";
        moveDownButton.onclick = () => {
            this._projexModel.doAction(new MoveItemAction(this._projexModel, 1));
            this._projexModel.notifyViews();
        };

        // Add new Task
        const addTaskButton = document.createElement("button");
        this._element.appendChild(addTaskButton);
        addTaskButton.innerHTML = `<span class="material-icons">task</span>`;
        addTaskButton.title = "Add Task";
        addTaskButton.onclick = () => {
            this._projexModel.doAction(new NewTaskAction(this._projexModel));
            this._projexModel.notifyViews();
        };

        // Add new project
        const addProjectButton = document.createElement("button");
        this._element.appendChild(addProjectButton);
        addProjectButton.innerHTML = `<span class="material-icons">work</span>`;
        addProjectButton.title = "Add Project";
        addProjectButton.onclick = () => {
            this._projexModel.doAction(new NewProjectAction(this._projexModel));
            this._projexModel.notifyViews();
        };

        // Delete selected item
        const deleteButton = document.createElement("button");
        this._element.appendChild(deleteButton);
        deleteButton.innerHTML = `<span class="material-icons">delete</span>`;
        deleteButton.title = "Delete";
        deleteButton.onclick = () => {
            this._projexModel.doAction(new DeleteAction(this._projexModel));
            this._projexModel.notifyViews();
        };

        // Undo
        const undoButton = document.createElement("button");
        undoButton.disabled = ! this._projexModel.actionList.canUndo;
        this._element.appendChild(undoButton);
        undoButton.innerHTML = `<span class="material-icons">undo</span>`;
        undoButton.title = "Undo";
        undoButton.onclick = () => {
            this._projexModel.undoAction();
            this._projexModel.notifyViews();
        };
        
        // Redo
        const redoButton = document.createElement("button");
        redoButton.disabled = ! this._projexModel.actionList.canRedo;
        this._element.appendChild(redoButton);
        redoButton.innerHTML = `<span class="material-icons">redo</span>`;
        redoButton.title = "Redo";
        redoButton.onclick = () => {
            this._projexModel.redoAction();
            this._projexModel.notifyViews();
        };

        // Save to local storage
    //     const saveLocalButton = document.createElement("button");
    //     this._element.appendChild(saveLocalButton);
    //     saveLocalButton.innerHTML = `<span class="material-icons">storage</span>`;
    //     saveLocalButton.title = "Save to Browser Storage";
    //     saveLocalButton.onclick = () => {
    //         if (this._projexModel.saveToLocalStorage()) {
    //             console.log('Data saved to local storage');
    //         }
    //     };

    //     // Load from local storage
    //     const loadLocalButton = document.createElement("button");
    //     this._element.appendChild(loadLocalButton);
    //     loadLocalButton.innerHTML = `<span class="material-icons">cloud_download</span>`;
    //     loadLocalButton.title = "Load from Browser Storage";
    //     loadLocalButton.onclick = () => {
    //         if (this._projexModel.loadFromLocalStorage()) {
    //             this._projexModel.notifyViews();
    //             console.log('Data loaded from local storage');
    //         }
    //     };

    //      // Save to file
    //     const saveFileButton = document.createElement("button");
    //     this._element.appendChild(saveFileButton);
    //     saveFileButton.innerHTML = `<span class="material-icons">download</span>`;
    //     saveFileButton.title = "Export to File";
    //     saveFileButton.onclick = () => {
    //         if (this._projexModel.saveToFile()) {
    //             console.log('Data exported to file');
    //         }
    //     };

    //     // Load from file
    //     const loadFileButton = document.createElement("button");
    //     this._element.appendChild(loadFileButton);
    //     loadFileButton.innerHTML = `<span class="material-icons">folder_open</span>`;
    //     loadFileButton.title = "Load from File";
    //     loadFileButton.onclick = () => {
    //         // Create a hidden file input
    //         const fileInput = document.createElement('input');
    //         fileInput.type = 'file';
    //         fileInput.accept = '.json';
    //         fileInput.style.display = 'none';
            
    //         fileInput.onchange = async (e) => {
    //             const file = e.target.files[0];
    //             if (file) {
    //                 try {
    //                     await this._projexModel.loadFromFile(file);
    //                     console.log('File loaded successfully');
    //                     // Refresh all views after loading
    //                     this._projexModel.notifyViews();
    //                     // Show success message
    //                     alert('Project data loaded successfully!');
    //                 } catch (error) {
    //                     console.error('Failed to load file:', error);
    //                     alert(`Failed to load file: ${error.message}`);
    //                 }
    //             }
    //             // Clean up the file input
    //             document.body.removeChild(fileInput);
    //         };
            
    //         // Add to DOM and trigger click
    //         document.body.appendChild(fileInput);
    //         fileInput.click();
    //     };

    }

    render() {
       
    }
}
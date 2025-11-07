import { TaskDetailsView } from "../views/TaskDetailsView.js";
import { ProjexModel } from "../models/ProjexModel.js";
import { Project, ProjectStatus } from "../models/Project.js";
import { Task, TaskStatus } from "../models/Task.js";

export class TestTaskDetailsView {
    constructor() {
        this.model = null;
        this.taskDetailsView = null;
        this.container = null;
        this.infoUpdateView = null;
        
        console.log("TestTaskDetailsView instance created");
    }

    createTestModel() {
        const model = new ProjexModel();
        model._rootProject.addTasks([
            new Task("Test Task 1", TaskStatus.NOT_STARTED),
            new Task("Test Task 2", TaskStatus.IN_PROGRESS),
            new Task("Test Task 3", TaskStatus.COMPLETED)
        ]);
        return model;
    }

    render() {
        console.log("Initializing TaskDetailsView Test");
        
        // Create the model with test data
        this.model = this.createTestModel();
        this.model.selectedItem = this.model.currentProject.tasks[0];

        // body style adjustments
        document.body.style.boxSizing = "border-box";
        document.body.style.margin = "0";
        document.body.style.padding = "2rem";
        document.body.style.fontFamily = "Arial, sans-serif";
        document.body.style.backgroundColor = "#a8a8a8ff";
        
        // Add title
        const title = document.createElement("h1");
        title.textContent = "TaskDetailsView Test";
        title.style.marginTop = "0";
        document.body.appendChild(title);
        
        // Create the TaskDetailsView
        this.taskDetailsView = new TaskDetailsView(this.model, document.body);
        
        // Register the view with the model
        this.model.addView(this.taskDetailsView);
        
        // Initial render
        this.taskDetailsView.render();
        
        // Add test controls
        this.createTestControls();
        
        console.log("TaskDetailsView Test initialized successfully");
        console.log("Selected task:", this.model.selectedItem);
    }

    createTestControls() {
        const controlsContainer = document.createElement("div");
        controlsContainer.style.marginTop = "2rem";
        controlsContainer.style.padding = "1rem";
        controlsContainer.style.border = "1px solid #ddd";
        controlsContainer.style.backgroundColor = "#f9f9f9";
        
        const controlsTitle = document.createElement("h2");
        controlsTitle.textContent = "Test Controls";
        controlsTitle.style.marginTop = "0";
        controlsContainer.appendChild(controlsTitle);
        
        // Create buttons
        this.createSwitchTaskButton(controlsContainer);

        
        // Create info display
        this.createInfoDisplay(controlsContainer);
        
        document.body.appendChild(controlsContainer);
    }

    createSwitchTaskButton(container) {
        const switchTaskBtn = document.createElement("button");
        switchTaskBtn.textContent = "Switch to Next Task";
        switchTaskBtn.style.margin = "5px";
        switchTaskBtn.style.padding = "8px 12px";
        
        let currentTaskIndex = 0;
        
        switchTaskBtn.onclick = () => {
            const currentProject = this.model._rootProject;
            const tasks = currentProject.tasks;
            
            if (tasks.length > 0) {
                currentTaskIndex = (currentTaskIndex + 1) % tasks.length;
                this.model.selectedItem = tasks[currentTaskIndex];
                this.model.notifyViews();
                switchTaskBtn.textContent = `Switch to Task ${(currentTaskIndex + 1) % tasks.length + 1}`;
            }
        };
        
        container.appendChild(switchTaskBtn);
    }

    // createNewTaskButton(container) {
    //     const newTaskBtn = document.createElement("button");
    //     newTaskBtn.textContent = "Create New Task";
    //     newTaskBtn.style.margin = "5px";
    //     newTaskBtn.style.padding = "8px 12px";
        
    //     let taskCounter = 1;
        
    //     newTaskBtn.onclick = () => {
    //         const newTask = new Task(
    //             `New Test Task ${taskCounter}`, 
    //             TaskStatus.NOT_STARTED, 
    //             `Newly created task number ${taskCounter}`
    //         );
    //         this.model._rootProject.addTask(newTask);
    //         this.model._selectedItem = newTask;
    //         this.model.notifyViews();
    //         taskCounter++;
    //     };
        
    //     container.appendChild(newTaskBtn);
    // }

    createInfoDisplay(container) {
        const infoDiv = document.createElement("div");
        infoDiv.style.marginTop = "10px";
        infoDiv.style.padding = "10px";
        infoDiv.style.backgroundColor = "#fff";
        infoDiv.style.border = "1px solid #ccc";
        infoDiv.style.borderRadius = "4px";
        
        // Function to update info
        const updateInfo = () => {
            const selected = this.model.selectedItem;
            const parentProject = selected.parent || this.model._rootProject;
            
            infoDiv.innerHTML = `
                <strong>Selected Item:</strong> ${selected.name}<br>
                <strong>Type:</strong> ${selected.constructor.name}<br>
                <strong>Status:</strong> ${selected.status}<br>
                <strong>Parent Project:</strong> ${parentProject.name}<br>
                <strong>Notes Length:</strong> ${selected.notes ? selected.notes.length : 0} characters
            `;
        };
        
        // Initial info update
        updateInfo();
        
        // Create a view object for the model to notify
        this.infoUpdateView = {
            render: updateInfo
        };
        
        // Register with model
        this.model.addView(this.infoUpdateView);
        
        container.appendChild(infoDiv);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    (new TestTaskDetailsView()).render();
});

console.log("TestTaskDetailsView.js loaded");
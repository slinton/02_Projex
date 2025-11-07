import { ProjectDetailsView } from "../views/ProjectDetailsView.js";
import { ProjexModel } from "../models/ProjexModel.js";
import { Project, ProjectStatus } from "../models/Project.js";
import { Task, TaskStatus } from "../models/Task.js";

export class TestProjectDetailsView {
    constructor() {
        this.model = null;
        this.projectDetailsView = null;
        this.container = null;
        this.infoUpdateView = null;
        
        console.log("TestProjectDetailsView instance created");
    }

    createTestModel() {
        const model = new ProjexModel();
        return model;
    }

    render() {
        console.log("Initializing ProjectDetailsView Test");
        
        // Create the model with test data
        this.model = this.createTestModel();

        // body style adjustments
        document.body.boxSizing = "border-box";
        document.body.style.margin = "0";
        document.body.style.padding = "2rem";
        document.body.style.fontFamily = "Arial, sans-serif";
        document.body.style.backgroundColor = "#a8a8a8ff";
        
        // Add title
        const title = document.createElement("h1");
        title.textContent = "ProjectDetailsView Test";
        title.style.marginTop = "0";
        document.body.appendChild(title);
        
        // Create the ProjectDetailsView
        this.projectDetailsView = new ProjectDetailsView(this.model, document.body);
        
        // Register the view with the model
        this.model.addView(this.projectDetailsView);
        
        // Initial render
        this.projectDetailsView.render();
        
        // Add test controls
        this.createTestControls();
        
        console.log("ProjectDetailsView Test initialized successfully");
        console.log("Selected project:", this.model.selectedItem);
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
        this.createSwitchProjectButton(controlsContainer);
        this.createNewProjectButton(controlsContainer);
        
        // Create info display
        this.createInfoDisplay(controlsContainer);
        
        document.body.appendChild(controlsContainer);
    }

    createSwitchProjectButton(container) {
        const switchProjectBtn = document.createElement("button");
        switchProjectBtn.textContent = "Switch to Next Subproject or Root";
        switchProjectBtn.style.margin = "5px";
        switchProjectBtn.style.padding = "8px 12px";
        
        switchProjectBtn.onclick = () => {
            let subproject = this.model.selectedItem.subprojects[0];
            console.log("Switching to subproject:", subproject);
            if (subproject) {
                this.model.selectedItem = subproject;
                this.model.notifyViews();
               
            } else {
                this.model.selectedItem = this.model.rootProject;
                this.model.notifyViews();
            }
        };
        
        container.appendChild(switchProjectBtn);
    }

    createNewProjectButton(container) {
        const newProjectBtn = document.createElement("button");
        newProjectBtn.textContent = "Create New Project";
        newProjectBtn.style.margin = "5px";
        newProjectBtn.style.padding = "8px 12px";
        
        newProjectBtn.onclick = () => {
            const newProject = new Project("New Test Project", ProjectStatus.NOT_STARTED, "Newly created project");
            newProject.color = "#9b59b6";
            this.model._rootProject.addSubproject(newProject);
            this.model.selectedItem = newProject;
            this.model.notifyViews();
        };
        
        container.appendChild(newProjectBtn);
    }

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
            infoDiv.innerHTML = `
                <strong>Selected Item:</strong> ${selected.name}<br>
                <strong>Type:</strong> ${selected.constructor.name}<br>
                <strong>Status:</strong> ${selected.status}<br>
                ${selected.color ? `<strong>Color:</strong> <span style="display:inline-block;width:20px;height:15px;background:${selected.color};border:1px solid #ccc;margin-left:5px;"></span>` : ''}
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
    (new TestProjectDetailsView()).render();
});


console.log("TestProjectDetailsView.js loaded");
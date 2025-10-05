//
// ProjectSummaryView
//
// This view is responsible for rendering a single sub project 
//
import { View } from "./View.js";

export class ProjectSummaryView extends View {
    constructor(project, parentElement) {
        super();
        this._project = project;

        this._element = document.createElement("div");
        this._element.classList.add("item-view");
        parentElement.appendChild(this._element);

    }

    render() {
        this._element.innerHTML = "";
        
        const projectName = document.createElement("h3");
        projectName.textContent = this._project.name;
        this._element.appendChild(projectName); 

        const progressBar = document.createElement("progress");
        progressBar.value = this._project.getCompletedPercentage();
        progressBar.max = 100;
        this._element.appendChild(progressBar); 
    }
}
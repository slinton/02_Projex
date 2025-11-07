//
// Breadcrumbs
//
import { View } from "./View.js";

export class Breadcrumbs extends View {
    constructor(projexModel, parentElement) {
        super();
        this._projexModel = projexModel;
        this._element = document.createElement("div");
        this._element.classList.add("breadcrumbs");
        parentElement.appendChild(this._element);
    }


    render() {
        console.log("Rendering Breadcrumbs");
        
        // Clear previous breadcrumbs
        this._element.innerHTML = "";

        if (this._projexModel.currentProject === null) {
            this._element.textContent = "No Project";
            return;
        }

        let project = this._projexModel.currentProject;
        while (project !== null) {
            const projectLink = document.createElement("a");
            projectLink.href = "#";
            projectLink.textContent = project.name;
            const newProject = project;
            projectLink.onclick = () => {
                this._projexModel.currentProject = newProject;
                this._projexModel.notifyViews();
            };
            this._element.prepend(projectLink);

            project = project.parentProject;
            if (project !== null) {
                const separator = document.createElement("span");
                separator.textContent = " > ";
                this._element.prepend(separator);
            }
        }
    }
}

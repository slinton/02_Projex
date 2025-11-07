//
// HeaderView
//
import { View } from "./View.js";
import { Breadcrumbs } from "./Breadcrumbs.js";
import { AppToolbar } from "./AppToolbar.js";

export class HeaderView extends View {
    constructor(projexModel, parentElement, classList="header-view") {
        super();
        this._projexModel = projexModel;
        this._element = document.createElement("div");
        this._element.classList.add(classList);
        parentElement.appendChild(this._element);
    }

    render() {
        console.log("Rendering HeaderView");
        this._element.innerHTML = "";

        const project = this._projexModel.currentProject;
        if (project === null) {
            return;
        }

        // Breadcrumbs
        (new Breadcrumbs(this._projexModel, this._element)).render();

        // Title
        this._title = document.createElement("div");
        this._title.id = "project-title";
        this._title.classList.add("title");
        this._title.textContent = project.name;
        this._element.appendChild(this._title);

        // Toolbar
        (new AppToolbar(this._projexModel, this._element)).render();
      
    }
}
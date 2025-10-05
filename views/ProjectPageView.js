//
// ProjectPageView
//
// This view is responsible for rendering the current project
//
import { View } from "./View.js";
import { HeaderView } from "./HeaderView.js";
import { FooterView } from "./FooterView.js";
import { ContentView } from "./ContentView.js";
import { MoveItemAction } from "../actions/MoveItemAction.js";


export class ProjectPageView extends View {
    constructor(projexModel, parentElement) {
        super();
        this._projexModel = projexModel;
        this._projexModel.addView(this);

        // Create main element, attach to parent
        this._element = document.createElement("div");
        this._element.id = "project-view"; // Give the element an id
        this._element.classList.add("project-view");
        this._element.addEventListener("keydown", (event) => {
            console.log('Keydown event:', event.key);
            if (event.key === "ArrowUp") {
                if (event.ctrlKey || event.metaKey) {
                    console.log('Up arrow ctrl/meta');
                    event.preventDefault();
                    this._projexModel.doAction(new MoveItemAction(this._projexModel, -1));
                    this._projexModel.notifyViews();
                }
                else {
                    event.preventDefault();
                    this._projexModel.changeSelectedItem(-1);
                    this._projexModel.notifyViews();
                }
            } else if (event.key === "ArrowDown") {
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this._projexModel.doAction(new MoveItemAction(this._projexModel, 1));
                    this._projexModel.notifyViews();
                }
                else {
                    event.preventDefault();
                    this._projexModel.changeSelectedItem(1);
                    this._projexModel.notifyViews();
                }
            }
        });
        parentElement.appendChild(this._element);

    }

    render() {
        this._element.innerHTML = "";

        const project = this._projexModel.currentProject;
        console.log(`Rendering ProjectPageView ${project ? project.name : 'No Project'}`);

        this._element.tabIndex = 0; // Make div focusable
        this._element.focus();

        // Child views
        (new HeaderView(this._projexModel, this._element)).render();
        (new ContentView(this._projexModel, this._element)).render();
        (new FooterView(this._projexModel, this._element)).render();

        // Debugging: print view and element tree
        // this.print_view_tree();
        // this.print_element_tree(this._element, 0);
    }
}
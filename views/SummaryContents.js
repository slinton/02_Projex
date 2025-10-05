//
// SummaryContents
//
import { View } from "./View.js";
import { TaskSummaryView } from "./TaskSummaryView.js";
import { ProjectSummaryView } from "./ProjectSummaryView.js";
import { Toolbar } from "./Toolbar.js";


export class SummaryContents extends View {
    constructor(projexModel, parentElement) {
        super();
        this._projexModel = projexModel;
        this._clickTimer = null;

        this._element = document.createElement("div");
        this._element.id = "summary-contents";
        this._element.classList.add("summary-contents");
        parentElement.appendChild(this._element);
    }

    render() {
        console.log("Rendering SummaryContents");
        this._element.innerHTML = "";

        const project = this._projexModel.currentProject;
        if (project === null) {
            return;
        }

        const toolbar = new Toolbar(this._projexModel);
        this._element.appendChild(toolbar.element);
        toolbar.render();


        // Add tasks
        console.log(`Project ${project.name} has ${project.tasks.length} tasks and ${project.subprojects.length} subprojects.`);
        if (project.tasks.length !== 0) {
            console.log("Rendering tasks for project:", project.name);
            const tasksLabel = document.createElement("h2");
            tasksLabel.textContent = "Tasks";
            this._element.appendChild(tasksLabel);

            const taskList = document.createElement("div");
            taskList.id = "task-list";
            taskList.classList.add("task-list");
            this._element.appendChild(taskList);

            for (const task of project.tasks) {
                const taskSummaryView = new TaskSummaryView(task, taskList);
                taskSummaryView.render();

                // TODO: move this logic into the task view somehow
                if (task === this._projexModel.selectedItem) {
                    taskSummaryView.element.classList.add("selected");
                }

                taskSummaryView.element.onclick = () => {
                    this._projexModel.selectedItem = task;
                    this._projexModel.notifyViews();
                };
            }
        }

        //Add subprojects
        console.log(`Project ${project.name} has ${project.subprojects.length} subprojects.`);
        if (project.subprojects.length > 0) {
            const subprojectsLabel = document.createElement("h2");
            subprojectsLabel.textContent = "Subprojects";
            this._element.appendChild(subprojectsLabel);

            const subprojectList = document.createElement("div");
            subprojectList.classList.add("subproject-list");
            this._element.appendChild(subprojectList);

            for (const subproject of project.subprojects) {
                const projectSummaryView = new ProjectSummaryView(subproject, subprojectList);
                projectSummaryView.render();

                // TODO: move this to subproject view
                if (subproject === this._projexModel.selectedItem) {
                    projectSummaryView.element.classList.add("selected");
                }

                projectSummaryView.element.onclick = () => {
                    if (this._clickTimer !== null) {
                        return;
                    }
                    this._clickTimer = setTimeout(() => {
                        console.log('>>>Single click detected');
                        console.log('Selecting subproject:', subproject.name);
                        this._projexModel.selectedItem = subproject;
                        this._projexModel.notifyViews();
                        this._clickTimer = null;
                    }, 250)
                };

                projectSummaryView.element.ondblclick = () => {
                    console.log('>>>>> Double click detected');
                    if (this._clickTimer !== null) {
                        clearTimeout(this._clickTimer);
                        this._clickTimer = null;
                    }
                    this._projexModel.currentProject = subproject;
                    this._projexModel.notifyViews();
                };
            }
        }

    }
}
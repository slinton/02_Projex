
//
//  TaskContextMenu
//
export class TaskContextMenu {
    constructor(task) {
        this._task = task;
        this._element = document.createElement("div");
        this._element.classList.add("context-menu");
        this._element.id = "task-context-menu";
    }

    render(event) {
        this.remove();

        this._element.innerHTML = "";

        // Add the menu to the document body
        document.body.appendChild(this._element);
        this._element.style.position = "absolute";
        this._element.style.top = `${event.clientY}px`;
        this._element.style.left = `${event.clientX}px`;

        // Edit Task
        // const editOption = document.createElement("div");
        // editOption.classList.add("context-menu-item");
        // editOption.textContent = "Edit Task";
        // editOption.onclick = () => {
        //     // TODO this._element.remove();
        // };
        // this._element.appendChild(editOption);

        // Delete Task: TODO. This needs to get root project to notify views
        const deleteOption = document.createElement("div");
        deleteOption.classList.add("context-menu-item");
        deleteOption.textContent = "Delete Task";
        deleteOption.onclick = () => {
            const project = this._task.parentProject;
            if (project) {
                project.removeTask(this._task);
            }
            // this._element.remove();
            project.notifyViews();
        };
        this._element.appendChild(deleteOption);

        // document.body.appendChild(menu);
        document.body.appendChild(this._element);

        // Hide menu on click elsewhere
        const hideMenu = (e) => {
            if (!this._element.contains(e.target)) {
                this._element.remove();
                document.removeEventListener("click", hideMenu);
            }
        };
        document.addEventListener("click", hideMenu);
    }

    remove() {
        const menu = document.getElementById("task-context-menu");
        if (menu) menu.remove();
    }
}



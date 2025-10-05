
import { ProjexModel } from "./models/ProjexModel.js";
import { ProjectPageView } from "./views/ProjectPageView.js";


const projexModel = new ProjexModel();
const projectPageView = new ProjectPageView(projexModel, document.querySelector('body'));

window.addEventListener("DOMContentLoaded", () => {
    projectPageView.render();
});

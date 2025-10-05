import { Model } from "./Model.js";

export class ProjectItem extends Model {
    constructor(name, notes = "") {
        super();
        this._name = name;
        this._parentProject = null;
        this._notes = notes;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get parentProject() {
        return this._parentProject;
    }

    set parentProject(project) {
        this._parentProject = project;
    }

    get notes() {
        return this._notes;
    }

}
//
// Model class for Projex
//
export class Model {
    constructor() {
        this._views = [];
    }

    addView(view) {
        this._views.push(view);
    }

    notifyViews(callingView = null) {
        console.log(`\n\n>>>>>> ${this.constructor.name} notifying views...`);
        console.log(`Model notifying views. Calling view = ${callingView} ${this._views.length} views total.`);
        this._views.forEach(view => {
            if (view !== callingView) {
                console.log("Rendering view:", view);
                view.render();
            }
        });
        console.log("All views notified.\n\n");
    }
}
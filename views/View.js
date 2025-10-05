//
// View
//
export class View {
    constructor() {
        this._element = null;
        this._childViews = [];
    }

    get element() {
        return this._element;
    }

    set element(el) {
        this._element = el;
    }

    addChildView(view) {
        this._childViews.push(view);
    }

    renderChildViews() {
        this._childViews.forEach(child => {
            child.render();
            this._element.appendChild(child.element);
        });
    }

    print_view_tree(indent = 0) {
        console.log(" ".repeat(indent) + this.constructor.name);
        this._childViews.forEach(child => child.print_view_tree(indent + 2));
    }

    print_element_tree(element = this._element, indent = 0) {
        if (!element) return;
        console.log(" ".repeat(indent) + element.tagName + (element.id ? `  #${element.id}` : '') + (element.className ? ` .${element.className}` : ''));
        Array.from(element.children).forEach(child => this.print_element_tree(child, indent + 2));
    }

    render() {
        console.log("Rendering", this.constructor.name);
        //throw new Error("Render method not implemented");
    }

}
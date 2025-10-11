//
// AppToolbar
//
import { View } from "./View.js";

export class AppToolbar extends View {
    constructor(projexModel, parentElement) {
        super();
        this._projexModel = projexModel;
        this._element = document.createElement("div");
        this._element.id = "app-toolbar";
        this._element.classList.add("app-toolbar");
        parentElement.appendChild(this._element);

        // Save to local storage
        const saveLocalButton = document.createElement("button");
        this._element.appendChild(saveLocalButton);
        saveLocalButton.innerHTML = `<span class="material-icons">storage</span>`;
        saveLocalButton.title = "Save to Browser Storage";
        saveLocalButton.onclick = () => {
            if (this._projexModel.saveToLocalStorage()) {
                console.log('Data saved to local storage');
            }
        };

        // Load from local storage
        const loadLocalButton = document.createElement("button");
        this._element.appendChild(loadLocalButton);
        loadLocalButton.innerHTML = `<span class="material-icons">cloud_download</span>`;
        loadLocalButton.title = "Load from Browser Storage";
        loadLocalButton.onclick = () => {
            if (this._projexModel.loadFromLocalStorage()) {
                this._projexModel.notifyViews();
                console.log('Data loaded from local storage');
            }
        };

         // Save to file
        const saveFileButton = document.createElement("button");
        this._element.appendChild(saveFileButton);
        saveFileButton.innerHTML = `<span class="material-icons">download</span>`;
        saveFileButton.title = "Export to File";
        saveFileButton.onclick = () => {
            if (this._projexModel.saveToFile()) {
                console.log('Data exported to file');
            }
        };

        // Load from file
        const loadFileButton = document.createElement("button");
        this._element.appendChild(loadFileButton);
        loadFileButton.innerHTML = `<span class="material-icons">folder_open</span>`;
        loadFileButton.title = "Load from File";
        loadFileButton.onclick = () => {
            // Create a hidden file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';
            fileInput.style.display = 'none';
            
            fileInput.onchange = async (e) => {
                const file = e.target.files[0];
                if (file) {
                    try {
                        await this._projexModel.loadFromFile(file);
                        console.log('File loaded successfully');
                        // Refresh all views after loading
                        this._projexModel.notifyViews();
                        // Show success message
                        alert('Project data loaded successfully!');
                    } catch (error) {
                        console.error('Failed to load file:', error);
                        alert(`Failed to load file: ${error.message}`);
                    }
                }
                // Clean up the file input
                document.body.removeChild(fileInput);
            };
            
            // Add to DOM and trigger click
            document.body.appendChild(fileInput);
            fileInput.click();
        };

    }

    render() {
       
    }
}
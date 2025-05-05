export default class DashboardController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.setInfoHanlder(this.showUserInfo.bind(this));
        this.view.setEditHandler(this.showUserEditor.bind(this));
        // Render View
        this.view.render(this.model.getData());
    }
    showUserInfo(id) {
        console.log("Info user: " + id);
    }
    showUserEditor(id) {
        console.log("Edit user: " + id);
    }
}

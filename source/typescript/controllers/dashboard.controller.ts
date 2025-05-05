export default class DashboardController {
    model: any;
    view: any;

    constructor(model: any, view: any) {
        this.model = model;
        this.view = view;

        this.view.setInfoHanlder(this.showUserInfo.bind(this));
        this.view.setEditHandler(this.showUserEditor.bind(this));

        // Render View
        this.view.render(this.model.getData());
    }

    private showUserInfo(id: any) {
        console.log("Info user: " + id);
    }

    private showUserEditor(id: string) {
        console.log("Edit user: " + id);
    }
}
import ClientsModel from '../models/clients.model.js';
import ClientEditorView from '../views/ClientsView/clients.editor.view.js';
import ClientsView from '../views/ClientsView/clients.view.js';

export default class ClientsController {
    model: ClientsModel;
    view: ClientsView;

    constructor(model: ClientsModel, view: ClientsView) {
        this.model = model;
        this.view = view;

        this.view.setInfoHandler(this.showClientInfo.bind(this));
        this.view.setEditHandler(this.showClientEditor.bind(this));

        // Render View
        this.view.render(this.model.getData());
    }

    private async showClientInfo(id: any) {
        new ClientEditorView().present(id, this.model.getData());
    }

    private showClientEditor(id: any) {
        console.log("Edit Client: " + id);
    }

    private async DrawerUI(id: string) {


    }
}
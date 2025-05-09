var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ClientEditorView from '../views/ClientsView/clients.editor.view.js';
export default class ClientsController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.setInfoHandler(this.showClientInfo.bind(this));
        this.view.setEditHandler(this.showClientEditor.bind(this));
        // Render View
        this.view.render(this.model.getData());
    }
    showClientInfo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            new ClientEditorView().present(id, this.model.getData());
        });
    }
    showClientEditor(id) {
        console.log("Edit Client: " + id);
    }
    DrawerUI(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}

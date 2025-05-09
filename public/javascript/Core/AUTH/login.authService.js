import { loginView } from '../../views/LoginView/login.view.js';
import ClientsController from '../../controllers/clients.controller.js';
import ClientsModel from '../../models/clients.model.js';
import ClientsView from '../../views/ClientsView/clients.view.js';
import { layoutView } from '../../views/LayoutView/layout.view.js';
class Auth {
    constructor() {
        this.app = document.getElementById("app");
    }
    onStartup() {
        // check if user is loggin
        const storageChecking = localStorage.getItem("login");
        if (storageChecking === null || storageChecking === undefined) {
            localStorage.setItem("login", "false");
            loginView.render();
        }
        else if (storageChecking === "false") {
            loginView.render();
        }
        else if (storageChecking === "true") {
            layoutView.draw();
            // new DashboardController(new DashboardModel(), new DashboardView());
            new ClientsController(new ClientsModel, new ClientsView);
        }
    }
    authorize() {
    }
    /**
     * - Encrypt password and make a 64btis code
     * - **NOT SAVED IN LOCAL STORAGE**
     * - String function for now
     */
    encrypt(password) {
        // use btoa for demonstration only
        const encryptedPass = btoa(password);
        return encryptedPass;
    }
    unencrypt(password) {
    }
}
export const login = new Auth();

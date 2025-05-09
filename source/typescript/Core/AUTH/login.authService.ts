import { loginView } from '../../views/LoginView/login.view.js';
import DashboardController from '../../controllers/dashboard.controller.js';
import DashboardModel from '../../models/dashboard.model.js';
import DashboardView from '../../views/DashboardView/dashboard.view.js';
import ClientsController from '../../controllers/clients.controller.js';
import ClientsModel from '../../models/clients.model.js';
import ClientsView from '../../views/ClientsView/clients.view.js';
import { layoutView } from '../../views/LayoutView/layout.view.js';

class Auth {
    private app = document.getElementById("app");

    public onStartup(): void {
        // check if user is loggin
        const storageChecking = localStorage.getItem("login");

        if (storageChecking === null || storageChecking === undefined) {

            localStorage.setItem("login", "false");
            loginView.render();

        } else if (storageChecking === "false") {

            loginView.render();

        } else if (storageChecking === "true") {

            layoutView.draw();
            // new DashboardController(new DashboardModel(), new DashboardView());
            new ClientsController(new ClientsModel, new ClientsView);

        }
    }

    public authorize(): void {

    }

    /**
     * - Encrypt password and make a 64btis code
     * - **NOT SAVED IN LOCAL STORAGE**
     * - String function for now
     */
    private encrypt(password: string): string {
        // use btoa for demonstration only
        const encryptedPass: string = btoa(password);

        return encryptedPass;
    }

    private unencrypt(password: string): void {

    }
}

export const login = new Auth();
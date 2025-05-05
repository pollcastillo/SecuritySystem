import { layout } from '../Layout/Layout.js';
import { loginView } from '../../views/LoginView/login.view.js';
import DashboardController from '../../controllers/dashboard.controller.js';
import DashboardModel from '../../models/dashboard.model.js';
import DashboardView from '../../views/dashboard.view.js';

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

            layout.draw(); // draw layout if true
            new DashboardController(new DashboardModel(), new DashboardView());

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
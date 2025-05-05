import { layout } from '../Layout/Layout.js';
import { loginView } from '../../views/LoginView/login.view.js';
import DashboardController from '../../controllers/dashboard.controller.js';
import DashboardModel from '../../models/dashboard.model.js';
import DashboardView from '../../views/dashboard.view.js';
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
            layout.draw(); // draw layout if true
            new DashboardController(new DashboardModel(), new DashboardView());
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

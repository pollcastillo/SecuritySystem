import { layout } from '../Layout/Layout.js';
import { dashboardView } from '../views/DashboardView/dashboard.view.js';
import { loginView } from '../views/LoginView/login.view.js';
class Auth {
    constructor() {
        this.app = document.getElementById("app");
    }
    onStartup() {
        // check if user is loggin
        const storageChecking = localStorage.getItem('login');
        if (storageChecking === null || storageChecking === undefined) {
            localStorage.setItem("login", "false");
            loginView.render();
        }
        else if (storageChecking === "false") {
            loginView.render();
        }
        else if (storageChecking === "true") {
            // WRITING NECESSARY ELEMENTS TO RENDER THE INTERFACE
            layout.draw();
            dashboardView.render();
            // notesView.render();
            // clientsView.render();
            // notificationsView.render();
        }
    }
    authorize() {
    }
}
export const auth = new Auth();

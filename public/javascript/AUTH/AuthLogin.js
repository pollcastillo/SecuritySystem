import { layout } from '../Layout/Layout.js';
import { clientsView } from '../views/ClientsView/ClientsView.js';
import { loginView } from '../views/LoginView/LoginView.js';
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
            // writing necessary elements to render the interface
            layout.draw();
            // dashboardView.render();
            // notesView.render();
            clientsView.render();
        }
    }
    authorize() {
    }
}
export const auth = new Auth();

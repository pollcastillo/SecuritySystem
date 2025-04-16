import { layout } from '../Layout/Layout.js';
import { clientsView } from '../views/ClientsView/ClientsView.js';
import { dashboardView } from '../views/DashboardView/DashboardView.js';
import { loginView } from '../views/LoginView/LoginView.js';
import { notesView } from '../views/NotesView/NotesView.js';


class Auth {
    private app = document.getElementById("app");

    public onStartup(): void {
        // check if user is loggin
        const storageChecking = localStorage.getItem('login');

        if (storageChecking === null || storageChecking === undefined) {
            localStorage.setItem("login", "false");
            loginView.render();
        } else if (storageChecking === "false") {
            loginView.render();
        } else if (storageChecking === "true") {
            // writing necessary elements to render the interface
            layout.draw();
            // dashboardView.render();
            // notesView.render();
            clientsView.render();
        }
    }

    public authorize(): void {

    }
}

export const auth = new Auth();
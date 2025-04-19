import { layout } from '../Layout/Layout.js';
import { clientsView } from '../views/ClientsView/clients.view.js';
import { dashboardView } from '../views/DashboardView/dashboard.view.js';
import { loginView } from '../views/LoginView/login.view.js';
import { notesView } from '../views/NotesView/notes.view.js';
import { notificationsView } from '../views/NotificationsView/notifications.view.js';


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
            // WRITING NECESSARY ELEMENTS TO RENDER THE INTERFACE
            layout.draw();
            dashboardView.render();
            // notesView.render();
            // clientsView.render();
            // notificationsView.render();
        }
    }

    public authorize(): void {

    }
}

export const auth = new Auth();
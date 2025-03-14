import { siebar } from '../components/sidebar.js';
import { clientsView } from '../views/ClientsView/ClientsView.js';
import { dashboardView } from '../views/DashboardView/DashboardView.js';
import { loginView } from '../views/LoginView/LoginView.js';
import { header } from '../components/header.js';

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
            const contentHeader = document.createElement("div");
            const contentContainer: HTMLElement = document.createElement("div");

            const sidebar = document.createElement("div");
            const floatMessage = document.createElement("div");
            const content = document.createElement("div");

            contentHeader.id = "header";
            sidebar.id = "sidebar";
            content.id = "content";
            contentContainer.id = "content-container";
            contentContainer.classList.add("content-container");

            contentContainer.appendChild(sidebar);
            contentContainer.appendChild(content);

            this.app?.appendChild(contentHeader);
            this.app!.appendChild(contentContainer);

            siebar.render();
            header.render();            // dashboardView.render();
            clientsView.render();
        }
    }

    public authorize(): void {

    }
}

export const auth = new Auth();
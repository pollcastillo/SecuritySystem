import { clientsView } from '../views/ClientsView/ClientsView.js';
import { dashboardView } from '../views/DashboardView/DashboardView.js';

class Sidebar {
    public render() {
        // appContent to clear the content previows render the next view
        const appContent: HTMLElement = document.getElementById("content")! as HTMLElement;
        const sidebar: HTMLElement = document.getElementById("sidebar")! as HTMLElement;
        const content = document.createElement("div");
        content.classList.add("sidebar");

        content.innerHTML = /*html*/`
                <button class="button:sidebar" id="dashboard">
                    <i class="ph ph-sidebar-simple"></i>
                    Dashboard
                </button>

                <button class="button:sidebar" id="clients">
                    <i class="ph ph-city"></i>
                    Clients
                </button>
                
                <button class="button:sidebar">
                    <i class="ph ph-users"></i>
                    Employees
                </button>

                <button class="button:sidebar">
                    <i class="ph ph-shield-star"></i>
                    Guards
                </button>

                <button class="button:sidebar">
                    <i class="ph ph-asterisk text:red"></i>
                    emergency
                </button>

                <button class="button:sidebar">
                    <i class="ph ph-note"></i>
                    Notes
                </button>

                <button class="button:sidebar">
                    <i class="ph ph-notification"></i>
                    Notifications
                </button>

                <button class="button:sidebar">
                    <i class="ph ph-stack"></i>
                    Services
                </button>

                <button class="button:sidebar">
                    <i class="ph ph-laptop"></i>
                    Logins
                </button>
        `;

        sidebar.appendChild(content);

        const dashboard: HTMLElement = document.getElementById("dashboard")! as HTMLElement;
        dashboard?.addEventListener("click", () => {
            this.clearContent(appContent);
            dashboardView.render();
        });

        const clients: HTMLElement = document.getElementById("clients")! as HTMLElement;
        clients?.addEventListener("click", () => {
            this.clearContent(appContent);
            clientsView.render();
        });
    }

    private clearContent(element: HTMLElement): void {
        element.innerHTML = "";
    }
}

export const siebar = new Sidebar();
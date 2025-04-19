import { clientsView } from '../views/ClientsView/clients.view.js';
import { notesView } from '../views/NotesView/notes.view.js';
import { dashboardView } from '../views/DashboardView/dashboard.view.js';

class Sidebar {
    public render() {
        // appContent to clear the content previows render the next view
        const appContent: HTMLElement = document.getElementById("content")! as HTMLElement;
        const sidebar: HTMLElement = document.getElementById("sidebar")! as HTMLElement;
        const content = document.createElement("div");
        content.classList.add("sidebar");

        content.innerHTML = /*html*/`
                <button class="sidebar-item" id="dashboard">
                    <i class="ph ph-sidebar-simple"></i>
                    Dashboard
                </button>

                <button class="sidebar-item" id="clients">
                    <i class="ph ph-city"></i>
                    Clients
                </button>
                
                <button class="sidebar-item">
                    <i class="ph ph-users"></i>
                    Employees
                </button>

                <button class="sidebar-item">
                    <i class="ph ph-shield-star"></i>
                    Guards
                </button>

                <button class="sidebar-item">
                    <i class="ph ph-asterisk text:red"></i>
                    emergency
                </button>

                <button class="sidebar-item" id="notes">
                    <i class="ph ph-note"></i>
                    Notes
                </button>

                <button class="sidebar-item">
                    <i class="ph ph-notification"></i>
                    Notifications
                </button>

                <button class="sidebar-item">
                    <i class="ph ph-stack"></i>
                    Services
                </button>

                <button class="sidebar-item">
                    <i class="ph ph-laptop"></i>
                    Logins
                </button>
        `;

        sidebar.appendChild(content);

        const dashboard: HTMLElement = document.getElementById("dashboard")! as HTMLElement;
        dashboard?.addEventListener("click", () => {
            this.switchContent(dashboardView.render(), appContent);
            // dashboardView.render();
        });

        const clients: HTMLElement = document.getElementById("clients")! as HTMLElement;
        clients?.addEventListener("click", () => {
            this.switchContent(clientsView.render(), appContent);
        });

        const notes: HTMLElement = document.getElementById("notes")! as HTMLElement;
        notes?.addEventListener("click", () => {
            this.switchContent(notesView.render(), appContent);
        });
    }

    private switchContent(exec: any, content: HTMLElement): void {
        content.innerHTML = "";
        exec;
    }
}

export const sidebar = new Sidebar();
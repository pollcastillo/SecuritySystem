import { clientsView } from '../views/ClientsView/ClientsView.js';
import { dashboardView } from '../views/DashboardView/DashboardView.js';
import { notesView } from '../views/NotesView/NotesView.js';
class Sidebar {
    render() {
        // appContent to clear the content previows render the next view
        const appContent = document.getElementById("content");
        const sidebar = document.getElementById("sidebar");
        const content = document.createElement("div");
        content.classList.add("sidebar");
        content.innerHTML = /*html*/ `
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
        const dashboard = document.getElementById("dashboard");
        dashboard === null || dashboard === void 0 ? void 0 : dashboard.addEventListener("click", () => {
            this.switchContent(dashboardView.render(), appContent);
        });
        const clients = document.getElementById("clients");
        clients === null || clients === void 0 ? void 0 : clients.addEventListener("click", () => {
            this.switchContent(clientsView.render(), appContent);
        });
        const notes = document.getElementById("notes");
        notes === null || notes === void 0 ? void 0 : notes.addEventListener("click", () => {
            this.switchContent(notesView.render(), appContent);
        });
    }
    switchContent(exec, content) {
        content.innerHTML = "";
    }
}
export const sidebar = new Sidebar();

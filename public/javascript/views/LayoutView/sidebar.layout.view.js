import DashboardModel from '../../models/dashboard.model.js';
import DashboardView from '../DashboardView/dashboard.view.js';
import DashboardController from '../../controllers/dashboard.controller.js';
import ClientsModel from '../../models/clients.model.js';
import ClientsView from '../ClientsView/clients.view.js';
import ClientsController from '../../controllers/clients.controller.js';
class SidebarView {
    render() {
        // appContent to clear the content previows render the next view
        const appContent = document.getElementById("content");
        const sidebar = document.getElementById("sidebar");
        const content = document.createElement("div");
        content.classList.add("sidebar");
        content.innerHTML = /*html*/ `
                <button class="sidebar-item" id="sb-dashboard">
                    <i class="ph ph-sidebar-simple"></i>
                    Dashboard
                </button>

                <button class="sidebar-item" id="sb-clients">
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

                <button class="sidebar-item" id="sb-notes">
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
        const dashboard = document.getElementById("sb-dashboard");
        dashboard === null || dashboard === void 0 ? void 0 : dashboard.addEventListener("click", () => {
            new DashboardController(new DashboardModel(), new DashboardView()); // Render Dashboard
        });
        const clients = document.getElementById("sb-clients");
        clients === null || clients === void 0 ? void 0 : clients.addEventListener("click", () => {
            new ClientsController(new ClientsModel, new ClientsView);
        });
        const notes = document.getElementById("sb-notes");
        notes === null || notes === void 0 ? void 0 : notes.addEventListener("click", () => {
            this.switchContent(notesView.render(), appContent);
        });
    }
    switchContent(exec, content) {
        content.innerHTML = "";
        exec;
    }
}
export const sidebarView = new SidebarView();

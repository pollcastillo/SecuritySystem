var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { coreServices } from '../_core/services/services.js';
export default class DashboardView {
    constructor() {
        this.appContent = document.getElementById("content");
    }
    onView(id) { } // bind method
    onEdit(id) { } // bind method
    render(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.appContent.innerHTML = "";
            const DASHBOARD_CONTENT = document.createElement("div");
            DASHBOARD_CONTENT.id = "dashboard-content";
            DASHBOARD_CONTENT.innerHTML = /*html*/ `
            <div class="view-header">
                <h1>Dashboard</h1>

                <div class="view-header_controls">
                    <button class="control-button" id="filter"><i class="ph ph-funnel"></i></button>
                    <div class="input-icon">
                        <label for="search"><i class="ph ph-magnifying-glass"></i></label>
                        <input type="search" name="search" id="search" placeholder="Search in clients"/>
                    </div>
                </div>
            </div>

            <h2>Clients</h2>
            <table id="dashboard-clients-table">
                <thead>
                    <tr>
                        <th class="text:noBreakline">#</th>
                        <th class="text:noBreakline">Client Name</th>
                        <th class="text:noBreakline">Date Added</th>
                        <th class="text:noBreakline">Added by</th>
                        <th></th>
                    </tr>
                    <tr>
                        <th colspan="6" class="table-section section-enabled">Active</th>
                    </tr>
                </thead>

                <tbody id="table-enabled-items"></tbody>
                <th colspan="6" class="table-section section-disabled">Disabled</th>
                <tbody id="table-disabled-items"></tbody>
            </table>
        `;
            this.appContent.appendChild(DASHBOARD_CONTENT);
            this.displayData("table-enabled-items", yield data, "Enabled");
            this.displayData("table-disabled-items", yield data, "Disabled");
        });
    }
    displayData(tableID, data, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const TABLE = document.getElementById(tableID);
            TABLE.innerHTML = "";
            const USERS_DATA = data.filter((d) => `${d.state.name}`.includes(state));
            for (let i = 0; i < USERS_DATA.length; i++) {
                let index = 1 + i;
                const client = yield USERS_DATA[i];
                const row = document.createElement("tr");
                const buttons = document.createElement("td");
                const info_button = document.createElement("button");
                const edit_button = document.createElement("button");
                buttons.classList.add("table-button_group");
                info_button.innerHTML = `<i class="ph ph-info"></i>`;
                edit_button.innerHTML = `<i class="ph ph-pencil"></i>`;
                row.innerHTML = /*html*/ `
                <td>${index}</td>
                <td>${yield coreServices.validateData(client.firstName)} ${yield coreServices.validateData(client.lastName)}</td>
                <td>${yield coreServices.translateDate(client.createdDate)}</td>
                <td>${yield coreServices.validateData(client.createdBy)}</td>
            `;
                buttons.appendChild(edit_button);
                buttons.appendChild(info_button);
                row.appendChild(buttons);
                // Edit button 
                edit_button.dataset.id = `${client.id}`;
                edit_button.addEventListener("click", () => {
                    this.onEdit(client.id);
                });
                // Information button 
                info_button.dataset.id = `${client.id}`;
                info_button.addEventListener("click", () => {
                    this.onView(client.id);
                });
                TABLE.appendChild(row);
            }
        });
    }
    setInfoHanlder(handler) {
        this.onView = handler;
    }
    setEditHandler(handler) {
        this.onEdit = handler;
    }
}

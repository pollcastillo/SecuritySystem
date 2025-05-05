import { View } from '../_core/_app.core.js';
import { coreServices } from '../_core/services/services.js';

type State = "Enabled" | "Disabled";
type TableOpton = "table-enabled-items" | "table-disabled-items";

export default class DashboardView implements View {
    private appContent: HTMLElement = document.getElementById("content")!;
    private onView(id: any): void { } // bind method
    private onEdit(id: any): any { } // bind method

    public async render(data: any[]): Promise<void> {
        this.appContent.innerHTML = "";

        const DASHBOARD_CONTENT: HTMLElement = document.createElement("div")!;
        DASHBOARD_CONTENT.id = "dashboard-content";

        DASHBOARD_CONTENT.innerHTML = /*html*/`
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
        this.displayData("table-enabled-items", await data, "Enabled");
        this.displayData("table-disabled-items", await data, "Disabled");
    }

    private async displayData(tableID: TableOpton, data: any[], state?: State): Promise<void> {
        const TABLE = document.getElementById(tableID)!;
        TABLE.innerHTML = "";

        const USERS_DATA = data.filter((d: any) => `${d.state.name}`.includes(state as string));

        for (let i = 0; i < USERS_DATA.length; i++) {
            let index = 1 + i;
            const client = await USERS_DATA[i];

            const row = document.createElement("tr");
            const buttons = document.createElement("td");
            const info_button = document.createElement("button")!;
            const edit_button = document.createElement("button")!;

            buttons.classList.add("table-button_group");
            info_button.innerHTML = `<i class="ph ph-info"></i>`;
            edit_button.innerHTML = `<i class="ph ph-pencil"></i>`;


            row.innerHTML = /*html*/`
                <td>${index}</td>
                <td>${await coreServices.validateData(client.firstName)} ${await coreServices.validateData(client.lastName)}</td>
                <td>${await coreServices.translateDate(client.createdDate)}</td>
                <td>${await coreServices.validateData(client.createdBy)}</td>
            `;

            buttons.appendChild(edit_button);
            buttons.appendChild(info_button);
            row.appendChild(buttons);

            // Edit button 
            edit_button.dataset.id = `${client.id}`;
            edit_button.addEventListener("click", (): void => {
                this.onEdit(client.id);
            });

            // Information button 
            info_button.dataset.id = `${client.id}`;
            info_button.addEventListener("click", (): void => {
                this.onView(client.id);
            });


            TABLE.appendChild(row);
        }
    }

    private setInfoHanlder(handler: (id: string) => void) {
        this.onView = handler;
    }

    private setEditHandler(handler: (id: string) => void) {
        this.onEdit = handler;
    }
}
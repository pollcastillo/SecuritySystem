import { View } from '../../_core/_app.core.js';
import { coreServices } from '../../_core/services/services.js';

type State = "Enabled" | "Disabled";

export default class ClientsView implements View {
    private $appContent: HTMLElement = document.getElementById("content")!;
    private dataState: boolean = true;

    private _onInfo(id: string): void { }
    private _onEdit(id: string): void { }

    public async render(__ClientsData__: Promise<any>): Promise<void> {
        this.$appContent.innerHTML = ""; // Clear view

        const $ClientContent: HTMLElement = document.createElement("div")!;
        $ClientContent.id = "dashboard-content";

        $ClientContent.innerHTML = /*html*/`
            <div class="view-header">
                <h1>Clients</h1>

                <div class="view-header_controls">
                    <div class="view-search">
                        <span class="ph ph-magnifying-glass"></span>
                        <input type="text" class="view-search_input" placeholder="Search Clients">
                    </div>
                </div>
            </div>

            <div class="toggle-data-container">
                <div class="toggle-data" id="toggle-data">
                    <button class="active" id="toggle-active-items">Active Clients</button>
                    <button class="" id="toggle-inactive-items">Inactive Clients</button>
                </div>
            </div>

            <div class="table-container">
                <table id="clients-table">
                    <thead>
                        <tr>
                            <th class="text:noBreakline">Client Name</th>
                            <th class="text:noBreakline">Date Added</th>
                            <th class="text:noBreakline">Added by</th>
                            <th></th>
                        </tr>
                    </thead>
    
                    <tbody id="table-items"></tbody>
                </table>
            </div>
        `;

        this.$appContent.appendChild($ClientContent);
        this._display("table-items", await __ClientsData__, this.dataState);

        const TOGGLE_ACTIVE_BUTTON = document.getElementById("toggle-active-items")!;
        const TOGGLE_INACTIVE_BUTTON = document.getElementById("toggle-inactive-items")!;

        const container = document.querySelector("#toggle-data")!;
        const buttons = container.querySelectorAll("button");

        buttons.forEach(button => {
            button.addEventListener("click", async () => {
                buttons.forEach(button => {
                    button.classList.remove("active");
                });
                console.log(button);
                button.classList.add("active");

                if (button.id === "toggle-active-items") {
                    this.dataState = true;
                    this._display("table-items", await __ClientsData__, this.dataState);
                } else if (button.id === "toggle-inactive-items") {
                    this.dataState = false;
                    this._display("table-items", await __ClientsData__, this.dataState);
                }
            });
        });


    }

    private async _display(tableID: string, __Data__: any[], dataState: boolean): Promise<void> {
        let state: string;
        if (dataState) {
            state = "Enabled";
        } else {
            state = "Disabled";
        }

        const table = document.getElementById(tableID)!;
        table.innerHTML = ""; // Clear table on render

        const CLIENTS_DATA = __Data__.filter((data: any) => `${data.state.name}`.includes(state as string));

        for (let i = 0; i < CLIENTS_DATA.length; i++) {
            const row = document.createElement("tr")!;
            const buttons = document.createElement("td")!; // A Button Group
            const buttonsContainer = document.createElement("span")!; // A Button Group
            const infoButton = document.createElement("button")!;
            const editButton = document.createElement("button")!;
            const removeButton = document.createElement("button")!;

            // Implements button on ButtonGroup
            buttons.classList.add("table-button_group");
            infoButton.innerHTML = '<i class="ph ph-info"></i>';
            editButton.innerHTML = '<i class="ph ph-pencil"></i>';
            removeButton.innerHTML = '<i class="ph ph-recycle"></i>';

            let index = 1 + i;
            const CLIENT = await CLIENTS_DATA[i];

            row.innerHTML = `
                <td>${await coreServices.validateData(CLIENT.firstName)} ${await coreServices.validateData(CLIENT.lastName)}</td>
                <td>${await coreServices.translateDate(CLIENT.createdDate)}</td>
                <td>${await coreServices.validateData(CLIENT.createdBy)}</td>
            `;
            buttonsContainer.appendChild(editButton);
            buttonsContainer.appendChild(infoButton);
            buttonsContainer.appendChild(removeButton);
            buttons.appendChild(buttonsContainer);
            row.appendChild(buttons);

            // EVENTS ===============================================
            // Edit Button
            editButton.dataset.id = `${CLIENT.id}`;
            editButton.addEventListener("click", (): void => {
                this._onEdit(CLIENT.id);
            });

            // Information Button
            infoButton.dataset.id = `${CLIENT.id}`;
            infoButton.addEventListener("click", (): void => {
                this._onInfo(CLIENT.id);
            });

            table.appendChild(row);
        }
    }

    public setInfoHandler(handler: (id: string) => void) {
        this._onInfo = handler;
    }

    public setEditHandler(handler: (id: string) => void) {
        this._onEdit = handler;
    }

}
import { View } from '../../_core/_app.core.js';
import { coreServices } from '../../_core/services/services.js';

type State = "Enabled" | "Disabled";
type TableOption = "table-enabled-items" | "table-disabled-items";

export default class ClientsView implements View {
    private $appContent: HTMLElement = document.getElementById("content")!;

    private _onInfo(id: string): void { }
    private _onEdit(id: string): void { }

    public async render(__ClientsData__: Promise<any>): Promise<void> {
        this.$appContent.innerHTML = ""; // Clear view

        const $ClientContent: HTMLElement = document.createElement("div")!;
        $ClientContent.id = "dashboard-content";

        $ClientContent.innerHTML = /*html*/`
            <div class="view-header">
                <h1>Clients</h1>
            </div>

            <table id="clients-table">
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

        this.$appContent.appendChild($ClientContent);
        this._display("table-enabled-items", await __ClientsData__, "Enabled");
        this._display("table-disabled-items", await __ClientsData__, "Disabled");
    }

    private async _display(tableID: TableOption, __Data__: any[], state?: State): Promise<void> {
        const table = document.getElementById(tableID)!;
        table.innerHTML = ""; // Clear table on render

        const CLIENTS_DATA = __Data__.filter((data: any) => `${data.state.name}`.includes(state as string));

        for (let i = 0; i < CLIENTS_DATA.length; i++) {
            const row = document.createElement("tr")!;
            const buttons = document.createElement("td")!; // A Button Group
            const infoButton = document.createElement("button")!;
            const editButton = document.createElement("button")!;

            // Implements button on ButtonGroup
            buttons.classList.add("table-button_group");
            infoButton.innerHTML = '<i class="ph ph-info"></i>';
            editButton.innerHTML = '<i class="ph ph-pencil"></i>';

            let index = 1 + i;
            const CLIENT = await CLIENTS_DATA[i];

            row.innerHTML = `
                <td>${index}</td>
                <td>${await coreServices.validateData(CLIENT.firstName)} ${await coreServices.validateData(CLIENT.lastName)}</td>
                <td>${await coreServices.translateDate(CLIENT.createdDate)}</td>
                <td>${await coreServices.validateData(CLIENT.createdBy)}</td>
            `;
            buttons.appendChild(editButton);
            buttons.appendChild(infoButton);
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
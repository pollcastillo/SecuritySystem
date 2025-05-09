var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { coreServices } from '../../_core/services/services.js';
export default class ClientsView {
    constructor() {
        this.$appContent = document.getElementById("content");
    }
    _onInfo(id) { }
    _onEdit(id) { }
    render(__ClientsData__) {
        return __awaiter(this, void 0, void 0, function* () {
            this.$appContent.innerHTML = ""; // Clear view
            const $ClientContent = document.createElement("div");
            $ClientContent.id = "dashboard-content";
            $ClientContent.innerHTML = /*html*/ `
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
            this._display("table-enabled-items", yield __ClientsData__, "Enabled");
            this._display("table-disabled-items", yield __ClientsData__, "Disabled");
        });
    }
    _display(tableID, __Data__, state) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = document.getElementById(tableID);
            table.innerHTML = ""; // Clear table on render
            const CLIENTS_DATA = __Data__.filter((data) => `${data.state.name}`.includes(state));
            for (let i = 0; i < CLIENTS_DATA.length; i++) {
                const row = document.createElement("tr");
                const buttons = document.createElement("td"); // A Button Group
                const infoButton = document.createElement("button");
                const editButton = document.createElement("button");
                // Implements button on ButtonGroup
                buttons.classList.add("table-button_group");
                infoButton.innerHTML = '<i class="ph ph-info"></i>';
                editButton.innerHTML = '<i class="ph ph-pencil"></i>';
                let index = 1 + i;
                const CLIENT = yield CLIENTS_DATA[i];
                row.innerHTML = `
                <td>${index}</td>
                <td>${yield coreServices.validateData(CLIENT.firstName)} ${yield coreServices.validateData(CLIENT.lastName)}</td>
                <td>${yield coreServices.translateDate(CLIENT.createdDate)}</td>
                <td>${yield coreServices.validateData(CLIENT.createdBy)}</td>
            `;
                buttons.appendChild(editButton);
                buttons.appendChild(infoButton);
                row.appendChild(buttons);
                // EVENTS ===============================================
                // Edit Button
                editButton.dataset.id = `${CLIENT.id}`;
                editButton.addEventListener("click", () => {
                    this._onEdit(CLIENT.id);
                });
                // Information Button
                infoButton.dataset.id = `${CLIENT.id}`;
                infoButton.addEventListener("click", () => {
                    this._onInfo(CLIENT.id);
                });
                table.appendChild(row);
            }
        });
    }
    setInfoHandler(handler) {
        this._onInfo = handler;
    }
    setEditHandler(handler) {
        this._onEdit = handler;
    }
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getData from '../../API/GetData.js';
import { translateStates } from '../../functions/TranslateStates.js';
import { updateDate } from '../../functions/UpdateDate.js';
import { checkUndefinedData } from '../../functions/CheckUndefinedData.js';
class ClientsView {
    constructor() {
        this.url = "../../data/User.json";
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersData = yield getData(this.url);
            const content = document.getElementById("content");
            const clients = document.createElement("div");
            clients.id = "clients-content";
            clients.innerHTML = /*html*/ `
            <div class="content-header">
                <h1>Clients</h1>

                <div class="ui:view-controls">
                    <button class="control-button" id="filter"><i class="ph ph-funnel"></i></button>
                    <div class="search">
                        <label for="search"><i class="ph ph-magnifying-glass"></i></label>
                        <input type="search" name="search" id="search" placeholder="Search in clients"/>
                    </div>
                </div>
            </div>

            <table id="users">
                <thead>
                    <tr>
                        <th class="text:noBreakline">#</th>
                        <th class="text:noBreakline">Client Name</th>
                        <th class="text:noBreakline">Date Added</th>
                        <th class="text:noBreakline">Added by</th>
                        <th class="text:noBreakline">Status</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody id="table-body"></tbody>
            </table>
        `;
            content.appendChild(clients);
            this.renderClients("table-body", usersData); // render users into table
            const filter = document.getElementById("filter");
            filter === null || filter === void 0 ? void 0 : filter.addEventListener("click", () => {
                this.showFilterSelector();
            });
        });
    }
    renderClients(tableID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = document.getElementById(tableID);
            for (let i = 0; i < (yield data.length); i++) {
                const _USER = yield data[i];
                const row = document.createElement("tr");
                row.id = yield _USER.id;
                row.innerHTML = /*html*/ `
                <td style="width: fit-content">${i + 1}</td>
                <td class="text:noBreakline">${yield checkUndefinedData(_USER.firstName)} ${yield checkUndefinedData(_USER.lastName)}</td>
                <td class="text:gray text:noBreakline">${updateDate(yield checkUndefinedData(_USER.createdDate))}</td>
                <td class="text:gray text:limit">${yield checkUndefinedData(_USER.createdBy)}</td>
                <td class="text:gray"><span class="table:state data:${yield _USER.state.name.toLowerCase()}">${translateStates(yield checkUndefinedData(_USER.state.name))}</span></td>
                <div class="table:button-group">
                    <button data-id="${yield _USER.id}"><i class="ph ph-pencil"></i></button>
                    <button data-id="${yield _USER.id}"><i class="ph ph-info"></i></button>
                    <button data-id="${yield _USER.id}"><i class="ph ph-recycle text:red"></i></button>
                </div>
            `;
                console.log(i);
                table === null || table === void 0 ? void 0 : table.appendChild(row);
            }
        });
    }
    showFilterSelector() {
        return __awaiter(this, void 0, void 0, function* () {
            const content = document.getElementById("content");
            const filter = document.createElement("div");
            filter.id = "filter-selector";
            filter.classList.add("ui:filter-selector");
            filter.innerHTML = /*html*/ `
            <div class="filter-content">
                <div class="search-filter">
                    <input type="search" id="text-filter" placeholder="search">
                    <button id="close"><i class="ph ph-x text:red"></i></div>
                </div>
            </div>
        `;
            content === null || content === void 0 ? void 0 : content.appendChild(filter);
            const FILTER = document.getElementById("filter-selector");
            const TEXT_FILTER = document.getElementById("text-filter");
            const CLOSE_BUTTON = document.getElementById("close");
            // Añadir foco al input al abrir el filtro
            TEXT_FILTER.focus();
            // Cerrar el filtro al presionar el botón "x"
            CLOSE_BUTTON.addEventListener("click", () => {
                FILTER.remove();
            });
            // // Cerrar el filtro al presionar "Esc"
            // FILTER.addEventListener("keyup", (e) => {
            //     if (e.key === "Escape") {
            //         FILTER.remove();
            //     }
            // });
        });
    }
}
export const clientsView = new ClientsView();

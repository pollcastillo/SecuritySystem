import getData from '../../API/GetData.js';
import { translateStates } from '../../functions/TranslateStates.js';
import { updateDate } from '../../functions/UpdateDate.js';
import { checkUndefinedData } from '../../functions/CheckUndefinedData.js';
import { clientsInformationView } from './ClientsInformationView.js';

class ClientsView {
    private usersData: string = "../../data/User.json";
    private marcationData: string = "../../data/Marcation.json";

    public async render() {
        const clientsData: any = await getData(this.usersData); //=>
        const content: HTMLElement = document.getElementById("content")!;
        const clients: HTMLElement = document.createElement("div");
        clients.id = "clients-content";

        console.log(await getData(this.marcationData));

        clients.innerHTML = /*html*/`
            <div class="view-header">
                <h1>Clients</h1>

                <div class="view-header_controls">
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

        // Display clients at render
        this.displayClients("table-body", clientsData);

        // BINDERS
        // FILTER DATA TO SEARCH 
        const searchBinder: HTMLInputElement = document.getElementById("search")! as HTMLInputElement;
        searchBinder.addEventListener("keyup", () => {
            this.onSearch(searchBinder, clientsData, "table-body");
        });

        // Open the filter modal
        const filterBinder: HTMLButtonElement = document.getElementById("filter")! as HTMLButtonElement;
        filterBinder.addEventListener("click", (): void => {
            this.showFilterSelector();
        });

    }

    private async displayClients(tableID: string, data: any) {
        const table = document.getElementById(tableID)!;
        table.innerHTML = "";

        for (let i = 0; i < await data.length; i++) {
            const client = await data[i]; //=> 
            const row: HTMLTableRowElement = document.createElement("tr")! as HTMLTableRowElement;

            row.id = await client.id; // Set the Client ID to the row

            row.innerHTML = /*html*/`
                <td style="width: fit-content">${i + 1}</td>
                <td class="text:noBreakline">${await checkUndefinedData(client.firstName)} ${await checkUndefinedData(client.lastName)}</td>
                <td class="text:gray text:noBreakline">${updateDate(await checkUndefinedData(client.createdDate))}</td>
                <td class="text:gray text:limit">${await checkUndefinedData(client.createdBy)}</td>
                <td class="text:gray"><span class="table:state data:${await client.state.name.toLowerCase()}">${translateStates(await checkUndefinedData(client.state.name))}</span></td>
                <td class="table-button_group">
                    <button data-id="${await client.id}" id="open-edit-client-information"><i class="ph ph-pencil"></i></button>
                    <button data-id="${await client.id}" id="open-client-information"><i class="ph ph-info"></i></button>
                    <button data-id="${await client.id}"><i class="ph ph-recycle"></i></button>
                </td>
            `;

            table?.appendChild(row);
        }

        // Open Client Information View
        const RawInformationButtons = document.querySelectorAll("#open-client-information");
        RawInformationButtons.forEach((button: any) => {
            button.addEventListener("click", async () => {
                clientsInformationView.render(button.dataset.id, data);
            });
        });
    }

    // Search
    private async onSearch(input: HTMLInputElement, clients: any, tableId: string) {
        document.getElementById(tableId)!.innerHTML = "";
        // On Keyup search: firstName and lastName 
        const filteredData = await clients.filter((client: any) => `${client.firstName}${client.lastName}${client.createdBy}`
            .toLowerCase().includes(`${input.value.trim().replace(/^\s+|\s+$/gm, '').toLowerCase()}`)); // FIXME

        // Render the table with the data filtered
        this.displayClients(tableId, filteredData);
    }

    // Search filter //TODO
    private async showFilterSelector() {
        const content = document.getElementById("content");
        const filter = document.createElement("div");
        filter.id = "filter-selector";
        filter.classList.add("ui:filter-selector");

        filter.innerHTML = /*html*/`
            <div class="filter-content">
                <div class="search-filter">
                    <input type="search" id="text-filter" placeholder="search">
                    <button id="close"><i class="ph ph-x text:red"></i></div>
                </div>
            </div>
        `;

        content?.appendChild(filter);

        const FILTER: HTMLElement = document.getElementById("filter-selector")! as HTMLElement;
        const TEXT_FILTER: HTMLInputElement = document.getElementById("text-filter")! as HTMLInputElement;
        const CLOSE_BUTTON: HTMLButtonElement = document.getElementById("close")! as HTMLButtonElement;

        // Añadir foco al input al abrir el filtro
        TEXT_FILTER.focus();

        // Cerrar el filtro al presionar el botón "x"
        CLOSE_BUTTON.addEventListener("click", (): void => {
            FILTER.remove();
        });
    }

}

export const clientsView = new ClientsView();




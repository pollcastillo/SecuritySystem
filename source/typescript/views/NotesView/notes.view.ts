import getData from '../../API/GetData.js';
import { updateDate } from '../../functions/UpdateDate.js';
import { checkUndefinedData } from '../../functions/CheckUndefinedData.js';
import { previewNotesView } from './notes-preview.view.js';

class NotesView {
    private notesURI: string = "../../data/Note.json";

    public async render() {
        const notesData: any = await getData(this.notesURI); //=>
        const content: HTMLElement = document.getElementById("content")!;
        const notesViewComponent: HTMLElement = document.createElement("div");
        notesViewComponent.id = "clients-content";

        console.log(notesData);

        notesViewComponent.innerHTML = /*html*/`
            <div class="view-header">
                <h1>Notes</h1>

                <div class="view-header_controls">
                    <button class="control-button" id="filter"><i class="ph ph-funnel"></i></button>
                    <div class="input-icon">
                        <label for="search" class="flex py-2 px-1.5 bg-stone-800 rounded-tl-md rounded-bl-md"><i class="ph ph-magnifying-glass"></i></label>
                        <input type="search" name="search" id="search" placeholder="Search in notes" class="text-xs py-1 px-2 rounded-tr-md rounded-br-md bg-stone-900 border border-stone-800 placeholder:text-stone-500 outline-none"/>
                    </div>
                </div>
            </div>

            <div class="relative overflow-hidden shadow-md sm:rounded-lg w-full text-sm pb-10">
                <table id="notes">
                    <thead class="text-xs text-stone-100 uppercase">
                        <tr>
                            <th scope="col" class="px-6 py-3 bg-stone-900 w-fit max-w-fit min-w-fit">Title </th>
                            <th scope="col" class="px-6 py-3">Date Added</th>
                            <th scope="col" class="px-6 py-3 bg-stone-900">Added by</th>
                            <th scope="col" class="px-6 py-3 ">note length</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody id="table-body"></tbody>
                </table>
            </div>
        `;

        content.appendChild(notesViewComponent);

        // Display clients at render
        this.displayNotes("table-body", notesData);

        // BINDERS
        // FILTER DATA TO SEARCH 
        const searchBinder: HTMLInputElement = document.getElementById("search")! as HTMLInputElement;
        searchBinder.addEventListener("keyup", () => {
            this.onSearch(searchBinder, notesData, "table-body");
        });

        // Open the filter modal
        const filterBinder: HTMLButtonElement = document.getElementById("filter")! as HTMLButtonElement;
        filterBinder.addEventListener("click", (): void => {
            this.showFilterSelector();
        });

    }

    private async displayNotes(tableID: string, data: any) {
        const table = document.getElementById(tableID)!;
        table.innerHTML = "";

        for (let i = 0; i < await data.length; i++) {
            const notes = await data[i]; //=> 
            const row: HTMLTableRowElement = document.createElement("tr")! as HTMLTableRowElement;
            row.id = await notes.id; // Set the Client ID to the row

            row.innerHTML = /*html*/`
                <td>${await checkUndefinedData(notes.title)}</td>
                <td>${updateDate(await notes.creationDate)}</td>
                <td>${await checkUndefinedData(notes.user.firstName)} ${await checkUndefinedData(notes.user.lastName)}</td>
                <td>${await notes.content.length}</td>
                <td class="table-button_group">
                    <button data-id="${await notes.id}" id="open-client-information"><i class="ph ph-info"></i></button>
                    <button data-id="${await notes.id}"><i class="ph ph-recycle"></i></button>
                </td>
            `;

            table?.appendChild(row);
        }

        // Open Client Information View
        const RawInformationButtons = document.querySelectorAll("#open-client-information");
        RawInformationButtons.forEach((button: any) => {
            button.addEventListener("click", async () => {
                previewNotesView.render(button.dataset.id, data);
            });
        });
    }

    // Search
    private async onSearch(input: HTMLInputElement, notes: any, tableId: string) {
        document.getElementById(tableId)!.innerHTML = "";
        // On Keyup search: firstName and lastName 
        const filteredData = await notes.filter((note: any) => `${note.title} ${note.content}`
            .toLowerCase().includes(`${input.value.trim().replace(/^\s+|\s+$/gm, '').toLowerCase()}`)); // FIXME

        // Render the table with the data filtered
        this.displayNotes(tableId, filteredData);
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

export const notesView = new NotesView();

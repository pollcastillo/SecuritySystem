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
import { updateDate } from '../../functions/UpdateDate.js';
import { checkUndefinedData } from '../../functions/CheckUndefinedData.js';
import { previewNotesView } from './previewNotesView.js';
class NotesView {
    constructor() {
        this.notesData = "../../data/Note.json";
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const notesData = yield getData(this.notesData); //=>
            const content = document.getElementById("content");
            const notesViewComponent = document.createElement("div");
            notesViewComponent.id = "clients-content";
            notesViewComponent.classList.add("w-full", "p-4", "bg-stone-950", "overflow-y-scroll", "h-screen");
            console.log(notesData);
            notesViewComponent.innerHTML = /*html*/ `
            <div class="view-header">
                <h1 class="text-3xl font-black">Notes</h1>

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
            const searchBinder = document.getElementById("search");
            searchBinder.addEventListener("keyup", () => {
                this.onSearch(searchBinder, notesData, "table-body");
            });
            // Open the filter modal
            const filterBinder = document.getElementById("filter");
            filterBinder.addEventListener("click", () => {
                this.showFilterSelector();
            });
        });
    }
    displayNotes(tableID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = document.getElementById(tableID);
            table.innerHTML = "";
            for (let i = 0; i < (yield data.length); i++) {
                const notes = yield data[i]; //=> 
                const row = document.createElement("tr");
                row.id = yield notes.id; // Set the Client ID to the row
                row.innerHTML = /*html*/ `
                <td class="px-6 py-4 font-medium whitespace-nowrap bg-stone-900 text-white table-element-fit truncate overflow-hidden w-fit">${yield checkUndefinedData(notes.title)}</td>
                <td class="px-6 py-4">${updateDate(yield notes.creationDate)}</td>
                <td class="px-6 py-4 truncate overflow-hidden bg-stone-900">${yield checkUndefinedData(notes.user.firstName)} ${yield checkUndefinedData(notes.user.lastName)}</td>
                <td class="px-6 py-4">${yield notes.content.length}</td>
                <td class="table-button_group">
                    <button data-id="${yield notes.id}" id="open-client-information"><i class="ph ph-info"></i></button>
                    <button data-id="${yield notes.id}"><i class="ph ph-recycle"></i></button>
                </td>
            `;
                table === null || table === void 0 ? void 0 : table.appendChild(row);
            }
            // Open Client Information View
            const RawInformationButtons = document.querySelectorAll("#open-client-information");
            RawInformationButtons.forEach((button) => {
                button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                    previewNotesView.render(button.dataset.id, data);
                }));
            });
        });
    }
    // Search
    onSearch(input, notes, tableId) {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById(tableId).innerHTML = "";
            // On Keyup search: firstName and lastName 
            const filteredData = yield notes.filter((note) => `${note.title} ${note.content}`
                .toLowerCase().includes(`${input.value.trim().replace(/^\s+|\s+$/gm, '').toLowerCase()}`)); // FIXME
            // Render the table with the data filtered
            this.displayNotes(tableId, filteredData);
        });
    }
    // Search filter //TODO
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
        });
    }
}
export const notesView = new NotesView();

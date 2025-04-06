var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkUndefinedData } from '../../functions/CheckUndefinedData.js';
class PreviewNotesView {
    render(noteID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const drawer = document.getElementById("drawer");
            const notes = yield data.filter((note) => note.id === noteID);
            const note = notes[0];
            const InformationComponent = document.createElement("div");
            InformationComponent.classList.add("client-information-container");
            InformationComponent.id = note.id;
            console.log(data);
            drawer.innerHTML = "";
            InformationComponent.innerHTML = /*html*/ `
            <div class="note-information">
                <button id="close" class="close"><i class="ph ph-x"></i></button>
                <h1>${yield checkUndefinedData(note.title)}</h1>
                
                <p>${yield checkUndefinedData(note.content)}</p>
            </div>

            <div class="controls">
                <button id="edit-client">Edit</button>
                <button id="delete-client">Delete</button>
            </div>
        `;
            console.log(notes[0].title);
            drawer.classList.add("drawer");
            drawer.appendChild(InformationComponent);
            const close = document.getElementById("close");
            close.addEventListener("click", () => {
                drawer.removeChild(InformationComponent);
                drawer.classList.remove("drawer");
            });
        });
    }
}
export const previewNotesView = new PreviewNotesView();

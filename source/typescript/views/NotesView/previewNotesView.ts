import { checkUndefinedData } from '../../functions/CheckUndefinedData.js';
import { updateDate } from '../../functions/UpdateDate.js';

class PreviewNotesView {
    async render(noteID: string, data: any): Promise<void> {
        const drawer = document.getElementById("drawer")! as HTMLElement;

        const notes = await data.filter((note: any) => note.id === noteID);
        const note = notes[0];
        const InformationComponent = document.createElement("div");
        InformationComponent.classList.add("client-information-container");
        InformationComponent.id = note.id;

        console.log(data);

        drawer.innerHTML = "";

        InformationComponent.innerHTML = /*html*/`
            <div class="note-information">
                <button id="close" class="close"><i class="ph ph-x"></i></button>
                <h1>${await checkUndefinedData(note.title)}</h1>
                
                <p>${await checkUndefinedData(note.content)}</p>
            </div>

            <div class="controls">
                <button id="edit-client">Edit</button>
                <button id="delete-client">Delete</button>
            </div>
        `;

        console.log(notes[0].title);

        drawer.classList.add("drawer");

        drawer.appendChild(InformationComponent);

        const close = document.getElementById("close")! as HTMLButtonElement;
        close.addEventListener("click", () => {
            drawer.removeChild(InformationComponent);
            drawer.classList.remove("drawer");

        });
    }

}

export const previewNotesView = new PreviewNotesView();
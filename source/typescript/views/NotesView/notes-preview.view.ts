import { coreServices } from '../../_core/services/services.js';

class PreviewNotesView {
    async render(noteID: string, data: any): Promise<void> {
        const drawer = document.getElementById("drawer")! as HTMLElement;

        const notes = await data.filter((note: any) => note.id === noteID);
        const note = notes[0];
        const InformationComponent = document.createElement("div");
        InformationComponent.classList.add("drawer-content");
        InformationComponent.id = note.id;
        drawer.innerHTML = "";

        InformationComponent.innerHTML = /*html*/`
            <div class="drawer-information">
                <button id="close" class="close"><i class="ph ph-x"></i></button>
                
                <h1>${await coreServices.validateData(note.title)}</h1>
                
                <div class="drawer-data-information">
                    <div class="info">
                        <span class="info-title">Created By</span>
                        <span class="info-badge">${note.user.firstName}</span>
                    </div>
                    
                    <div class="info">
                        <span class="info-title">Creation Date</span>
                        <span class="info-content">${await coreServices.translateDate(note.createdDate)}</span>
                    </div>
                </div>
                
                <div class="drawer-data-content">
                    <p>${await coreServices.validateData(note.content)}</p>
                </div>
            </div>

            <div class="drawer-controls">
                <button id="edit-client">Edit</button>
                <button id="delete-client">Delete</button>
            </div>
        `;

        console.log(notes[0].title);
        drawer.classList.add("isActive");
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
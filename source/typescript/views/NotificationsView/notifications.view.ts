import getData from '../../API/GetData.js';
import { updateDate } from '../../functions/UpdateDate.js';
import { checkUndefinedData } from '../../functions/CheckUndefinedData.js';

class NotificationsView {
    private notificationsData: string = "../../data/Notification.json";

    public async render() {
        const notificationsData = await getData(this.notificationsData);
        const content: HTMLElement = document.getElementById("content")!;
        const notificationsViewComponent: HTMLElement = document.createElement("div");

        notificationsViewComponent.id = "notifications-content";

        notificationsViewComponent.innerHTML = /*html*/`
            <div class="view-header">
                <h1>Notifications</h1>

                <div class="view-header_controls">
                    <button class="control-button" id="filter"><i class="ph ph-funnel"></i></button>
                    <div class="input-icon">
                        <label for="search" class="flex py-2 px-1.5 bg-stone-800 rounded-tl-md rounded-bl-md"><i class="ph ph-magnifying-glass"></i></label>
                        <input type="search" name="search" id="search" placeholder="Search in notes" class="text-xs py-1 px-2 rounded-tr-md rounded-br-md bg-stone-900 border border-stone-800 placeholder:text-stone-500 outline-none"/>
                    </div>
                </div>
            </div>
        `;

        content.appendChild(notificationsViewComponent);

        console.log(notificationsData);
    }
}

export const notificationsView = new NotificationsView();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import getData from '../../Core/API/GetData.js';
class NotificationsView {
    constructor() {
        this.notificationsData = "../../data/Notification.json";
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationsData = yield getData(this.notificationsData);
            const content = document.getElementById("content");
            const notificationsViewComponent = document.createElement("div");
            notificationsViewComponent.id = "notifications-content";
            notificationsViewComponent.innerHTML = /*html*/ `
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
        });
    }
}
export const notificationsView = new NotificationsView();

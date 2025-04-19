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
class DashboardView {
    constructor() {
        this.notes = "../../data/Note.json";
        this.notifications = "../../data/Notification.json";
    }
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const notesRaw = yield getData(this.notes);
            const notificationsRaw = yield getData(this.notifications);
            const content = document.getElementById("content");
            const dashboardContent = document.createElement("div");
            dashboardContent.id = "clients-content";
            console.log(content);
            dashboardContent.innerHTML = /*html*/ `
            <div class="view-header">
                <h1>Dashboard</h1>
            </div>

            <table id="users">
                <thead>
                    <tr>
                        <th class="text:noBreakline">Notification</th>
                        <th class="text:noBreakline">Instance Name</th>
                        <th class="text:noBreakline">Date Added</th>
                        <th class="text:noBreakline">Time</th>
                        <th class="text:noBreakline">Added by</th>
                    </tr>
                </thead>

                <tbody id="notifications-table"></tbody>
            </table>
        `;
            content.appendChild(dashboardContent);
            this.displayNotificaions("notifications-table", notificationsRaw);
        });
    }
    displayNotificaions(tableID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const TABLE_BODY = document.getElementById(tableID);
            TABLE_BODY.innerHTML = "";
            console.log(data[0]);
            for (let i = 0; i < data.length; i++) {
                const notification = yield data[i];
                const row = document.createElement("tr");
                row.innerHTML = /*html*/ `
                <td>${notification.notificationType._instanceName}</td>
                <td>${notification._instanceName}</td>
                <td>${updateDate(yield notification.createdDate)}</td>
                <td>${notification.creationTime}</td>
                <td>${notification.user.firstName} ${notification.user.lastName}</td>
            `;
                TABLE_BODY.appendChild(row);
            }
        });
    }
}
export const dashboardView = new DashboardView();
;

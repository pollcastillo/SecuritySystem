import getData, { dataURI } from '../../API/GetData.js';
import { updateDate } from '../../functions/UpdateDate.js';

class DashboardView {
    private notes: dataURI = "../../data/Note.json";
    private notifications: dataURI = "../../data/Notification.json";

    public async render() {
        const notesRaw: any = await getData(this.notes);
        const notificationsRaw: any = await getData(this.notifications);
        const content: HTMLElement = document.getElementById("content")!;
        const dashboardContent: HTMLElement = document.createElement("div");
        dashboardContent.id = "clients-content";


        console.log(content);
        dashboardContent.innerHTML = /*html*/`
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


    }

    private async displayNotificaions(tableID: string, data: any[]): Promise<void> {
        const TABLE_BODY: HTMLElement = document.getElementById(tableID)!;
        TABLE_BODY.innerHTML = "";

        console.log(data[0]);

        for (let i = 0; i < data.length; i++) {
            const notification = await data[i];
            const row: HTMLTableRowElement = document.createElement("tr");

            row.innerHTML = /*html*/`
                <td>${notification.notificationType._instanceName}</td>
                <td>${notification._instanceName}</td>
                <td>${updateDate(await notification.createdDate)}</td>
                <td>${notification.creationTime}</td>
                <td>${notification.user.firstName} ${notification.user.lastName}</td>
            `;

            TABLE_BODY.appendChild(row);
        }
    }
}

export const dashboardView = new DashboardView();;
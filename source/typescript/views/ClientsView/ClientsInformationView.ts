import { checkUndefinedData } from '../../functions/CheckUndefinedData.js';
import { updateDate } from '../../functions/UpdateDate.js';

class ClientsInformationView {
    async render(clientID: string, data: any): Promise<void> {
        const drawer = document.getElementById("drawer")! as HTMLElement;

        const clients = await data.filter((client: any) => client.id === clientID);
        const client = clients[0];
        const InformationComponent = document.createElement("div");
        InformationComponent.classList.add("client-information-container");
        InformationComponent.id = client.id;

        console.log(data);

        drawer.innerHTML = "";

        InformationComponent.innerHTML = /*html*/`
            <div class="client-information">
                <button id="close" class="close"><i class="ph ph-x"></i></button>
                <h1>${await checkUndefinedData(client.firstName)} ${await checkUndefinedData(client.lastName)}</h1>
                
                <p><i class="ph ph-users"></i> ${await checkUndefinedData(client.createdBy)}</p>
                <p><i class="ph ph-phone"></i> ${await checkUndefinedData(client.phone)}</p>
                <p>Client Address: ${client.address}</p>
                <p>Client Status: ${client.state.name}</p>

                <div id="citadel"></div>
                <div id="contractor"></div>
                <div id="customer"></div>
                <div id="department"></div>
                <div id="customer"></div>
            </div>

            <div class="controls">
                <button id="edit-client">Edit</button>
                <button id="delete-client">Delete</button>
            </div>
        `;

        console.log(clients[0].firstName);
        drawer.classList.add("drawer");

        drawer.appendChild(InformationComponent);

        const close = document.getElementById("close")! as HTMLButtonElement;
        close.addEventListener("click", () => {
            drawer.removeChild(InformationComponent);
            drawer.classList.remove("drawer");

        });

        this.renderCitadelInformation(client);
        this.renderContractorInformation(client);
        this.renderCustomerInformation(client);
    }

    private async renderCitadelInformation(data: any) {
        const citadel = document.getElementById("citadel")! as HTMLElement;
        if (data.citadel) {
            citadel.innerHTML = /*html*/`
                <h3>Citadel </h3>
                <p><i class="ph ph-city"></i> ${await checkUndefinedData(data.citadel.name)}</p>
                <p><i class="ph ph-users"></i> ${await checkUndefinedData(data.citadel.createdBy)}</p>
                <p><i class="ph ph-calendar-x"></i> ${updateDate(await checkUndefinedData(data.citadel.createdDate))}</p>
            `;
        } else {
            citadel.innerHTML = "<h3></h3";
        }
    }

    private async renderContractorInformation(data: any) {
        const contractor = document.getElementById("contractor")! as HTMLElement;
        if (data.contractor) {
            contractor.innerHTML = /*html*/`
                <h3>Contractor</h3>
                <p><i class="ph ph-identification-badge"></i> Name: ${await checkUndefinedData(data.contractor.name)}</p>
                <p><i class="ph ph-users"></i> Created By: ${await checkUndefinedData(data.contractor.createdBy)}</p>
            `;
        } else {
            contractor.innerHTML = "<h3></h3";
        }
    }

    private async renderCustomerInformation(data: any) {
        const customer = document.getElementById("customer")! as HTMLElement;
        if (data.customer) {
            customer.innerHTML = /*html*/`
                <h3>Customer</h3>
                <p><i class="ph ph-users"></i> Name: ${await checkUndefinedData(data.customer.name)}</p>
                <p><i class="ph ph-plugs"></i> associate: ${await checkUndefinedData(data.customer.associate)}</p>
                <p><i class="ph ph-users"></i> Created By: ${await checkUndefinedData(data.customer.createdBy)}</p>
                <p><i class="ph ph-hash"></i> RUC: ${await checkUndefinedData(data.customer.ruc)}</p>
            `;
        } else {
            customer.innerHTML = "<h3></h3";
        }
    }


}

export const clientsInformationView = new ClientsInformationView();
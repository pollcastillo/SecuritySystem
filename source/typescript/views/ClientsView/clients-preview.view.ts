import { translateStates } from '../../Core/functions/translateStates.function.js';
import { coreServices } from '../../_core/services/services.js';

class ClientsInformationView {
    async render(clientID: string, data: any): Promise<void> {
        const drawer = document.getElementById("drawer")! as HTMLElement;

        const clients = await data.filter((client: any) => client.id === clientID);
        const client = clients[0];
        const InformationComponent = document.createElement("div");
        InformationComponent.classList.add("drawer-content");
        InformationComponent.id = client.id;

        console.log(data);

        drawer.innerHTML = "";

        InformationComponent.innerHTML = /*html*/`
            <div class="drawer-information">
                <button id="close" class="close"><i class="ph ph-x"></i></button>
                <h1>${await coreServices.validateData(client.firstName)} ${await coreServices.validateData(client.lastName)}</h1>

                <div class="drawer-data-information">
                    <div class="info">
                        <span class="info-title">Status</span>
                        <span class="info-badge">${await translateStates(await coreServices.validateData(client.state.name))}</span>
                    </div>
                    
                    <div class="info">
                        <span class="info-title">Phone Number</span>
                        <span class="info-content">${await client.phone}</span>
                    </div>
                </div>
                
                <p><i class="ph ph-users"></i> ${await coreServices.validateData(client.createdBy)}</p>
                <p><i class="ph ph-phone"></i> ${await coreServices.validateData(client.phone)}</p>
                <p>Client Address: ${client.address}</p>
                <p>Client Status: ${client.state.name}</p>

                <div id="citadel"></div>
                <div id="contractor"></div>
                <div id="customer"></div>
                <div id="department"></div>
                <div id="customer"></div>
            </div>

            <div class="drawer-controls">
                <button id="edit-client">Edit</button>
                <button id="delete-client">Delete</button>
            </div>
        `;

        console.log(clients[0].firstName);
        drawer.classList.add("isActive");
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
                <p><i class="ph ph-city"></i> ${await coreServices.validateData(data.citadel.name)}</p>
                <p><i class="ph ph-users"></i> ${await coreServices.validateData(data.citadel.createdBy)}</p>
                <p><i class="ph ph-calendar-x"></i> ${await coreServices.translateDate(data.citadel.createdDate)}</p>
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
                <p><i class="ph ph-identification-badge"></i> Name: ${await coreServices.validateData(data.contractor.name)}</p>
                <p><i class="ph ph-users"></i> Created By: ${await coreServices.validateData(data.contractor.createdBy)}</p>
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
                <p><i class="ph ph-users"></i> Name: ${await coreServices.validateData(data.customer.name)}</p>
                <p><i class="ph ph-plugs"></i> associate: ${await coreServices.validateData(data.customer.associate)}</p>
                <p><i class="ph ph-users"></i> Created By: ${await coreServices.validateData(data.customer.createdBy)}</p>
                <p><i class="ph ph-hash"></i> RUC: ${await coreServices.validateData(data.customer.ruc)}</p>
            `;
        } else {
            customer.innerHTML = "<h3></h3";
        }
    }


}

export const clientsInformationView = new ClientsInformationView();
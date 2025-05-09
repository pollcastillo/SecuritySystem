import { coreServices } from '../../_core/services/services.js';

export default class ClientEditorView {
    private $drawer = document.getElementById("drawer")! as HTMLElement;

    public async present(ID: String, __ClientsData__: any) {
        const __ClientData__ = await __ClientsData__;
        const CLIENT = await __ClientData__.filter((client: any) => client.id === ID);
        const client = CLIENT[0];

        const $info = document.createElement("div")!;
        $info.classList.add("drawer-content");
        $info.id = client.id;

        this.$drawer.innerHTML = "";

        $info.innerHTML = /*html*/`
            <div class="drawer-information">
                <button id="close" class="close"><i class="ph ph-x"></i></button>
                <h1>${await coreServices.validateData(client.firstName)} ${await coreServices.validateData(client.lastName)}</h1>

                <div class="drawer-data-information">
                    <div class="info">
                        <span class="info-title">Status</span>
                        <span class="info-badge">${await coreServices.translateStates(await coreServices.validateData(client.state.name))}</span>
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

        this.$drawer.classList.add("isActive");
        this.$drawer.classList.add("drawer");
        this.$drawer.appendChild($info);

        const $close = document.getElementById("close")! as HTMLButtonElement;
        $close.addEventListener("click", _ => {
            this.$drawer.removeChild($info);
            this.$drawer.classList.remove("drawer");
        });

        // Render more information
        this._renderCitadel(client);
        this._renderContractor(client);
        this._renderCustomer(client);
    }

    private async _renderCitadel(__ClientData__: any) {
        const _citadel = document.getElementById("citadel")! as HTMLElement;

        if (__ClientData__.citadel) {
            _citadel.innerHTML = /*html*/`
                <h3>Citadel </h3>
                <p><i class="ph ph-city"></i> ${await coreServices.validateData(__ClientData__.citadel.name)}</p>
                <p><i class="ph ph-users"></i> ${await coreServices.validateData(__ClientData__.citadel.createdBy)}</p>
                <p><i class="ph ph-calendar-x"></i> ${await coreServices.translateDate(__ClientData__.citadel.createdDate)}</p>
            `;
        } else { _citadel.innerHTML = ""; }

    }

    private async _renderContractor(__ClientData__: any) {
        const _contractor = document.getElementById("contractor")! as HTMLElement;
        if (__ClientData__.contractor) {
            _contractor.innerHTML = `
                <h3>Contractor</h3>
                <p><i class="ph ph-identification-badge"></i> Name: ${await coreServices.validateData(__ClientData__.contractor.name)}</p>
                <p><i class="ph ph-users"></i> Created By: ${await coreServices.validateData(__ClientData__.contractor.createdBy)}</p>
            `;
        } else { _contractor.innerHTML = ""; }
    }

    private async _renderCustomer(__ClientData__: any) {
        const _customer = document.getElementById("customer")! as HTMLElement;
        if (__ClientData__.customer) {
            _customer.innerHTML = `
                <h3>Customer</h3>
                <p><i class="ph ph-users"></i> Name: ${await coreServices.validateData(__ClientData__.customer.name)}</p>
                <p><i class="ph ph-plugs"></i> associate: ${await coreServices.validateData(__ClientData__.customer.associate)}</p>
                <p><i class="ph ph-users"></i> Created By: ${await coreServices.validateData(__ClientData__.customer.createdBy)}</p>
                <p><i class="ph ph-hash"></i> RUC: ${await coreServices.validateData(__ClientData__.customer.ruc)}</p>
            `;
        } else { _customer.innerHTML = ""; }
    }
}
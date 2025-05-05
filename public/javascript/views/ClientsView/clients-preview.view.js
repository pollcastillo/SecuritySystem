var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { translateStates } from '../../Core/functions/translateStates.function.js';
import { coreServices } from '../../_core/services/services.js';
class ClientsInformationView {
    render(clientID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const drawer = document.getElementById("drawer");
            const clients = yield data.filter((client) => client.id === clientID);
            const client = clients[0];
            const InformationComponent = document.createElement("div");
            InformationComponent.classList.add("drawer-content");
            InformationComponent.id = client.id;
            console.log(data);
            drawer.innerHTML = "";
            InformationComponent.innerHTML = /*html*/ `
            <div class="drawer-information">
                <button id="close" class="close"><i class="ph ph-x"></i></button>
                <h1>${yield coreServices.validateData(client.firstName)} ${yield coreServices.validateData(client.lastName)}</h1>

                <div class="drawer-data-information">
                    <div class="info">
                        <span class="info-title">Status</span>
                        <span class="info-badge">${yield translateStates(yield coreServices.validateData(client.state.name))}</span>
                    </div>
                    
                    <div class="info">
                        <span class="info-title">Phone Number</span>
                        <span class="info-content">${yield client.phone}</span>
                    </div>
                </div>
                
                <p><i class="ph ph-users"></i> ${yield coreServices.validateData(client.createdBy)}</p>
                <p><i class="ph ph-phone"></i> ${yield coreServices.validateData(client.phone)}</p>
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
            const close = document.getElementById("close");
            close.addEventListener("click", () => {
                drawer.removeChild(InformationComponent);
                drawer.classList.remove("drawer");
            });
            this.renderCitadelInformation(client);
            this.renderContractorInformation(client);
            this.renderCustomerInformation(client);
        });
    }
    renderCitadelInformation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const citadel = document.getElementById("citadel");
            if (data.citadel) {
                citadel.innerHTML = /*html*/ `
                <h3>Citadel </h3>
                <p><i class="ph ph-city"></i> ${yield coreServices.validateData(data.citadel.name)}</p>
                <p><i class="ph ph-users"></i> ${yield coreServices.validateData(data.citadel.createdBy)}</p>
                <p><i class="ph ph-calendar-x"></i> ${yield coreServices.translateDate(data.citadel.createdDate)}</p>
            `;
            }
            else {
                citadel.innerHTML = "<h3></h3";
            }
        });
    }
    renderContractorInformation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractor = document.getElementById("contractor");
            if (data.contractor) {
                contractor.innerHTML = /*html*/ `
                <h3>Contractor</h3>
                <p><i class="ph ph-identification-badge"></i> Name: ${yield coreServices.validateData(data.contractor.name)}</p>
                <p><i class="ph ph-users"></i> Created By: ${yield coreServices.validateData(data.contractor.createdBy)}</p>
            `;
            }
            else {
                contractor.innerHTML = "<h3></h3";
            }
        });
    }
    renderCustomerInformation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = document.getElementById("customer");
            if (data.customer) {
                customer.innerHTML = /*html*/ `
                <h3>Customer</h3>
                <p><i class="ph ph-users"></i> Name: ${yield coreServices.validateData(data.customer.name)}</p>
                <p><i class="ph ph-plugs"></i> associate: ${yield coreServices.validateData(data.customer.associate)}</p>
                <p><i class="ph ph-users"></i> Created By: ${yield coreServices.validateData(data.customer.createdBy)}</p>
                <p><i class="ph ph-hash"></i> RUC: ${yield coreServices.validateData(data.customer.ruc)}</p>
            `;
            }
            else {
                customer.innerHTML = "<h3></h3";
            }
        });
    }
}
export const clientsInformationView = new ClientsInformationView();

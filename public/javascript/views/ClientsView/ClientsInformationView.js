var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { checkUndefinedData } from '../../functions/CheckUndefinedData.js';
import { updateDate } from '../../functions/UpdateDate.js';
class ClientsInformationView {
    render(clientID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const drawer = document.getElementById("drawer");
            const clients = yield data.filter((client) => client.id === clientID);
            const client = clients[0];
            const InformationComponent = document.createElement("div");
            InformationComponent.classList.add("client-information-container");
            InformationComponent.id = client.id;
            console.log(data);
            drawer.innerHTML = "";
            InformationComponent.innerHTML = /*html*/ `
            <div class="client-information">
                <button id="close" class="close"><i class="ph ph-x"></i></button>
                <h1>${yield checkUndefinedData(client.firstName)} ${yield checkUndefinedData(client.lastName)}</h1>
                
                <p><i class="ph ph-users"></i> ${yield checkUndefinedData(client.createdBy)}</p>
                <p><i class="ph ph-phone"></i> ${yield checkUndefinedData(client.phone)}</p>
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
                <p><i class="ph ph-city"></i> ${yield checkUndefinedData(data.citadel.name)}</p>
                <p><i class="ph ph-users"></i> ${yield checkUndefinedData(data.citadel.createdBy)}</p>
                <p><i class="ph ph-calendar-x"></i> ${updateDate(yield checkUndefinedData(data.citadel.createdDate))}</p>
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
                <p><i class="ph ph-identification-badge"></i> Name: ${yield checkUndefinedData(data.contractor.name)}</p>
                <p><i class="ph ph-users"></i> Created By: ${yield checkUndefinedData(data.contractor.createdBy)}</p>
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
                <p><i class="ph ph-users"></i> Name: ${yield checkUndefinedData(data.customer.name)}</p>
                <p><i class="ph ph-plugs"></i> associate: ${yield checkUndefinedData(data.customer.associate)}</p>
                <p><i class="ph ph-users"></i> Created By: ${yield checkUndefinedData(data.customer.createdBy)}</p>
                <p><i class="ph ph-hash"></i> RUC: ${yield checkUndefinedData(data.customer.ruc)}</p>
            `;
            }
            else {
                customer.innerHTML = "<h3></h3";
            }
        });
    }
}
export const clientsInformationView = new ClientsInformationView();

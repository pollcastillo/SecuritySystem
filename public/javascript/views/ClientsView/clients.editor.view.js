var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { coreServices } from '../../_core/services/services.js';
export default class ClientEditorView {
    constructor() {
        this.$drawer = document.getElementById("drawer");
    }
    present(ID, __ClientsData__) {
        return __awaiter(this, void 0, void 0, function* () {
            const __ClientData__ = yield __ClientsData__;
            const CLIENT = yield __ClientData__.filter((client) => client.id === ID);
            const client = CLIENT[0];
            const $info = document.createElement("div");
            $info.classList.add("drawer-content");
            $info.id = client.id;
            this.$drawer.innerHTML = "";
            $info.innerHTML = /*html*/ `
            <div class="drawer-information">
                <button id="close" class="close"><i class="ph ph-x"></i></button>
                <h1>${yield coreServices.validateData(client.firstName)} ${yield coreServices.validateData(client.lastName)}</h1>

                <div class="drawer-data-information">
                    <div class="info">
                        <span class="info-title">Status</span>
                        <span class="info-badge">${yield coreServices.translateStates(yield coreServices.validateData(client.state.name))}</span>
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
            this.$drawer.classList.add("isActive");
            this.$drawer.classList.add("drawer");
            this.$drawer.appendChild($info);
            const $close = document.getElementById("close");
            $close.addEventListener("click", _ => {
                this.$drawer.removeChild($info);
                this.$drawer.classList.remove("drawer");
            });
            // Render more information
            this._renderCitadel(client);
            this._renderContractor(client);
            this._renderCustomer(client);
        });
    }
    _renderCitadel(__ClientData__) {
        return __awaiter(this, void 0, void 0, function* () {
            const _citadel = document.getElementById("citadel");
            if (__ClientData__.citadel) {
                _citadel.innerHTML = /*html*/ `
                <h3>Citadel </h3>
                <p><i class="ph ph-city"></i> ${yield coreServices.validateData(__ClientData__.citadel.name)}</p>
                <p><i class="ph ph-users"></i> ${yield coreServices.validateData(__ClientData__.citadel.createdBy)}</p>
                <p><i class="ph ph-calendar-x"></i> ${yield coreServices.translateDate(__ClientData__.citadel.createdDate)}</p>
            `;
            }
            else {
                _citadel.innerHTML = "";
            }
        });
    }
    _renderContractor(__ClientData__) {
        return __awaiter(this, void 0, void 0, function* () {
            const _contractor = document.getElementById("contractor");
            if (__ClientData__.contractor) {
                _contractor.innerHTML = `
                <h3>Contractor</h3>
                <p><i class="ph ph-identification-badge"></i> Name: ${yield coreServices.validateData(__ClientData__.contractor.name)}</p>
                <p><i class="ph ph-users"></i> Created By: ${yield coreServices.validateData(__ClientData__.contractor.createdBy)}</p>
            `;
            }
            else {
                _contractor.innerHTML = "";
            }
        });
    }
    _renderCustomer(__ClientData__) {
        return __awaiter(this, void 0, void 0, function* () {
            const _customer = document.getElementById("customer");
            if (__ClientData__.customer) {
                _customer.innerHTML = `
                <h3>Customer</h3>
                <p><i class="ph ph-users"></i> Name: ${yield coreServices.validateData(__ClientData__.customer.name)}</p>
                <p><i class="ph ph-plugs"></i> associate: ${yield coreServices.validateData(__ClientData__.customer.associate)}</p>
                <p><i class="ph ph-users"></i> Created By: ${yield coreServices.validateData(__ClientData__.customer.createdBy)}</p>
                <p><i class="ph ph-hash"></i> RUC: ${yield coreServices.validateData(__ClientData__.customer.ruc)}</p>
            `;
            }
            else {
                _customer.innerHTML = "";
            }
        });
    }
}

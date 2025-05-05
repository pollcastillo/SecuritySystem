import getData from '../Core/API/GetData.js';

export default class ClientsModel {
    public async getData() {
        return await getData("User");
    }
}
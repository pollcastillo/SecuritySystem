import getData from '../Core/API/GetData.js';

export default class ClientsModel {
    public async getData(): Promise<any> {
        return await getData("User");
    }
}
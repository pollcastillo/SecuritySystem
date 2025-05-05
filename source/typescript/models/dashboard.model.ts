import getData from '../Core/API/GetData.js';

export default class DashboardModel {
    public async getData() {
        return await getData("User");
    }
}
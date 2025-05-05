import getData from '../Core/API/GetData.js';

export default class NotesModel {
    public async getData() {
        return await getData("Note");
    }
}
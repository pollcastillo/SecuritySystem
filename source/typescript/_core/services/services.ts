class Service {
    public async validateData(data: any[] | any) {
        return await data === undefined ? '<span class="ph ph-warning text:yellow"></span>' : await data;
    }

    public async translateStates() {

    }

    public async translateDate(data: any[] | any) {
        if (await data === undefined) {
            return '<span class="ph ph-warning text:yellow"></span>';
        } else {
            const d = await data.replace("-", " ")
                .replace("-", " ")
                .replace("T", " ")
                .trim();

            const day = d.slice(8, 10);
            const month = d.slice(5, 7);
            const year = d.slice(0, 4);

            const returnDate: string = `${day}/${month}/${year}`; //=>
            return returnDate;
        }
    }
}

export const coreServices = new Service();
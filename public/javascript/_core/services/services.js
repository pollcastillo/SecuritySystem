var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Service {
    validateData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield data) === undefined ? '<span class="ph ph-warning text:yellow"></span>' : yield data;
        });
    }
    translateStates(state) {
        return __awaiter(this, void 0, void 0, function* () {
            if (state === "Enabled") { //=>
                return state = "Activo";
            }
            else if (state === "Disabled") {
                return state = "Inactivo";
            }
        });
    }
    translateDate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield data) === undefined) {
                return '<span class="ph ph-warning text:yellow"></span>';
            }
            else {
                const d = yield data.replace("-", " ")
                    .replace("-", " ")
                    .replace("T", " ")
                    .trim();
                const day = d.slice(8, 10);
                const month = d.slice(5, 7);
                const year = d.slice(0, 4);
                const returnDate = `${day}/${month}/${year}`; //=>
                return returnDate;
            }
        });
    }
}
export const coreServices = new Service();

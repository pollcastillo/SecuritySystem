/**
 * Traduce los estados del inglés al español
 */
export function translateStates(state) {
    if (state === "Enabled") { //=>
        return state = "Activo";
    }
    else if (state === "Disabled") {
        return state = "Inactivo";
    }
}

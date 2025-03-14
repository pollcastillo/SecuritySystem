export function updateLanguageStates(state) {
    if (state === "Enabled") {
        return state = "Activo";
    }
    else if (state === "Disabled") {
        return state = "Inactivo";
    }
}

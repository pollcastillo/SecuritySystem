class Logout {
    constructor() {
        this.app = document.getElementById("app");
    }
    exec() {
        const NotifyLogout = document.createElement("div");
        NotifyLogout.classList.add("window-floater");
        NotifyLogout.innerHTML = /*html*/ `
            <div class="window-floater_window">
                <div class="">
                    <p class="text-stone-50">¿Estás seguro de que deseas cerrar sesión?</p>
                </div>

                <div class="window-floater_options">
                    <button id="confirm">Confirm</button>
                    <button id="cancel">Cancel</button>
                </div>
            </div>
        `;
        this.app.appendChild(NotifyLogout);
        const confirm = document.getElementById("confirm");
        const cancel = document.getElementById("cancel");
        confirm.addEventListener("click", () => {
            this.logout();
        });
        cancel.addEventListener("click", () => {
            NotifyLogout.remove();
        });
    }
    logout() {
        const loginStatus = localStorage.getItem("login");
        if (loginStatus === "true") {
            localStorage.setItem("login", "false");
            window.location.reload();
        }
    }
}
export const LOGOUT = new Logout();

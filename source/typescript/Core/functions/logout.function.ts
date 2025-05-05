class Logout {
    private app: HTMLElement = document.getElementById("app")! as HTMLElement;

    public exec() {
        const NotifyLogout: HTMLElement = document.createElement("div")!;
        NotifyLogout.classList.add("window-floater");

        NotifyLogout.innerHTML = /*html*/`
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

        const confirm: HTMLButtonElement = document.getElementById("confirm")! as HTMLButtonElement;
        const cancel: HTMLButtonElement = document.getElementById("cancel")! as HTMLButtonElement;

        confirm.addEventListener("click", () => {
            this.logout();
        });

        cancel.addEventListener("click", () => {
            NotifyLogout.remove();
        });
    }

    private logout() {
        const loginStatus = localStorage.getItem("login");

        if (loginStatus === "true") {
            localStorage.setItem("login", "false");
            window.location.reload();
        }
    }
}

export const LOGOUT = new Logout();
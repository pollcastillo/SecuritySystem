class Logout {
    private app: HTMLElement = document.getElementById("app")! as HTMLElement;

    public exec() {
        const NotifyLogout: HTMLElement = document.createElement("div")!;
        NotifyLogout.classList.add("flex", "fixed", "top-0", "left-0", "w-full", "h-full", "bg-stone-950", "bg-opacity-50", "justify-center", "items-center", "z-50");

        NotifyLogout.innerHTML = /*html*/`
            <div class="flex flex-col bg-stone-950 p-4 rounded-md border border-stone-800">
                <div class="">
                    <p class="text-stone-50">¿Estás seguro de que deseas cerrar sesión?</p>
                </div>
                <div class="flex justify-end gap-2 mt-4">
                    <button class="bg-red-600 py-1 px-2 rounded-md text-white" id="confirm">Confirm</button>
                    <button class="button" id="cancel">Cancel</button>
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
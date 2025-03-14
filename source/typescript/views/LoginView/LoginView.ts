import { auth } from '../../AUTH/AuthLogin.js';

class LoginView {
    private app: HTMLElement = document.getElementById("app")! as HTMLElement;

    render() {
        const view = document.createElement("div")!;
        view.classList.add("view");
        const login: any = /*html*/`
            <div class="login">
                <div class="login-content">
                    <div class="logo">
                        <h4>Sysmonk</h4>
                        <span>Registros de seguridad</span>
                    </div>

                <div class="login-form">
                    <h4>Inicia sesión</h4>

                    <div id="form">
                        <div class="field">
                            <label for="username">Email:</label>
                            <input class="input-lg" placeholder="Ingresa tu nombre de usuario" id="username" name="username"/>
                        </div>
                        
                        <div class="field">
                            <label for="password">password:</label>
                            <input type="password" class="input-lg" placeholder="••••••••••••" id="password" name="password"/>
                            <a class="forgot-your-password-link" href="#">¿Olvidaste tu contraseña?</a>
                        </div>

                        <button id="submit">Iniciar sesión</button>
                    </div>
                </div>

                <div class="login-message">
                    <span>Ingresa con los datos entregados por el proveedor</span>
                </div>
            </div>
        </div>`;

        view.innerHTML = login;
        this.app.appendChild(view);

        const username: HTMLInputElement = document.getElementById("username")! as HTMLInputElement;
        const password: HTMLInputElement = document.getElementById("password")! as HTMLInputElement;
        const submit: HTMLButtonElement = document.getElementById("submit")! as HTMLButtonElement;

        submit.addEventListener('click', e => {
            e.preventDefault();

            const PASSWORD = this.checkInput(password);

            if (PASSWORD) {
                localStorage.setItem("login", `${PASSWORD}`);
            }
        });
    }

    private checkInput(input: HTMLInputElement): any {
        let message: string = "";
        if (input.value === "") {
            return false;
        } else {
            return true;
        }
    }
}

export const loginView = new LoginView();
class LoginView {
    constructor() {
        this.app = document.getElementById("app");
    }
    render() {
        const view = document.createElement("div");
        view.classList.add("view");
        const login = /*html*/ `
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
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const submit = document.getElementById("submit");
        submit.addEventListener('click', e => {
            e.preventDefault();
            const PASSWORD = this.checkInput(password);
            if (PASSWORD) {
                localStorage.setItem("login", `${PASSWORD}`);
            }
        });
    }
    checkInput(input) {
        let message = "";
        if (input.value === "") {
            return false;
        }
        else {
            return true;
        }
    }
}
export const loginView = new LoginView();

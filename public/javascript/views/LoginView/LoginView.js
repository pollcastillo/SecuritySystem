class LoginView {
    constructor() {
        this.app = document.getElementById("app");
    }
    render() {
        const view = document.createElement("div");
        view.classList.add("view");
        const login = /*html*/ `
            <div class="login-view">
                <div class="login-header">
                    <h4>Sysmonk</h4>
                    <span>Registros de seguridad</span>
                </div>

                <div class="form"> <!-- FORM -->
                    <div class="form-title">
                        <h4>Login to Sysmonk</h4>
                        <a href="#" class="link-hire_service">Hire Service <i class="ph-bold ph-arrow-right"></i></a>
                    </div>

                    <div class="form-field">
                        <label for="username">User</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" required>
                    </div>
                    
                    <div class="form-field">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="••••••••••••••••••••" required>
                    </div>

                    <input type="submit" value="Login" id="submit" class="btn-login">
    
                </div>
                
                <div class="form-footer"></div>
            </div>
            <div class="login-background"></div>
        `;
        view.innerHTML = login;
        this.app.appendChild(view);
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const submit = document.getElementById("submit");
        submit.classList.add("button");
        submit.addEventListener('click', (e) => {
            this.login(e, password);
        });
    }
    login(evTarget, Button) {
        evTarget.preventDefault();
        const PASSWORD = this.checkInput(Button);
        if (PASSWORD) {
            window.location.reload();
            localStorage.setItem("login", `${PASSWORD}`);
        }
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

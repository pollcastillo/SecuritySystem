import { LOGOUT } from '../Core/functions/logout.function.js';
class Header {
    render() {
        const header = document.getElementById("header");
        header === null || header === void 0 ? void 0 : header.classList.add("header");
        const contentHeader = document.createElement("div");
        contentHeader.classList.add("header-content");
        contentHeader.innerHTML = /*html*/ `
            <div>
                <span class="logo">Sysmonk</div>
            </div>
            
            <div>
                <div class="header-button_group">
                    <button class="hover:bg-stone-800 transition-all px-1 rounded-sm cursor-pointer"><i class="ph ph-bell-ringing"></i></button>
                    <button class="hover:bg-stone-800 transition-all px-1 rounded-sm cursor-pointer"><i class="ph ph-call-bell"></i></button>
                    <button class="hover:bg-stone-800 transition-all px-1 rounded-sm cursor-pointer" id="logout"><i class="ph ph-gear"></i></button>
                </div>
            </div>
        `;
        header === null || header === void 0 ? void 0 : header.appendChild(contentHeader);
        const logout = document.getElementById("logout");
        logout === null || logout === void 0 ? void 0 : logout.addEventListener("click", () => {
            LOGOUT.exec();
        });
    }
}
export const header = new Header();

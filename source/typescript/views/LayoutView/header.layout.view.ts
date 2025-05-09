import { LOGOUT } from '../../Core/functions/logout.function.js';

class HeaderView {
    draw() {
        const header = document.getElementById("header");
        header?.classList.add("header");
        const contentHeader: HTMLElement = document.createElement("div")! as HTMLElement;
        contentHeader.classList.add("header-content");

        contentHeader.innerHTML = /*html*/`
                    <div class="user">
                        <div class="user_picture">
                            <img src="./public/pictures/profiles/prof_4.png">
                        </div>
                        <span class="user_basic_data">
                            <div class="name">Jane Doe</div>
                            <div class="area">Intercore Administrator</div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="header-button_group">
                            <button class="hover:bg-stone-800 transition-all px-1 rounded-sm cursor-pointer"><i class="ph ph-bell-ringing"></i></button>
                            <button class="hover:bg-stone-800 transition-all px-1 rounded-sm cursor-pointer"><i class="ph ph-call-bell"></i></button>
                            <button class="hover:bg-stone-800 transition-all px-1 rounded-sm cursor-pointer" id="logout"><i class="ph ph-gear"></i></button>
                        </div>
                    </div>
                `;

        header?.appendChild(contentHeader);

        const logout = document.getElementById("logout");
        logout?.addEventListener("click", () => {
            LOGOUT.exec();
        });
    }

}

export const headerView = new HeaderView();
class Header {
    render() {
        const header = document.getElementById("header");
        header?.classList.add("ui:header");
        const contentHeader: HTMLElement = document.createElement("div")! as HTMLElement;
        contentHeader.classList.add("ui:header-content");

        contentHeader.innerHTML = /*html*/`
            <div class="left">
                <span class="logo">Sysmonk</div>
            </div>
            
            <div class="right">
                <div class="button-group">
                    <button><i class="ph ph-bell-ringing"></i></button>
                    <button><i class="ph ph-call-bell"></i></button>
                    <button><i class="ph ph-gear"></i></button>
                </div>
            </div>
        `;

        header?.appendChild(contentHeader);
    }
}

export const header = new Header();
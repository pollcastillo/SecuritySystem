import { header } from '../../components/header.js';
import { sidebar } from '../../components/sidebar.js';
class Layout {
    constructor() {
        this.app = document.getElementById("app");
    }
    draw() {
        var _a;
        const contentHeader = document.createElement("div");
        const contentContainer = document.createElement("div");
        const sidebarWrapper = document.createElement("div");
        const floatMessage = document.createElement("div");
        const content = document.createElement("div");
        contentHeader.id = "header";
        sidebarWrapper.id = "sidebar";
        content.id = "content";
        contentContainer.id = "content-container";
        contentContainer.classList.add("content-container");
        contentContainer.appendChild(sidebarWrapper);
        contentContainer.appendChild(content);
        (_a = this.app) === null || _a === void 0 ? void 0 : _a.appendChild(contentHeader);
        this.app.appendChild(contentContainer);
        sidebar.render();
        header.render();
    }
}
export const layout = new Layout();

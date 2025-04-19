import { header } from '../components/header.js';
import { sidebar } from '../components/sidebar.js';
class Layout {
    constructor() {
        this.app = document.getElementById("app");
    }
    draw() {
        var _a;
        const contentHeader = document.createElement("div");
        contentHeader.id = "header";
        const sidebarWrapper = document.createElement("div");
        sidebarWrapper.id = "sidebar";
        sidebarWrapper.classList.add("sidebar-wrapper");
        const drawer = document.createElement("div");
        drawer.id = "drawer";
        drawer.classList.add("drawer");
        const content = document.createElement("div");
        content.id = "content";
        content.classList.add("content");
        const contentContainer = document.createElement("div");
        contentContainer.id = "content-container";
        contentContainer.classList.add("content-container");
        contentContainer.appendChild(sidebarWrapper);
        contentContainer.appendChild(content);
        (_a = this.app) === null || _a === void 0 ? void 0 : _a.appendChild(contentHeader);
        this.app.appendChild(contentContainer);
        contentContainer.appendChild(drawer);
        sidebar.render();
        header.render();
    }
}
export const layout = new Layout();

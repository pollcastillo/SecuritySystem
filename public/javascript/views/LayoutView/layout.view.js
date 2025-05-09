import { headerView } from './header.layout.view.js';
import { sidebarView } from './sidebar.layout.view.js';
class LayoutView {
    constructor() {
        this.$App = document.getElementById("app");
    }
    draw() {
        const $ContentHeader = document.createElement("div");
        const $SidebarWrapper = document.createElement("div");
        const $Drawer = document.createElement("div");
        const $AppContent = document.createElement("div");
        const $AppContentContainer = document.createElement("div");
        $ContentHeader.id = "header";
        $SidebarWrapper.id = "sidebar";
        $Drawer.id = "drawer";
        $AppContent.id = "content"; // TODO: change this ID to "app-content"
        $AppContentContainer.id = "content-container";
        $SidebarWrapper.classList.add("sidebar-wrapper");
        $Drawer.classList.add("drawer");
        $AppContent.classList.add("content"); // TODO: change this CLASS to "app-content"
        $AppContentContainer.classList.add("content-container");
        $AppContentContainer.appendChild($SidebarWrapper);
        $AppContentContainer.appendChild($AppContent);
        this.$App.appendChild($ContentHeader);
        this.$App.appendChild($AppContentContainer);
        headerView.draw();
        sidebarView.render();
    }
}
export const layoutView = new LayoutView();

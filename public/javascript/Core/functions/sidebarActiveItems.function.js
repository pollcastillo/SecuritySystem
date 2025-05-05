export default function sidebarActiveItems(item_name) {
    const sidebarElements = document.getElementsByClassName("sidebar-item");
    const sidebarElement = document.getElementById(`sb-${item_name}`);
    console.log(sidebarElements);
    sidebarElement.classList.add("sb-active-item");
}

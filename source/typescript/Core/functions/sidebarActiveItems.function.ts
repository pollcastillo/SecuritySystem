export default function sidebarActiveItems(item_name: string) {
    const sidebarElements: HTMLCollection = document.getElementsByClassName("sidebar-item")!;
    const sidebarElement: HTMLElement = document.getElementById(`sb-${item_name}`)!;

    console.log(sidebarElements);
    sidebarElement.classList.add("sb-active-item");
}
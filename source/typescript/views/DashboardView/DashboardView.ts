class DashboardView {
    render() {
        const content = document.getElementById("content")!;
        const dashboard: HTMLElement = document.createElement("div");
        dashboard.id = "dashboard";

        dashboard.innerHTML = /*html*/`
            <h1>Dashboard</div>
            <button id="button">Button</button>
        `;

        content.appendChild(dashboard);

        const button = document.getElementById("button")!;
        button.addEventListener("click", () => {
            alert("click");
        });

    }
}

export const dashboardView = new DashboardView();
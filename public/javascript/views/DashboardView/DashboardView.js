class DashboardView {
    render() {
        const content = document.getElementById("content");
        const dashboard = document.createElement("div");
        dashboard.id = "dashboard-content";
        dashboard.innerHTML = /*html*/ `
            <div class="view-header">
                <h1>Dashboard</h1>
            </div>

            <div>
                <p>lorem ipsum</p>
            </div>
        `;
        content.appendChild(dashboard);
        const button = document.getElementById("button");
        button.addEventListener("click", () => {
            alert("click");
        });
    }
}
export const dashboardView = new DashboardView();

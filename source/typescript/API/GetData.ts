export default async function getData(url: string) {
    const data = await fetch(url)
        .then(response => response.json());
    return await data;
}

export type dataURI = "../../data/Note.json" | "../../data/User.json" | "../../data/Marcation.json" | "../../data/Department.json" | "../../data/Notification.json" | "../../data/Visit.json";
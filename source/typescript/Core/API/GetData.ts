

export default async function getData<T>(url: string): Promise<T> {
    const data: T = await fetch(`../../data/${url}.json`)
        .then(response => response.json());
    return await data;
}

export type dataURI = "../../data/Note.json" | "../../data/User.json" | "../../data/Marcation.json" | "../../data/Department.json" | "../../data/Notification.json" | "../../data/Visit.json";
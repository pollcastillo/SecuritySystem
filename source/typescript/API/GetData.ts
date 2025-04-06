const usersUrl: string = "../../data/User.json";
const marcationData: string = "../../data/Marcation.json";

export default async function getData(url: string) {
    const data = await fetch(url)
        .then(response => response.json());
    return await data;
}
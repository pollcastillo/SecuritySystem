const usersUrl: string = "../../data/User.json";

export default async function getData(url: string) {
    const data = await fetch(url)
        .then(response => response.json());
    return await data;
}
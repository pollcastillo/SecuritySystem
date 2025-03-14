export function updateDate(date) {
    if (date === '<span class="ph ph-warning"></span>') {
        return date = `<span class="ph ph-warning"></span>`;
    }
    const d = date.replace("-", " ")
        .replace("-", " ")
        .replace("T", " ")
        .trim();
    const day = d.slice(8, 10);
    const month = d.slice(5, 7);
    const year = d.slice(0, 4);
    const returnDate = `${day}/${month}/${year}`; //=>
    return returnDate;
}

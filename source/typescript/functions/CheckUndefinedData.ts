/**
 * Si el dato es indefinido retorna un span con el icono de error
*/
export async function checkUndefinedData(data: any) {
    return await data === undefined ? '<span class="ph ph-warning"></span>' : data;
}
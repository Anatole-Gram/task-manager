export async function getJson(url, options) {
    const data = await fetch(new URL(`${useApiUrl()}${url}`), options)
        .then(response => response.json())
    return data;
}
export function findById(array, id) {
    return array.find(item => item.id === id)
}

export async function getJson(url, options) {
    const response = await fetch(new URL(`${useApiUrl()}${url}`), options);
    const data = await response.json();
    return data;
}

export async function getJson(url, options) {
    const response = await fetch(new URL(`http://project-lucy.fun/api/${url}`), options);
    const data = await response.json();
    return data;
}

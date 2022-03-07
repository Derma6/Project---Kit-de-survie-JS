export async function easyFetch (url, save, callback) {
    const response = await fetch(url);
    const data = await response.json();
    // dataAPI = data.data
    // metaAPI = data.meta
    save(data)
    callback(data.data)
}
import axios from 'axios';


const cache = [];

const getCache = (id) => {
    const serializedData = localStorage.getItem(`EntityCache_${id}`);
    if (serializedData === null) {
        return undefined;
    }
    let data = JSON.parse(serializedData)
    return Date.now() - data.lastGet <= 300000 ? data : undefined
}

const saveCache = (entity) => {

    const data = {
        lastGet: Date.now(),
        data: entity,
        id: entity.id
    }
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(`EntityCache_${data.id}`, serializedData);
    } catch (e) {
        // Ignore write errors;
    }

}



export async function getEntity(entityID) {
    let cached = getCache(entityID)
    if (cached) {
        return cached.data
    }
    const response = await axios.get(`/api/open/entity/${entityID}`).then(res => res.data);
    saveCache(response);
    return response


}


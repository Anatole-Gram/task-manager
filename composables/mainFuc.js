export const getById = (array, id) => array.find(el => el.id === id);
export const useFilterBySetId = (array, setId) => array.filter(item => setId.has(item.id))


export const useCounter = (limit, start=0, step=1) => {
    let count = 0
    return () => {
        let current = count
        count===limit?count*0:count++
        return current
    }
}
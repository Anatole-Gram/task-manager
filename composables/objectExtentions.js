export const useCloneByListsKeys = (target, list) => {
    const mapForClone = list.map(el => [`${el}`, target[el]])
    return Object.fromEntries(mapForClone)
}

// export const useTargetPropsObject = (target, list) => {
//     const clone = ref({})
//     const refreshClone = (newTarget=target) => clone.value = Object.fromEntries(list.map(el => [`${el}`, newTarget[el]]))
//     refreshClone(target)
//     return {clone, refreshClone }
// }

export const useTargetPropsObject = (target, keysGen) => {
    const clone = ref({})
    const refreshClone = (newTarget=target) => clone.value = Object.fromEntries(keysGen(newTarget).map(el => [`${el}`, newTarget[el]]))
    refreshClone(target)
    return {clone, refreshClone}
}
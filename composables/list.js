export function useInteractiveList(length) {
    const current = ref(0)
    const setCurrent = (id) => {
        id === current.value ? current.value = 0 : current.value = +id
    }
    watch(length, (newVal, oldVal) => {newVal === 0 && setCurrent(0)})
    return {current, setCurrent}
}

export function useListItemRmById(id, list) {
    const idx = list.findIndex(el => el.id === id)
    list.splice(idx, 1)
}

export function useAnimationDelayFormlistItem(delayCounter, delayMultiplier=1) {
    const delay = ref(0)
    const delayMult = ref(delayMultiplier)
    const animationDelay = computed(()=> `${delay.value}s`)
    const setDelay = () => {
        delay.value = (delayMult.value*delayCounter()).toFixed(2)
    }
    return {animationDelay, setDelay}
}




//animation for list items
export const useAnimationDelayFromList = (dalayMultiplier, getListLength) => {

    let counterDelays
    watch(getListLength, newLength => {counterDelays = useCounter(newLength)}, {immediate: true})

    const delayMult = ref(dalayMultiplier)

    const onBeforeEnter = (el) => {
        el.dataset.count = counterDelays()
    }
    const onEnter = (el) => {
        el.style.animationDelay = (el.dataset.count*delayMult.value).toFixed(2)+'s'
    }
    const onBeforeLeave = (el) => {
        if(!getListLength()) el.style.animationDelay = (delayMult.value*getListLength()-delayMult.value*el.dataset.index).toFixed(2)+'s'
        else el.style.animationDelay = delayMult.value+'s'
    }

    return {counterDelays, delayMult, onBeforeEnter, onEnter, onBeforeLeave}
}
export const useSlider = (store) => {
    const list = computed(() => store.filteredList)
    const slider = computed(() => store.slider)
    const closeSlider = () => store.slider = false
    const currentIndex = computed(() => store.currentIndex)
    const currentItem = computed(() => store.filteredList[store.currentIndex])
    const setCurrent = (idx, size=list.value.length-1) => {
        if (idx < 0) { store.setCurrentIndex(size) }
        if (idx > size) { store.setCurrentIndex(0) }
        else store.setCurrentIndex(idx)
    }
    return {list, slider, closeSlider, currentIndex, currentItem, setCurrent}
}
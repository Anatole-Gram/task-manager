import { storeToRefs } from "pinia"

export const useSlider = (store) => {
    const { filteredList: list, slider, currentIndex } = storeToRefs(store)
    const closeSlider = () => store.setSlider(false)
    const currentItem = computed(() => store.filteredList[store.currentIndex])
    const setCurrent = (idx, size=list.value.length-1) => {
        if(idx < 0) {store.setCurrentIndex(size)}
        else if(idx > size) { store.setCurrentIndex(0)}
        else store.setCurrentIndex(idx)
    }
    return {list, slider, closeSlider, currentIndex, currentItem, setCurrent}
}
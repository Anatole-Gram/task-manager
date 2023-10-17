export const useSlider = store => {

    const slider = computed(() => store.slider)
    const closeSlider = () => store.slider = false

    const currentItem = computed(() => store.filteredList[store.currentIndex])
    const setCurent = idx => store.currentIndex = idx

    return {slider, closeSlider, currentItem, setCurent}
}
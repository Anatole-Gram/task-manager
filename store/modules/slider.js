//used in users and todos store
const sliderStates =  {
    slider: false,
    currentIndex: 0
}

const sliderActions = {
    setSlider(condition) { this.slider = condition },
    setCurrentIndex(index) {this.currentIndex = index},
    sliderToggle(index) { this.slider = !this.slider; this.currentIndex = index },
    resetSliderStates() { this.slider = false; this.currentIndex = 0 },
}

export {sliderStates, sliderActions}
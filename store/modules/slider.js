//used in users and todos store
const sliderStates =  {
    slider: false,
    currentIndex: 0
}

const sliderActions = {
    setSlider(state) { this.slider = state },
    setCurrentIndex(index) {this.currentIndex = index},
    sliderToggle(index) { this.slider = !this.slider; this.currentIndex = index }
}

export {sliderStates, sliderActions}
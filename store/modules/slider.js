const sliderStates =  {
    slider: false,
    currentIndex: 0
}

const sliderActions = {
    setCurrentIndex(index) {this.currentIndex = index},
    sliderToggle(index) { this.slider = !this.slider; this.currentIndex = index }
}

export {sliderStates, sliderActions}
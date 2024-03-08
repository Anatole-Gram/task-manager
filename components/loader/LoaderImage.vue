

<template>

    <label for="file-loader" 
        v-text="'выберите изображение'"
        class="btn box-black" />
    <input type="file" id="file-loader" accept="image/*"
        @change="fileReader($event)">

<ClientOnly>
    <Teleport to=".content" :disabled="false">
        <div v-if="loader"
            class="loader-modal">

            <ButtonClose 
                :topRight="[45, 8]"
                @closeAction="()=>loader=false" />

                <div class="loader__content-wraper">
                    <div class="loader__img-wraper">
                      <img :src="file.dataUrl" alt="user photo" ref="img">
                      <div ref="overlay" 
                            @mousedown="dropAnchor"
                            @mousemove="defineMousePosition"
                            @mouseup="raiseAnchor"
                            @mouseleave="raiseAnchor"
                            :style="`top: ${overlayPosition.top}px; left: ${overlayPosition.left}px;`"
                            class="loader__overlay">
                            
                            <div class="loader__overlay-corner"></div>
                            <div class="loader__overlay-corner"></div>
                            <div class="loader__overlay-corner"></div>
                            <div class="loader__overlay-corner"></div>
                      </div>
                    </div>
                    <div class="loader__menu">


                        {{ anchor }}

                        {{ mousePosition }}

                        {{ overlayPosition }}

                    </div>
                    
                    <!-- <canvas ref="canvasElement" width="200" height="200"></canvas>     -->
                </div>
        </div>
    </Teleport>
</ClientOnly>

</template>

<script setup>
    const props = defineProps({
        active: {
            type: [Boolean]
        }
    })
    const loader = ref(false)

    // const input = ref(null)
    const file = reactive({
        dataUrl: 1,
        blob: null
    })
    
    const fileReader = event => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            const img = document.createElement("img")
            img.addEventListener('load', () => {
                file.dataUrl = useImageResize(img, 500, 400)
                loader.value = true
            })
            img.src = reader.result
        });
        (/\.(jpe?g|png)$/i.test(event.target.files[0].name)) && reader.readAsDataURL(event.target.files[0]);
    }

    //image position
    const img = ref(null)
    const imgEdges = reactive({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    })
    const defineEdges = (el, outputKeys=['top', 'left', 'right', 'bottom'], target = {}) => {
        const elementEdges = {}
        const parentPosition = el.offsetParent.getBoundingClientRect()
        const elPosition = el.getBoundingClientRect()
        elementEdges.top = elPosition.top - parentPosition.top
        elementEdges.bottom = parentPosition.bottom - elPosition.bottom
        elementEdges.right =  parentPosition.right - elPosition.right
        elementEdges.left = elPosition.left - parentPosition.left
        return outputKeys.reduce((accum, current) => Object.assign(accum, {[current]: elementEdges[current] > 0 ? elementEdges[current] : 0}), target)
    }
    // watch(() => img.value, (newVal, oldVal) => { Object.assign(imgEdges, defineEdges(newVal))})


    //overlay position 
    const overlayPosition = reactive({
        top: 0,
        left: 0,
    })




    //mouse position
    const anchor = reactive({
        active: false,
        x: 0,
        y: 0
    })
    const dropAnchor = event => {
        anchor.active = true
        anchor.x = event.clientX
        anchor.y = event.clientY
    }
    const raiseAnchor = () => {
        anchor.active = false
        defineEdges(overlay.value, ['top', 'left'], overlayPosition)
    }
    const mousePosition = reactive({
        x: 0,
        y: 0
    })
    const defineMousePosition = event => {
        if(anchor.active) {
            mousePosition.x = event.clientX
            mousePosition.y = event.clientY
        }
    }

    //overlay
    const overlay = ref(null)
    const definePositionLimits = () => {
        const {width: imgW, height: imgH} = img.value.getBoundingClientRect()
        const {width: overlayW, height: overlayH} = overlay.value.getBoundingClientRect()
        return {x: imgW - overlayW, y: imgH - overlayH}

    }
    watch(mousePosition, (newVal, oldVal) => {
        const {x, y} = {x: 0, y: 0}
        const {top, left} = defineEdges(overlay.value, ['top', 'left'])
        const {x: limitX, y: limitY} = definePositionLimits()
        if (top > limitX) 
        overlay.value.style.transform = `translate(${mousePosition.x - anchor.x}px, ${mousePosition.y - anchor.y}px)`
    })



</script>

<style lang="scss" scoped>
    .loader-modal {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    canvas {
        border: 2px solid black;
        width: 200px;
        height: 200px;
        }
        label {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 8px 8px 16px;
            font: {
                family: 'Verdana';
                size: 14px;
                variant: small-caps;
                weight: 600;
            }
            color: $textWhiteNotActive;
            opacity: .85;
            &:hover {
                opacity: 1;
                color: $mainWhite;
            }
        }
        input {
            display: none;
        }

</style>
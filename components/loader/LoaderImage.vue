

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
                <div 
                    @mousedown.prevent="false"
                    class="loader__content-wraper">
                    <div class="loader__img-wraper" ref="wraper">
                      <img :src="file.dataUrl" alt="user photo" ref="img">
                      <div ref="overlay" 
                            @mousedown.prevent="dropAnchor($event)"
                            @mousemove.stop="defineMousePosition"
                            @mouseup="raiseAnchor()"
                            @mouseleave="raiseAnchor()"
                            :data-anchor="'translate'"
                            :style="{
                                top: overlayPosition.top+'px', left: overlayPosition.left+'px',
                                transformOrigin: `${scale.origin.x} ${scale.origin.y}`,
                                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale.value})`,
                                width:`${overlaySize.width}px`, height:`${overlaySize.height}px`}"
                                class="loader__overlay">
                            
                            <div
                                data-anchor="scale"
                                data-origin="right bottom"
                                @mousedown.prevent="dropAnchor($event), setResizeOrigin($event), setScaleRevers(false, false)"
                                @mousemove.stop="defineMousePosition"
                                :style="{background: anchor.scale?'green':'red'}"
                                class="loader__overlay-corner"></div>
                            <div
                                data-anchor="scale"
                                data-origin="left bottom"
                                @mousedown.prevent="dropAnchor($event), setResizeOrigin($event), setScaleRevers(true, false)"
                                @mousemove="defineMousePosition"
                                :style="{background: anchor.scale?'green':'red'}"
                                class="loader__overlay-corner"></div>
                            <div
                                data-anchor="scale"
                                data-origin="left top"
                                @mousedown.prevent="dropAnchor($event), setResizeOrigin($event), setScaleRevers(true, true)"
                                @mousemove="defineMousePosition"
                                :style="{background: anchor.scale?'green':'red'}"
                                class="loader__overlay-corner"></div>
                            <div
                                data-anchor="scale"
                                data-origin="right top"
                                @mousedown.prevent="dropAnchor($event), setResizeOrigin($event), setScaleRevers(false, true)"
                                @mousemove="defineMousePosition"
                                :style="{background: anchor.scale?'green':'red'}"
                                class="loader__overlay-corner"></div>
                      </div>
                    </div>
                    <div class="loader__menu">
                        <button
                            @click="cropImg(img)"
                            style="color: black;"
                        > Test crop image </button>
                    </div>
                    
                    <!-- <canvas ref="canvasElement" width="200" height="200"></canvas>     -->
                </div>
        </div>
    </Teleport>
</ClientOnly>

</template>

<script setup>
import { useProfile } from '~~/store/profile'

    const props = defineProps({
        active: {
            type: [Boolean]
        }
    })
    const emit = defineEmits(['setNewFile'])
    const loader = ref(false)
    const overlay = ref(null)
    const wraper = ref(null)

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

    const img = ref(null)

    //overlay

        //overlay position 
    const overlayPosition = reactive({
        top: 50,
        left: 50,
    })

    const setOverlayPosition = () => {
        const elementEdges = {}
        const parent = wraper.value.getBoundingClientRect()
        const element = overlay.value.getBoundingClientRect()
        elementEdges.top = element.top - parent.top
        elementEdges.left = element.left - parent.left
        const withinArea = (min, max, value) => Math.min(Math.max(value, min), max)
        const limits = {left: [0, parent.width - element.width], top: [0, parent.height - element.height]}
        const keys = Object.keys(limits)
        keys.reduce((accum, current) => Object.assign(accum, {[current]: withinArea(...limits[current], elementEdges[current])}), overlayPosition)
    }

        // move overlay
    const translate = reactive({
        x: 0, 
        y: 0,
        limitsX: [0, 0],
        limitsY: [0, 0]
    })

    const setLimitsTranslate = () => {
        const {width: wraperW, height: wraperH, x: wraperX, y: wraperY} = wraper.value.getBoundingClientRect()
        const {width: overlayW, height: overlayH, x: overlayX, y: overlayY} = overlay.value.getBoundingClientRect()
        const limitsTranlate = {
            limitsX: [wraperX-overlayX, wraperX+(wraperW-overlayW)-overlayX],
            limitsY: [wraperY-overlayY, wraperY+(wraperH-overlayH)-overlayY]
        }
        Object.assign(translate, limitsTranlate)
    }    
    const moveArea = (position) => {
        const translateX = Math.min(Math.max(position.x-anchor.x, translate.limitsX[0]), translate.limitsX[1])
        const translateY = Math.min(Math.max(position.y-anchor.y, translate.limitsY[0]), translate.limitsY[1])
        Object.assign(translate, {x: translateX, y: translateY})
    }

        // overlay size
    const scale = reactive({
        value: 1,
        origin: {x: 'top', y: 'left'},
        reversX: false, 
        reversY: false,
        limits: [1, 1]
    })
    const overlaySize = reactive({
        width: 200,
        height: 200,
        maxWidth: 200,
        maxHeight: 200,
        minWidth: 200,
        minHeight: 200
    })
    const setScaleRevers = (reversX, reversY) => { scale.reversX = reversX; scale.reversY = reversY }
    const setResizeOrigin = (event) => {
        const origin = event.target.dataset.origin.split(' ')
        scale.origin.x = origin[0]
        scale.origin.y = origin[1]

    }
    const setMaxSize = () => {
        const container = wraper.value.getBoundingClientRect()
        const limitsX = {left: container.width+translate.limitsX[0], right: container.width-translate.limitsX[1]}
        const limitsY = {top: container.height+translate.limitsY[0], bottom: container.height-translate.limitsY[1]}
        overlaySize.maxWidth = limitsX[scale.origin.x]
        overlaySize.maxHeight = limitsY[scale.origin.y]
    }
    const setOverlaySize = () => {
        overlaySize.width *= scale.value
        overlaySize.height *= scale.value
        scale.value = 1
    }
    const resizeOverlay = (position) => {
        const pathX = anchor.x - position.x
        const pathY = anchor.y - position.y
        const maxScale = Math.min(overlaySize.maxWidth, overlaySize.maxHeight)/overlaySize.width
        const minScale = overlaySize.minWidth/overlaySize.width
        const scaleValueX = overlaySize.width/(scale.reversX?overlaySize.width+pathX:overlaySize.width-pathX)
        const scaleValueY = overlaySize.height/(scale.reversY?overlaySize.height+pathY:overlaySize.height-pathY)
        const scaleValue = Math.max(scaleValueX, scaleValueY)
        scale.value = Math.min(Math.max(minScale, scaleValue), maxScale)
    }
    
    //mouse position
    const anchor = reactive({
        translate: false,
        scale: false,
        x: 0,
        y: 0
    })
    const setAnchorPosition = (x, y) => {anchor.x = x; anchor.y = y}

    const dropAnchor = event => {
        anchor[event.target.dataset.anchor] = true
        setAnchorPosition(event.clientX, event.clientY)
        setLimitsTranslate()
        setMaxSize()
    }
    const raiseAnchor = () => {
        anchor.translate = false
        anchor.scale = false
        setOverlaySize()
        setOverlayPosition()
        translate.x = 0
        translate.y = 0
    }
    const mousePosition = reactive({
        x: 0,
        y: 0
    })
    const defineMousePosition = event => {
        if(anchor.translate || anchor.scale) {
            mousePosition.x = event.clientX
            mousePosition.y = event.clientY
        }
    }
    watch(mousePosition, (newVal, oldVal) => {
        anchor.translate && moveArea(newVal)
        anchor.scale && resizeOverlay(newVal)
    })

    const cropImg = async (img) => {
        const canva = document.createElement('canvas')
        canva.width = overlaySize.width
        canva.height = overlaySize.height
        const context = canva.getContext('2d')
        const drawingOptions = [img, - overlayPosition.left, -overlayPosition.top, img.offsetWidth, img.offsetHeight]
        context.drawImage(...drawingOptions);
        const croppedImg = await new Promise(resolve => canva.toBlob(blob => {
            blob.originalname = `ava_${useProfile().user.id}.png`
            resolve(blob)
        }))
        emit('setNewFile', {blob: croppedImg})
    }


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
<template>
    <form class="main-box main-box--white">
        
        <ButtonClose v-if="close"
            :topRight="[8, 8]" 
            @closeAction="close" />

        <div class="form-check-item main-box main-box--black">

            <label for="title" 
                class="form-check-item__label"
                v-text="'заголовок'"/>
            <p
                v-text="incorrectInput"
                class="form-check-item__message text-error"
                :class="{'text--invisible': correctTitle}"/>

            <input type="text"
                id="title"
                placeholder="Заголовок задачи"
                v-model="task.title"
                class="form-check-item__input" />

        </div>
        
        <div class="form-check-item main-box main-box--black">

            <label for="description" 
                v-text="'описание'"
                class="form-check-item__label"/>
            <p 
                v-text="incorrectInput"
                class="form-check-item__message text-error"
                :class="{'text--invisible': correctDescription}"/>

            <textarea id="description" cols="30" rows="10" 
                placeholder="Описание задачи"
                v-model="task.description"
                class="form-check-item__input" />

        </div>

        <div class="creator-menu">

            <button 
                v-html="menuBtn[0]"
                @click.prevent="reset"
                class="btn box-black"
            >
            </button>   
            <button
                v-html="menuBtn[1]"
                @click.prevent="createTask"
                class="btn box-black"
            > 
            </button>

        </div>

    </form>

</template>

<script setup>
    const props = defineProps({
        menuBtn: {
            type: [Array]
        },
        existingTask: {
            type: [Object]
        },
        close: {
            type: [Function]
        }
    })
    const emit = defineEmits(['create'])

    const task = reactive({
        title: '',
        description: ''
    })

    const reset = () => {
        task.title = ''
        task.description = ''
    }

    const incorrectInput = ref('не менее 10 символов')
    const checkToMinLength = useCheckToMinLength
    const correctTitle = computed(() => checkToMinLength(task.title, 10))
    const correctDescription = computed(() => checkToMinLength(task.description, 10))
    const checkCorrect = useFormInspector(correctTitle, correctDescription)



    const createTask = () => {
        if(checkCorrect()) {
            emit('create', task)
        } else {console.log('not correct')}
    }
    onMounted(() => {
        if(props.existingTask) {
            Object.assign(task, props.existingTask)
        }
    })
</script>

<style lang="scss" scoped>
    form {
        position: relative;
        display: grid;
        height: 100%;
        grid-template-rows: max-content 1fr max-content;
        grid-template-columns: 1fr;
        gap: 16px;

        & div:nth-of-type(2) {
            grid-template-rows: max-content 1fr;
        }

        @include standartFormItemsPorperty;

    }
    // .bnt-close {
    //     width: 30px;
    //     height: 30px;
    //     border-radius: 50%;
    //     position: absolute;
    //     top: 8px;
    //     right: 8px;
    //     background: {
    //         color: rgba(255,255,255);
    //         image: url(/img/btn/close-win.svg);
    //         size: 70%;
    //         repeat: no-repeat;
    //         position: center;
    //     }
    //     &:hover {
    //         transform: scale(1.1);
    //         transition-delay: 0.2s;
    //     }
    // }
    .creator-menu {
        display: flex;
        justify-content: space-between;
        margin: {
            bottom: 16px;
        }
        & button {
            color: rgba(255, 255, 255, 0.55);
            &:hover {
                color: #fff;
            }
        }
    }

</style>
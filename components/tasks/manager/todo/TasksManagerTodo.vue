<template>

<form class="main-box main-box--white">

        <div class="form-check-item main-box main-box--black">
            <label for="title" class="form-check-item__label">задание</label>
            <p 
                class="form-check-item__message text-error"
                :class="{'text--invisible': correctTitle}"
            > 
                {{ incorrectInput }}
            </p>
            <input id="title" type="text"
                v-model="clone.title"
                class="form-check-item__input"
            >
        </div>

        <div class="form-check-item main-box main-box--black">

            <label for="comment" class="form-check-item__label">комментарий</label>
            <p v-text="incorrectInput"
                class="form-check-item__message text-error"
                :class="{'text--invisible': correctComment}"
            /> 
            <textarea id="comment"
                v-model="clone.comment"
                class="form-check-item__input"> </textarea>
            
        </div>

        <TasksManagerTodoMenu 
            @sendTodo="send"
            :allowSend="formValid()"
        />
    </form>

</template>

<script setup>
    import { useTasks } from "@/store/tasks"
    import { useTodos } from "@/store/todos"
    
    const todos = useTodos()
    const tasks = useTasks()

    const props = defineProps({
        targetTodo: {
            type: [Object]
        },
        current: {
            type: [Number]
        }
    })
    const emit = defineEmits(['setCurrent'])

    const requiredKeys = reactive(['title', 'comment', 'destination', 'sender', 'taskId'])
    const keysGen = (keys) => target => target.id ? [`id`, ...keys] : keys
    const {clone, refreshClone} = useTargetPropsObject(props.targetTodo, keysGen(requiredKeys))
    watch(()=>props.targetTodo, (newVal, oldVal) => refreshClone(newVal))
    
    const incorrectInput = ref('не менее 10 символов')
    const checkToMinLength = useCheckToMinLength
    const correctTitle = computed(() => checkToMinLength(clone.value.title, 10))
    const correctComment = computed(() => checkToMinLength(clone.value.comment, 10))
    
    const {currentWorker: workerSelected} = inject('worker')
    const formValid = computed(() => useFormInspector( workerSelected, correctTitle,  correctComment))
    const send = async () => {
        const response = await todos.sendTodo(clone.value)
        if(response.id) {
            tasks.todosUpdated(response)
        }
    }
</script>

<style lang="scss" scoped>

    form {
        position: relative;
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr max-content;
        gap: 16px;

        & :nth-child(2) {
            grid-template-rows: max-content 1fr;
        }

        @include standartFormItemsPorperty;
    }
</style>
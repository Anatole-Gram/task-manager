<template>
    <div v-if="!taskEditor" 
        class="task-manager">

        <ul class="task-title box">  
            <TasksListItem 
                :menuBtns="['удалить', 'изменить']"
                :task="task"
                :selected="taskMenuToggle"
                @click="taskMenuToggle=!taskMenuToggle"
                @edit="taskEditor=true"
                @remove="rmTask"
            />
        </ul>
        
        <TasksManagerTodoSelector
            class="main-box main-box--white"
        />

        <div class="task-todo"> 
            <TasksManagerTodo 
                :targetTodo="todo"
                :current="currentWorker"
                @setCurrent="setCurrentWorker"
            />    
        </div>
    </div>

    <TasksManagerCreator v-else
        :menuBtn="['сбросить', 'сохранить']"
        :existingTask="useCloneByListsKeys(task, ['id', 'title', 'description'])"
        :close="()=>taskEditor = false"
        @create="saveChangeTask"
        @delete="rmTask"
    />
</template>

<script setup>
    import { useTasks } from "@/store/tasks"
    const tasks = useTasks()

    const props = defineProps({
        task: {
            type: [Object]
        }
    })
// task menu
    const taskMenuToggle = ref(false)
    const taskEditor = ref(false)
    const saveChangeTask = async task => {
        await tasks.updTask(task)
        taskEditor = false
    }

    const {current: currentWorker, setCurrent: setCurrentWorker} = useInteractiveList()
    provide('worker', {currentWorker, setCurrentWorker})

    const {current: currentTodo, setCurrent: setCurrentTodo} = useInteractiveList()
    provide('workerTodos', {currentTodo, setCurrentTodo})

    watch(currentWorker, (newVal, oldVal) => setCurrentTodo(0))

    //remove
    // const workerTodos = computed(() => tasks.currentTodosForUser(currentWorker.value))
    //remove
    const todo = computed(() =>  tasks.currentTodosById(currentTodo.value)||{title: '', comment: '', destination: currentWorker.value, sender: props.task.userId, taskId: props.task.id})

    const {removeTask, closeTaskManager} = inject('task')
    const rmTask =  () => {
        removeTask()
        closeTaskManager()
    }




    onMounted(async () => {
        await tasks.getTaskTodos(props.task.id)
    })
</script>

<style lang="scss" scoped>

</style>
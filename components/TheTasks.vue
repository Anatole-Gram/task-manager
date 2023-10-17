<template>
    <div class="content container">
        
        <TasksMenu 
            @createTask="openTaskManager(0)"
            @closeManager="taskManager=false"
            :managerCondition="taskManager"
        />

        <TasksManager v-if="taskManager" 
            :task="tasks.taskById(current)"
            :create="createTask"
        />

        <TasksList v-else 
            :list="list" 
            :current="current"
            :editTask="openTaskManager"
            @target="setCurrent"
        />
    </div>
</template>

<script setup>


import {useTasks} from '@/store/tasks';
    const tasks = useTasks()
    
    const list = computed(() => tasks.list.fromUser)
    watch(list, (newVal, oldVal) => {
        return newVal
    })

    const {current, setCurrent} = useInteractiveList()
    
    const taskManager = ref(false)
    const openTaskManager = (id) => {
        current.value = id
        taskManager.value = true 
    }
    const closeTaskManager = () => {
        current.value = 0
        taskManager.value = false
    }

    const createTask = async (task) => {
        const created = await tasks.addTask(localStorage.getItem("userId"), task)
        openTaskManager(created)
    }

    const removeTask = async () => { if (await tasks.removeTask(current.value)) { setCurrent(0); } }

    provide('task', {current, closeTaskManager, setCurrent, removeTask, createTask})

    onMounted(() => {
        tasks.getTasks(localStorage.getItem('userId'))
    })
</script>
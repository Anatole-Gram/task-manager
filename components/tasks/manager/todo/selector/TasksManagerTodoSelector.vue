<template>
    <div class="task-todos box">

        <TasksManagerTodoSelectorList
            :list="tasks.currentWorkers"
            :current="currentWorker"
            @setCurrent="setCurrentWorker"
        >
            <template #listHeader>над задачей раболтают</template>
        </TasksManagerTodoSelectorList>

        <TasksManagerTodoSelectorList
            :list="workerTodos"
            :current="currentTodo"
            @setCurrent="setCurrentTodo"
        >
            <template #listHeader>задания пользователю</template>
        </TasksManagerTodoSelectorList>

    </div>
</template>


<script setup>
import { useTasks } from "@/store/tasks"
import { useUsers } from "@/store/users"

//added 
    const users = useUsers()
//adeed

    //TasksListWorkers
    const tasks = useTasks()
    const {currentWorker, setCurrentWorker} = inject('worker') 

    // added
    const workersList = computed(()=> [])
    //

    //TaskListTodos
    const {currentTodo, setCurrentTodo} = inject('workerTodos')
    const workerTodos = computed(() => tasks.currentTodosForUser(currentWorker.value))

</script>

<style lang="scss" scoped>
.task-todos {
    display: grid;
    grid-template-rows: 1fr 1fr;
    gap: 8px;

}

li {
    min-height: 24px;
}


</style>
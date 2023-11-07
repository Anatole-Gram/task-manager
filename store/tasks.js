import { defineStore } from "pinia";
import { getJson } from "./storeApi/actions";


export const useTasks = defineStore('tasks', {
    state: () => ({
        list: {fromUser: []},
        currentTodos: [],
        currentWorkers: new Set(),
        lastUpd: {id: 0, comment: '', createdAt: '', destination: 0, sender: 0, status: false, taskId: 0, title: '', updatedAt: ''},
        editor: false,
        creator: false,
    }),
    actions: {
        async getTasks(id) {
            const response = await fetch(`${new URL(useApiUrl())}tasks?id=${id}&last=${this.lastUpd.updatedAt}`, { method: "GET" });
            if (response.status !== 304) {
                const data = await response.json()
                this.list.fromUser = data.from
            }
        },
        async addTask(id, task) {
            const data = {
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
            }
            const response = await getJson(`tasks/add-task?id=${id}`, data)
            this.list.fromUser.push(response)
            this.lastUpd = response
            
            return response.id
        },
        async updTask(task) {
            const data = {
                body: JSON.stringify(task),
                headers: {'Content-Type' : 'application/json'},
                method: "PUT"
            }
            await getJson(`tasks/updt-task?id=${task.id}`, data);
        },
        async removeTask(id) {
            const response = await fetch(new URL(`${useApiUrl()}tasks/rm-task?id=${id}`), {method: "DELETE"})
            if (response.ok) {
                useListItemRmById(id, this.list.fromUser)
                this.creator = false
                this.editor = false
            }
            return response.ok
        },
        async getTaskTodos(id) {
            const data = await getJson(`tasks/task-todos?id=${id}`, { method: "GET" })
            if (data.from.length) {
            this.currentTodos = data.taskTodos
            this.currentWorkers = new Set(data.from)
            } else { 
                this.currentWorkers.clear() 
            }
        },
        todosUpdated(todo) {
            // const modified = this.currentTodos.find(item => item.id === todo.id)
            const modified = getById(this.currentTodos, todo.id) 
            if(modified) {
                Object.assign(modified, todo)
            } else this.currentTodos.push(todo)
            this.currentWorkers.add(todo.destination)
        },
        async rmTodo(id, taskId, destination) {
            const response = await fetch(new URL(`${useApiUrl()}todos/rm-todo?id=${id}&task=${taskId}&destination=${destination}`), {method: "DELETE"})
            if (response.ok) {
                this.currentTodos.splice(this.currentTodos.findIndex(todo => todo.id === id), 1)
                if (response.status === 205) {
                    this.currentWorkers.delete(destination)
                }
            }
        }

       
    },

    getters: {
        taskById() {
            return taskId => {
                if (taskId) {
                    return this.list.fromUser.find(task => task.id === taskId)
                } else return {title: '', description: ''}
            }
        },
        currentTodosForUser() {
            return userId => this.currentTodos.filter(item => item.destination === userId)
        },
        currentTodosById() {
            return todoId => this.currentTodos.find(todo => todo.id === todoId)
        }
    }
})
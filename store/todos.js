import { defineStore } from "pinia";
import { getJson, findById } from "./storeApi/actions"
import { sliderStates, sliderActions} from "./modules/slider"
import { filterStates, filterActions } from "./modules/filter"
import { useFilters} from "./filters";




export const useTodos = defineStore('todos',{
    state: () => ({
        list: {forUser:[], fromUser: []},
        lastUpd: { comment: '', createdAt: '', destination: 0, id: 0, sender: 0, status: false, taskId: 0, title: '', updatedAt: '' },
        ...filterStates,
        ...sliderStates
    }),
    actions: {
        async getTodos(id) {
            const response = await getJson(`todos?id=${id}&last=${this.lastUpd.updatedAt}`, {method: "GET"})
            if(response.status !== 304) {
                this.list = { forUser: response.for, fromUser: response.from }
                this.lastUpd = response.lastUpd
                console.log(`обновился лист`)
            } else console.log('обновлений нет')
        },
        // Изменить или добавить задание 
        async sendTodo(todo) {
            const id = todo.id ? todo.id : todo.taskId
            const data = {
                body: JSON.stringify(todo),
                headers: {'Content-Type': 'application/json'},
                method: todo.id ? "PUT" : "POST"
            }
            const response = await getJson(`todos/send-todo?id=${id}`, data)
            return response
        },
        updStatus(id) {
            getJson(`todos/upd-status?id=${id}`, { method: "PUT" })
                .then(status => { findById(this.list.forUser, id).status = status})
                
        },
        ...filterActions,
        ...sliderActions
    },
    getters: {         
        filteredList() {
            let res = []
            if(this.filteredByUsers.length!==0) {
                if(useFilters().condition !== null) {
                    res = this.filteredByUsers.filter(todo => (todo.status === useFilters().condition))
                } else  res = this.filteredByUsers 
            }
            return res
        }
    }
})
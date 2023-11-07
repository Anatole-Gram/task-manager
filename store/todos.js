import { defineStore } from "pinia";
import { getJson } from "./storeApi/actions"
import { sliderStates, sliderActions} from "./modules/slider"




export const useTodos = defineStore('todos',{
    state: () => ({
        list: {forUser:[], fromUser: []},
        lastUpd: { comment: '', createdAt: '', destination: 0, id: 0, sender: 0, status: false, taskId: 0, title: '', updatedAt: '' },
        selectedList: [],
        condition: false,
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
        
        setCondition(payload) {
            this.condition = payload.prop
        },
        filterForSelected(array) {
            this.selectedList = this.list.forUser.filter(todo => array.has(todo.sender))
        },
        async updStatus(id) {
            await fetch(`${useApiUrl()}todos/upd-status?id=${id}`, { method: "PUT" })
        },
        resetSelected() {
            this.selectedList = []
        },
        ...sliderActions
    },
    getters: {
        filteredList() {
            let res = []
            if(this.selectedList.length) {
                if(this.condition !== null) {
                    res = this.selectedList.filter(todo => (todo.status === this.condition))
                } else  res = this.selectedList 
            }
            return res
        }
    }
})
import { useUsers } from "@/store/users";
import { useTodos } from "@/store/todos";
import { useFilters } from "~~/store/filters";

export const useTodoSenderIdentifier = () => { 
    const users = useUsers()

    const sendersSet = reactive(new Set())
    const senders = reactive({})
    const identify = sender => {
        if (!sendersSet.has(sender)) {
            const user = users.getUserById(sender)
            senders[sender] = {name: `${user.name} ${user.surname}`, position: user.position}
            sendersSet.add(sender)
        }
        return senders[sender]
    }
    
    return {identify}
}



export const useTodoInit = async (id) => {
    const todos = useTodos()
    await todos.getTodos(id)
    todos.filterByUsers(useFilters().selected)
}


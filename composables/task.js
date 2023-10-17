import { useTasks } from "@/store/tasks";

export const useTasksInit = async (id) => {
    const tasks = useTasks()
    await tasks.getTasks(id)
}
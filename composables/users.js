import { useUsers } from "@/store/users";

export const useUserIdentifier = () => { 
    const users = useUsers()

    const userSet = new Set()
    const usersDict = {}
    const identify = userId => {
        if (!userSet.has(userId)) {
            const user = users.getUserById(userId)
            usersDict[userId] = {name: `${user.name} ${user.surname}`, position: user.position}
            userSet.add(userId)
        } 
        return usersDict[userId]
    }
    
    return identify
}




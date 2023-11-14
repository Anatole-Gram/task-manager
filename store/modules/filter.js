
import { useFilters } from "../filters";

const filterStates = {
    filteredByUsers: []
}

const filterActions = {
    filterByUsers(set) {
        this.filteredByUsers = this.list.forUser?.filter(item => set.has(item.sender)) || this.list.filter(item => set.has(item.id))
    },
    resetFilteredByUsers() { this.filteredByUsers = []; useFilters().$reset()}
}

export {filterStates, filterActions}
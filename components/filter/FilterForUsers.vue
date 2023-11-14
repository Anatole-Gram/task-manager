<template>
<div class="filter-wraper">
    <button @click="showMenu=!showMenu" class="menu__btn">список пользоватей</button>
    <button @click="filterAction" class="menu__btn"> {{ `${selectedIsFull ? 'сбросить' : 'выбрать всех'}`}} </button>

    <transition name="modal-standart">
    <div v-if="showMenu" class="filter-users">
        <SearchByName
            @startSearch="filterListByName"
            @update:searchState="updSearchByName"
            placeholder="Пользователь"/>
        <ul 
            :style="{animationDelay: 0.25+'s'}"
            class="box-black">
            <li v-for="(user, index) in list" :key="user.id"
                :data-index="index">
                <label :for="`user${user.id}`"
                    :class="{'selected-item': selected.has(user.id)}"
                    class="menu__btn"> 
                        {{ user.name }} {{ user.surname }}
                </label>
                <input type="checkbox" :id="`user${user.id}`"
                    @click="select(user.id)">
            </li>
        </ul>
    </div>
    </transition>
</div>
</template>

<script setup>
import { useUsers } from "@/store/users";
import { useFilters } from "@/store/filters";
import { storeToRefs } from "pinia";

const users = useUsers()
const filter = useFilters()

const emit = defineEmits(["filterForSelected"])

const { searchByName, selected, selectedIsFull } = storeToRefs(filter)
const { updSearchByName, select, setLimitForSelection, determinateSelectedIsFull, resetSelected, selectAll } = filter

const listBySearch = ref([])
const showMenu = ref(false)

watch( () => showMenu.value, show => !show && updSearchByName(false))
watch(selected.value, (newVal, oldVal) => { emit('filterForSelected', newVal); determinateSelectedIsFull() })

const filterAction = () => { selectedIsFull.value ? resetSelected() : selectAll(list.value) }
const filterListByName = (exp) => { listBySearch.value = users.list.filter(user=> exp.test(user.name||user.surname)) }

const list = computed(() => searchByName.value ? listBySearch.value : users.list)
watch(list, (newVal, oldVal) => {setLimitForSelection(newVal.length)})

onUnmounted(() => {
        // reset the filter by users
    // users.resetSelected()
        //reset fiters
    // filter.$reset()
    })
</script>

<style lang="scss" scoped>
    .filter-users {
        position: absolute;
        width: calc(100% - 16px);
        top: 35px;
        z-index: 7;
        
            & input {
                width: 100%;
                height: 30px;
                padding: 0 10px;
                margin-bottom: 2px;
                border: 1px solid #fffefb;
                box-shadow: 1px -1px 4px 1px rgba(100, 100, 100, 0.4), -1px 1px 4px 1px rgba(100, 100, 100, 0.4);
                color: #fff;
                border-radius: 4px 4px 0 0;
                background: $mainBlack;

            } 

    }
    ul {
        min-height: 30px;
        padding: 2px 10px;
        border-radius: 0 0 4px 4px;
        background-color: $mainBlack;
        & li {
            padding: {
                bottom: 5px;
            }
        }
        & label {
            color: rgba(255, 255, 255, 0.55);
            text-transform: lowercase;
            font: {
                family: 'Verdana';
                size: 12px;
            }
            &:hover {
                color: #fff;
                cursor: pointer;
            }
        }
        & input {
            display: none;
        }
    }
    .selected-item {
        color: rgba(0, 255, 170, .5);
        &:hover {
            color: rgba(255, 0, 0, .5);
        }
    }

</style>
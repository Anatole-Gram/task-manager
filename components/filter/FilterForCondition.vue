<template>
    <!-- <div class="filter-wraper">
        <button @click="showMenu=!showMenu"> статус: {{ selected.name }} </button>
        <ul v-show="showMenu" class="box-black">
            <li v-for="(val, index) in condition.name" :key="index">
                <label :for="`condition${val}`"
                    :class="{'selected-item': index===position}">
                        {{ val }}
                </label>
                <input type="radio" name="condition" 
                    :value="index" 
                    v-model="position" 
                    :id="`condition${val}`">
            </li>
        </ul>
    </div> -->
    <div class="filter-wraper">
        <button @click="showMenu=!showMenu"> статус: {{ conditionMap.get(condition) }} </button>
        <ul v-show="showMenu" class="box-black">
            <li v-for="(val, index) in conditionMap.entries()" :key="index">
                <label :for="`condition${val[0]}`"
                    :class="{'selected-item': val[0]===condition}">
                        {{ val[1] }}
                </label>
                <input type="radio" name="condition" 
                    :value="val[0]" 
                    @change="setCondition(val[0])"
                    :id="`condition${val[0]}`">
            </li>
        </ul>
    </div>
</template>

<script setup>
import { storeToRefs } from "pinia"
import {useFilters} from "@/store/filters"

    const props = defineProps({
        conditionMap: {
            type: [Map]
        }
    })

    const filter =  useFilters()

    const showMenu = ref(false)

    const { condition } = storeToRefs(filter)
    const setCondition = condition => { filter.setCondition(condition); showMenu.value = false}


    
</script>

<style lang="scss" scoped>
    ul {
        position: absolute;
        width: calc(100% - 16px);
        top: 35px;
        z-index: 7;
        padding: 2px 20px;
        border-radius: 0 0 4px 4px;
        background-color: #212529;
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
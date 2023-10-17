<template>
    <div class="filter-wraper">
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
    </div>
</template>

<script setup>
    const props = defineProps({
        condition: {
            type: [Object]
        }
    })
    const emit = defineEmits(['returnCondition'])
    const showMenu = ref(true)
    const position = ref(0)

    const selected = computed(() => {
        showMenu.value = false
        emit('returnCondition', props.condition.prop[position.value])
        return { name: props.condition.name[position.value], prop: props.condition.prop[position.value] }
    })
    
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
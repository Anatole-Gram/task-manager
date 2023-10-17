<template>
    <div class="main-box">
        <h4> <slot name="listHeader"></slot> </h4>
        <ul v-if="list.constructor===Set">
            <TasksListWorkersItem v-for="item in list" :key="item"
                :worker="defineWorker(item)"
                :selected="current===item"
                @click="emit('setCurrent', item)"
            />
        </ul>

        <ul v-else>
            <TasksListTodosItem v-for="item in list" :key="item.id" 
                :todo="item"
                :selected="current===item.id"
                @click="emit('setCurrent', item.id)"
            />
        </ul>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: {
            type: [Array, Set]

        },
        current: {
            type: [Number]
        }
    })

    //for workers
    const defineWorker = useUserIdentifier()
    //
    const emit = defineEmits(['setCurrent'])



</script>



<style lang="scss" scoped>
    h4 {
        text-align: center;
        font: {
            family: 'Roboto';
            size: .9em;
        }
    }

    diV {
        overflow: auto;

        display: grid;
        grid-template-rows: auto 24px 1fr 24px;
        grid-template-columns: 1fr;
        gap: 8px;
        grid-template-areas: 'listHeader' 'borderUp' 'list' 'borderBottom';
        & h4 {grid-area: listHeader;};
        & ul {  

            grid-area: list;
            overflow-y: auto;
            &::-webkit-scrollbar{ 
                width: 5px;
                background: #000;
                border-radius: 4px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background: rgba(0, 255, 170, 0.5);
                
            }

        };
        &::before {
            content: '';
            display: block;
            grid-area: borderUp;
            clip-path: polygon(0 100%, 10% 0, 90% 0, 100% 100%, 94% 100%, 87% 35%, 13% 35%, 6% 100%);

            background: linear-gradient(45deg, #212529, rgba(33, 37, 41, 0.9) 60%, rgba(33, 37, 41, 0.75));
        }
        &::after {
            content: '';
            display: block;
            grid-area: borderBottom;
            clip-path: polygon(0 100%, 10% 0, 90% 0, 100% 100%, 94% 100%, 87% 35%, 13% 35%, 6% 100%);
            transform: rotate(180deg);
            
            background: linear-gradient(45deg, #212529, rgba(33, 37, 41, 0.9) 60%, rgba(33, 37, 41, 0.75));
        }
    }
</style>
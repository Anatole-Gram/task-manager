<template>
    <div class="content__main">
        <div class="todo box">
            <TodosCurrentInfo :userId="item.sender" :date="item.createdAt" />
            <TodosCurrentTodo :title="item.title" :comment="item.comment" />
            <button 
                @click="emit('updStatus', item.id), item.status=!item.status"
                class="todo__status"> 
                    {{ item.status?`завершено`:`не завершено` }} 
                <ButtonGradientOverlay :tracked="item.status" />
            </button>
        </div>
    </div>
</template>

<script setup> 
    const props = defineProps({
        item: {
            type: [Object]
        },
    })
    const emit = defineEmits(['updStatus'])
</script>

<style lang="scss" scoped>
    .todo {
        height: 100%;
        display: flex;
        flex-direction: column;
        font: {
            family: 'Comforta';
        }

        &__status {
            width: 200px;
            height: 36px;
            position: relative;
            align-self: center;
            border-radius: 4px;
            margin: {
                bottom: 16px;
            }
            color: rgba(255, 255, 255, 0.55);
            background: {
                color: #212529;
            }
            &:hover {
                color: #fff;
            }
            box-shadow: 2px 2px 8px 2px $mainBlack;
        }
    }
    p>span {
        font: {
            weight: 600;
        }
    }
    section {
        padding: 8px;
        margin: { 
            bottom: 16px;
        }
    }
</style>
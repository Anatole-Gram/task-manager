<template>
    <li 
        :class="{'item-active': selected}"
        class="box list__item">
            <div class="todo-item__info">
                <h5> {{ sender.name }} </h5>
                <p> {{ shortTitle }} </p>
            </div>

            <div class="list__item-menu box-black" v-show="selected">
                <button @click="emit('sliderReverse')">открыть</button>
            </div>

            <button 
                @click.stop="emit('reverseStatus')"
                class="todo-item__status"> 
                    {{ todo.status ? `завершено` : `не завершено` }} 
            </button>
    </li>
</template>

<script setup>
    const props = defineProps({
        todo: {
            type: [Object]
        },
        sender: {
            type: [Object]
        },
        selected: {
            type: [Boolean]
        }
    })

    const emit = defineEmits(['sliderReverse', 'reverseStatus'])
    const shortTitle = useTrimLine(props.todo.title, 35)

    
</script>

<style lang="scss" scoped>
    .todo-item {

        &__info {
            font: {
                family: "Comforta";
            }
            & h5 {
                margin: {
                    bottom: 4px;
                }
                font: {
                    size: 15px;
                }
            }
            & p {
                font: {
                    size: 14px;
                }
            }
        }
        &__status {
            height: 28px;
            width: 120px;
            border: 1px solid #212529;
            border-radius: 4px;
            color: #212529;
            font: {
                family: 'Verdana';
                size: 13px;
            }
            &:hover {
                color: #fff !important;
            }
        }        
    }
    .item-active {
        background-color: #212529;
        border: 1px solid #fffefb;
        box-shadow: 1px -1px 4px 1px rgb(100 100 100 / 40%), -1px 1px 4px 1px rgb(100 100 100 / 40%);
        color: #fff;
        & > button {
            color: rgba(255, 255, 255, 0.55);
            border: 1px solid #fff;
        }
    }
    .list__item {
        &:hover > .todo-item__status {
            color: rgba(255, 255, 255, 0.55);
            border: 1px solid #fff;
        }
    }
    @include activeListItemSetting(46px, 150px)
</style>
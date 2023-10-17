<template>
    <li class="box list__item"
        :class="{'item-active': selected}"
        >
        <h4> {{ shortTitle }} </h4>

        <div class="list__item-menu box-black" v-show="selected">
            <button @click.stop="emit('remove')" v-html="menuBtns[0]"></button>
            <button @click.stop="emit('edit')" v-html="menuBtns[1]"></button>
        </div>

        <ul>
            <li>заданий: 10</li>
        </ul>
    </li>
</template>

<script setup>
    const props = defineProps({
        task: {
            type: [Object]
        },
        selected: {
            type: [Boolean]
        },
        menuBtns: {
            type: [Array]
        }
    })
    const emit = defineEmits(['edit', 'remove'])

    const shortTitle = useTrimLine(props.task.title, 45)

</script>

<style lang="scss" scoped>

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
    @include activeListItemSetting(46px, 150px)
</style>
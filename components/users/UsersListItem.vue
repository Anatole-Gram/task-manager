<template>

    <li class="box list__item" 
        :class="{'item-active': selected}">
        <h5> {{ user.name }} {{ user.surname }}</h5>

        <div class="list__item-menu box-black" v-show="selected">
                <button @click="emit('removeFromList', user.id)">скрыть</button>
                <button @click="emit('sliderReverse')">открыть</button>
        </div>
        <span> {{ user.position }} </span>
    </li>


</template>

<script setup>
    const props = defineProps({
        user: {
            type: [Object]
        },
        selected: {
            type: [Boolean]
        },
    }) 
    const emit = defineEmits(['sliderReverse', 'removeFromList'])

</script>

<style lang="scss" scoped>
    li {


        & h5 {
            text-transform: capitalize;
            font: {
                family: 'Comforta';
                size: 15px;
                weght: 500;
            }
        }
        & span {
            text-transform: lowercase;
            font: {
                family: 'Verdana';
                size: 14px;
                weight: 500;
            }
        }
    }
    .item-active {
        background-color: #212529;
        color: #fff;
        border: 1px solid #fffefb;
        box-shadow: 1px -1px 4px 1px rgb(100 100 100 / 40%), -1px 1px 4px 1px rgb(100 100 100 / 40%);
    }
    @include activeListItemSetting(46px, 150px)
</style>
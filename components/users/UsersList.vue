<template>
    <div class="content__main">
        <ul class="list users-list box">
            <transition-group 
                type="animation"
                name="interactive-list"
                @enter="onEnter"
                @beforeEnter="onBeforeEnter"
                @beforeLeave="onBeforeLeave">
                <UsersListItem v-for="(user, index) in list" :key="user.id" 
                    :data-index="index"
                    :user="user" 
                    :selected="current===user.id"
                    @sliderReverse="sliderFrom(index)"
                    @removeFromList=" rmFromList(user.id)"
                    @click="setCurrent(user.id)" />
                
            </transition-group>
        </ul>
    </div>
</template>

<script setup>
    const props = defineProps({
        list: {
            type: [Array]
        },
        sliderFrom: {
            type: [Function]
        },
        rmFromList: {
            type: [Function]
        }
    })
    const current = ref(0)
    const setCurrent = (id) => {
        id === current.value ? current.value = 0 : current.value = id
    }

    // animation for list item
    let {counterDelays, delayMult, onBeforeEnter, onEnter, onBeforeLeave} = useAnimationDelayFromList(0.03, ()=> props.list.length)


</script>
    
<style lang="scss" scoped>
    .position {
        text-transform: lowercase;
        font: {
            family: 'Verdana';
            size: 14px;
            weight: 500;
        }
    }
</style>
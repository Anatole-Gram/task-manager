<template>
     <section class="box">
        <div>
            <span>Задание:</span>
            <p> {{ title }} </p>
        </div>
        <div>
            <span>Комментарий:</span>
            <p> {{ comment }} </p>
        </div>
   </section>
</template>

<script setup> 
    const props = defineProps({
        title: {
            type: [String]
        },
        comment: {
            type: [String]
        }
    })


</script>

<style lang="scss" scoped>
    section {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        & div {
            &:nth-child(1) {
                @include mainOutputContainer(36px, 36px);
                margin-bottom: 16px;
            }
            &:nth-child(2) {
                @include mainOutputContainer(36px, 1fr);
                height: 100%;
            }
            @include blackBox;
            & span {
                display: flex;
                align-items: center;
                grid-area: title;
                @include rowBevel($rowWhite);
                border-radius: 4px 0 0 0;
                padding: 0 8px;
            }
            & p {
                grid-area: output;
                background: $rowWhite;
                border-radius: 0 4px 4px 4px;
                padding: 8px;
            }


        }

    }

</style>
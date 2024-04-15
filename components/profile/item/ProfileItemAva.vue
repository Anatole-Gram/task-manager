<template>
    <div class="box">
        <img :src="url" ref="avatar" width="200" height="200" alt="user photo"
            @error="imgErr($event, '/img/img-nf.jpg')">
        <LoaderImage :active="editor" @setNewFile="setAvaBlob"></LoaderImage>
    </div>
</template>

<script setup>

    const props = defineProps({
        url: {
            type: [String]
        },
        editor: {
            type: [Boolean]
        }
    })
    const avatar = ref(null)
    const {setAvaBlob} = inject('profile')
    const imgErr = useImgNoLoad
</script>

<style lang="scss" scoped>

    //variables
    $ava-width: 200px;
    $ava-height: 200px;
    $ava-margin: 16px;

    .box {
        display: flex;
        flex-direction: column;
        position: relative;
        margin: 0 8px 0 0;

        &::before {
            content: '';
            display: block;
            width: $ava-width;
            height: $ava-height;
            position: absolute;
            left: $ava-margin;
            top: $ava-margin;
            clip-path: polygon(0% 0%,100% 0,100% 8%,75% 8%,70% 5%,30% 5%,30% 5%,25% 8%,0 8%,0% 0%, 0 92%,25% 92%,30% 95%,70% 95%,75% 92%,100% 92%,100% 100%,0% 100%,0% 92%);
            border-radius: 3px;
            // background-color: rgba(0,25,25,.25);
            background: linear-gradient(45deg, rgba(33,37,41,1) 0%, rgba(33,37,41,0.9) 60%, rgba(33,37,41,0.75) 100%);
        }
        & > img {
            width: $ava-width;
            height: $ava-height;
            margin: $ava-margin;
        }
    }


</style>
<template>
    <div class="profile-ava">
        <div class="profile-ava__wraper">
            <img :src="url" ref="avatar" width="200" height="200" alt="user photo"
            class="profile-ava__img"
            @error="imgErr($event, '/img/img-nf.jpg')">
        </div>

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
    // .box {
    //     display: flex;
    //     flex-direction: column;
    //     height: fit-content;
    //     position: relative;
    // }


</style>
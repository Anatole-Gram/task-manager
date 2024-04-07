
<template>

<ContainerMainContent
    :loader="loader">
    <ProfileMenu @editorToggle="editor=!editor" :editor="editor" :updateAllowed="updateAllowed" @update="()=> {updateProfile(draftProfile); editor=false}"/>
    <ProfileInfo v-if="!editor" :user="user"/>
    <ProfileEditor v-else />
</ContainerMainContent>

</template>

<script setup>
import { useProfile } from '@/store/profile';
import { storeToRefs } from 'pinia';
    const profile = useProfile()
    
    const {user} = storeToRefs(profile)

    // Menu states
    const editor = ref(false)


    const updateAllowed = ref(false)
    const setUpdateAllowed = state => updateAllowed.value = state
    // 
    
    //To change profile data
    const draftProfile = reactive({})
    const updateDraftProperty = (key, value) => {
        draftProfile[key] = value;
        setUpdateAllowed(true)
    }
    let uploadImgToServer = ref(null)
    const setUploadImgFunction = (fn) => uploadImgToServer.value = fn
    watch(() => uploadImgToServer.value, (newVal, oldVal) => newVal())

    provide('draftProfile', {draftProfile, updateDraftProperty})

    watch(() => editor.value, active => {if(active) Object.assign(draftProfile, useCloneByListsKeys(profile.user, ['name', 'surname', 'position', 'phone', 'mail', 'note', 'img']))})
    //

    const {updateProfile: updProfile} = profile
    const updateProfile = async (modification=draftProfile) => {
        if(uploadImgToServer) {
            await uploadImgToServer()
        }
        await updProfile(modification)
    } 

    provide('profile', {updateProfile, setUpdateAllowed, setUploadImgFunction})

    const loader = computed(() => !Boolean(profile.user.id))

</script>

<style lang="scss">

</style>
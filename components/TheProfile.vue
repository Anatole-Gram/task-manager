
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

    const avaBlob = ref(null)
    const setAvaBlob = blob => avaBlob.value = blob
    const uploadImgToServer = async () => {
        const data = new FormData()
        data.append('img', avaBlob.value)
        await fetch(`${useApiUrl()}profile/updt-ava?id=${profile.user.id}`, {
            method: "POST",
            body: data
        })
            .then(response => response.json())
            .then(data => updateDraftProperty('img', data.path))
            .catch(err => alert(err))
    }

    provide('draftProfile', {draftProfile, updateDraftProperty})

    watch(() => editor.value, active => {if(active) Object.assign(draftProfile, useCloneByListsKeys(profile.user, ['name', 'surname', 'position', 'phone', 'mail', 'note', 'img']))})
    //

    const {updateProfile: updProfile} = profile
    const updateProfile = async (modification=draftProfile) => {
        avaBlob.value && await uploadImgToServer()
        await updProfile(modification)
    }

    provide('profile', {updateProfile, setUpdateAllowed, setAvaBlob, avaBlob})

    const loader = computed(() => !Boolean(profile.user.id))

</script>

<style lang="scss">

</style>
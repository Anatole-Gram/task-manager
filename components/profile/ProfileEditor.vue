<template>
    <div class="content__main">
        <div class="profile">
            <section class="profile__main-edit">
                <ProfileItemAva :url="user.img" :editor="true"/>
                <ProfileItemForm :user="user"/>
            </section>
            
            <section class="profile__note box">
                <ProfileItemNote :note="user.note" :editor-state="true" @inInput="updateDraftProperty" />
            </section>
            
        </div>
    </div>
</template>
<script setup>

    // use to update draft profile
    const {draftProfile: user, updateDraftProperty} = inject('draftProfile')


    const correctName = computed(() => useCheckToMinLength(user.name, 2))
    const correctSurname = computed(() => useCheckToMinLength(user.surname, 2))
    const correctPosition = computed(() => useCheckToMinLength(user.position, 5))
    const correctPhone = computed(()=>{
        const correct = useFoneNumberEditor(user.phone)
        correct&&updateDraftProperty('phone', correct)
        return correct
    })
    const correctMail = computed(() => useCheckToMinLength(user.mail, 5))

    const { setUpdateAllowed } = inject('profile')

    const checkCorrect = useFormInspector(correctName, correctSurname, correctPosition, correctPhone, correctMail)

    watch(() => user, (newVal, oldVal) => {
        setUpdateAllowed(checkCorrect())
    }, {deep: true})

    onBeforeUnmount(() => {
        setUpdateAllowed(false)
    })
</script>

<style lang="scss" scoped>

    .img-wraper {
        display: flex;
        flex-direction: column;
        padding: 16px 10px;
        margin: {
            right: 8px;
        }

        & button {
            height: 36px;
            margin-top: 16px;
            color: rgba(255, 255, 255, 0.55);
            border-radius: 4px;
            &:hover {
                color: #fff;
            }
        }
    }
    
</style>
<template>
    <div class="content__main">
        <div class="profile">
            <section>
                <ProfileItemAva :url="`${useUrl()+user.img}`"  :editor="false"/>
                <ProfileItemInfo :user="user" :editor-state="false" />
            </section>

            <section>
                <ProfileItemAdditional />
            </section>

            <section>
                <ProfileItemNote :note="user.note" :editor-state="false" />    
            </section>
            
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        user: {
            type: [Object]
        }
    })
</script>

<style lang="scss">
// Tablet
@media screen and (min-width: 768px) {
    .profile {
        height: 100%;
        display: grid;
        grid-template-rows: 1fr 1fr 2fr;
        grid-template-columns: 1fr;
        grid-template-areas: "user-info"
            "additional"
            "note";
        & section {
            &:nth-child(1) {
                grid-area: user-info;
                display: grid;
                grid-template-rows: 1fr;
                grid-template-columns: 316px 1fr;
                grid-template-areas: "ava info";
                gap: 8px;
            }
            &:nth-child(2) {
                display: flex;
                flex-direction: column;
                justify-content: center;
                grid-area: additional;
                margin: {
                    bottom: 16px;
                };
            }
            &:nth-child(3) {
                grid-area: note;
                display: flex;
                align-items: center;
            }
            
        }
        //profile-ava
        &-ava{
            grid-area: ava;
            padding: 0;
            //profile-ava__wraper
            &__wraper {

            }
            //profile-ava__img
            &__img {
                width: 300px;
                height: 300px;
            }
        }
        //profile-info
        &-info {
            grid-area: info;
            padding: 0;

            //profile-info__list
            &__list {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: {
                    top: 8%;
                    bottom: 8%;
                };

                & li {
                    height: 60px;
                }
            }
        }
        //profile-additional
        &-additional {
            & span {
                font: {
                    variant: small-caps;
                }
            }
        }
        //profile-note
        &-note {
            height: 70%;
            grid-template-rows: 36px 1fr 36px;
        }
    }
}
</style>
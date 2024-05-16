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
        grid-template-rows: 300px 200px 1fr;
        grid-template-columns: 1fr;
        grid-template-areas: "user-info"
            "additional"
            "note";
        & section {
            //profile-info block
            &:nth-child(1) {
                grid-area: user-info;
                display: grid;
                grid-template-rows: 1fr;
                grid-template-columns: 316px 1fr;
                grid-template-areas: "ava info";
                gap: 8px;
            }
            //profile-additional block
            &:nth-child(2) {
                display: flex;
                flex-direction: column;
                justify-content: center;
                grid-area: additional;
                margin: {
                    bottom: 16px;
                };
            }
            //profile-note block
            &:nth-child(3) {
                grid-area: note;
                display: flex;
                align-items: center;
            }
            
        }
    //profile info block 
        //variables:
        $blocksHeight: 250px;
        //profile-ava
        &-ava{
            grid-area: ava;
            padding: 0;
            align-items: center;
            //profile-ava__wraper
            &__wraper {
                height: fit-content;
            }
            //profile-ava__img
            &__img {
                width: $blocksHeight;
                height: $blocksHeight;
            }
        }
        //profile-info
        &-info {
            grid-area: info;
            align-items: center;
            padding: 0;

            //profile-info__list
            &__list {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: $blocksHeight;
                padding: {
                    top: 16px;
                    bottom: 16px;
                };
                //list item
                & li {
                    height: 50px;
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
            height: 100%;
            grid-template-rows: 36px 1fr 36px;
        }
    }
}
</style>
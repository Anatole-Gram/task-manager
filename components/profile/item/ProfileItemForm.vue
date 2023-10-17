<template>
    <form action="#" class="profile__box box">
        <ul>
            <li>
                <label for="name" v-text="`имя`" />
                <p v-text="`не менее 2 символов`" />
                <input type="text" id="name"
                    v-model="user.name">
            </li>

            <li>
                <label for="surname" v-text="`фамилия`" />
                <p v-text="`не менее 2 символов`" />
                <input type="text" id="surname"
                    v-model="user.surname">
            </li>

            <li>
                <label for="position" v-text="`должность`" />
                <p v-text="`не менее 5 символов`" />
                <input type="text" id="position"
                    v-model="user.position">
            </li>

            <li>
                <label for="phone" v-text="`телефон`" />
                <p v-text="`+ 7 968 082 17 36`" />
                <input type="text" id="phone"
                    v-model.lazy="user.phone"
                    >
            </li>

            <li>
                <label for="mail" v-text="`почта`" />
                <p v-text="`tote-anatole-gram@yndex.ru`" />
                <input type="text" id="mail"
                    v-model="user.mail">
            </li>

        </ul>
    </form>
</template>


<script setup>
    const props = defineProps({
        user: {
            type: [Object]
        }
    })
</script>

<style lang="scss" scoped>

    ul {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        @include blackBox;

        & li {
            @include mainOutputContainer(24px, 24px);
            margin-bottom: 8px;
            & label {
                grid-area: title;
                @include rowBevel($rowWhite);
                border-radius: 4px 0 0 0;
            }
            & p {
                grid-area: subTitle;
                color: $rowWhite;
                text-align: center;
                font: {
                    size: 0.9em;
                }
            }
            & input {
                grid-area: output;
                background: $rowWhite;
                border-radius: 0 4px 4px 4px;
            }
            & input,p,label {
                padding: 0 8px;
            }
        }
    }

</style>
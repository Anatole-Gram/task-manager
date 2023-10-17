<template>
    <div class="log-wraper">
        <form class="form text">
            <label for="user" class="text-label">пользователь</label>
            <select 
                v-model.number="selected" 
                id="user" 
                class="form__input form__item">
                    <option value="0">выберите пользователя</option>
                    <option v-for="user of usersList" :key="user.id"
                        :value="user.id">
                            {{`${user.name} ${user.surname}`}}
                    </option>
            </select>
            <label for="pwd" class="text-label">пароль</label>
            <input type="text" value="******" disabled id="pwd" class="form__input form__item">
            <button 
                @click.prevent="profile.logIn(selected), $router.push('/')" 
                :class="{'form__btn--green': selected, 'form__btn--red': !selected}"
                class="form__btn form__item">
                    войти
            </button>
        </form>
    </div>
</template>

<script setup>
import { useUsers } from '@/store/users'
import { useProfile } from '@/store/profile';
    const profile = useProfile()
    const selected =  ref(0)
    const users = useUsers()
    const usersList = computed(() => users.list)

</script>

<style lang="scss" scoped>

.log-wraper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 332px;
    background-color: #FFFEFB;
    border-radius: 4px;
    padding: 36px 0;

    box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
    &__item {
        width: 284px;
        height: 36px;
        text-align: center;
        border-radius: 4px;
        margin: 8px 0;
    }
    &__input {
        background-color: #FFFEFB;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        &:hover {
            cursor: pointer;
        }
    }
    &__btn {
        font: {
            family: "Verdana";
            weight: 500;
        }
        background: {
            color: #212529;
        }
        color: rgba(255, 255, 255, 0.55);
        &--red {
            &:hover {
                color: red;
            }
        }
        &--green {
            &:hover {
                color: green;
            }
            
        }
    }
}
</style>
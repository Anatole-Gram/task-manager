<template>
    <div class="profile__box box">
        <ul class="profile__box--black">
            <li>
                <h3>{{user.name}} {{user.surname}}</h3> 
            </li>
            <li> 
                <p> <span>должность: </span> {{user.position}} </p> 
            </li>
            <li> 
                <p> <span>телефон: </span> {{user.phone}} </p> 
            </li>
            <li> 
                <p> <span>почта: </span> {{user.mail}} </p> 
            </li>

        </ul>
    </div>
</template>

<script setup> 
    const props = defineProps({
        user: {
            type: [Object]
        },
        editorState: {
            type: [Boolean]
        }
    })
</script>

<style lang="scss" scoped> 

    ul {
        width: 100%;
        height: 100%;
        padding: 16px;
        display: grid;
        grid-template-rows: auto;
        grid-template-columns: 1fr 1fr;
        gap: 2px;
        box-shadow: 1px -1px 4px 1px rgb(100 100 100 / 40%), -1px 1px 4px 1px rgb(100 100 100 / 40%);
        & li {
                grid-column: 1 / 3;
                display: flex;
                align-items: center;
                &:first-child {
                    grid-column: 1 / 2;
                    padding:  {
                        left: 8px;
                    }
                    clip-path: polygon(0% 0%, 90% 0, 100% 100%, 0 100%, 0% 0%);
                    border-radius: 4px 0 0 0;
                    font: {
                        family: 'Comforta';
                        font-weight: 500;
                    }
                }
                &:nth-child(2) {
                    border-radius: 0 4px 0 0;
                }
                &:last-child {
                    border-radius: 0 0 4px 4px;
                }
                & p {
                    padding: {
                        left: 32px;
                    }
                    font: {
                        family: 'Comforta';
                        weight: 500;
                        size: 14px;

                    }
                }
            }
        & span {
            font: {
                family: 'Verdana';
                variant: small-caps;
                weight: 400;
                size: 14px;
            }
        }
    }


</style>
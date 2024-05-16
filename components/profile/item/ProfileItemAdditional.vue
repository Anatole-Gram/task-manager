<template>
    <ul class="profile-additional text-content">
        <li>

        </li>

        <li>
            <span>был в сети:</span> &nbsp;  23.08.2022
        </li>

        <li>
            <span>задания</span>: &nbsp; <span>всего</span> &nbsp; 13 &nbsp; <span>выполнено</span> &nbsp; 5 &nbsp; <span>новые</span> &nbsp; 4 &nbsp;
        </li>

        <li>
            <span>задачи:</span> &nbsp; 4
        </li>

        <li></li>

    </ul>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    $arrowWidth: 15%;
    $arrowHeight: 100%;
    $denominator: 1.3;
    $inArrowHeight: calc($arrowHeight / $denominator);
    $inArrowWidth: calc($arrowWidth / $denominator);
    $arrowLeft: polygon(0 0, 20% 0, 100% 45%, 100% 55%, 20% 100%, 0 100%);
    $arrowRight: polygon(0 45%, 80% 0, 100% 0, 100% 100%, 80% 100%, 0 55%);
    $rowHeight: calc((100% / 3) - 4px);

    @mixin arrowArea($clipPath, $width, $height, $bg) {
        width: $width;
        height: $height;
        clip-path: $clipPath;
        background: $bg;
    }
    @mixin arrowPosition($firstPos, $secondPos, $firstPropPos, $secondPosProp, $zIndex) {
        position: absolute;
        #{$firstPos}: $firstPropPos;
        #{$secondPos}: $secondPosProp;
        z-index: $zIndex;
    }

    ul {
        height: 100%;
        position: relative;
        background-color: inherit;

        &::before {
            content: '';
            @include arrowArea($arrowLeft, $arrowWidth, 100%, inherit);
            @include arrowPosition(top, left, 0, -2px, 2);
        }
        &::after {
            content: '';
            @include arrowArea($arrowRight, $arrowWidth, 100%, inherit);
            @include arrowPosition(top, right, 0, -2px, 2);

        }
        
        & li {
            z-index: 1;
            width: 100%;
            height: $rowHeight;
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #212529;
            background: linear-gradient(45deg,#212529,rgba(33,37,41,.9) 60%,rgba(33,37,41,.75));
            color: #fff;
            margin: 1px;

            &:nth-child(2) {
                top: 0;
            }
            &:nth-child(3) {
                top: calc(50% - $rowHeight / 2);
            }
            &:nth-child(4){
                bottom: 0;
            }
        }

        & li:first-of-type {
            @include arrowArea($arrowLeft, $inArrowWidth, $inArrowHeight, #212529);
            @include arrowPosition(top, left, calc(50% - $inArrowHeight / 2), 0, 3);
            justify-content: flex-start;
            padding: 8px;
            border-radius: 4px;
        }
        & li:last-of-type {
            @include arrowArea($arrowRight, $inArrowWidth, $inArrowHeight, rgba(33,37,41,.75));
            @include arrowPosition(top, right, calc(50% - $inArrowHeight / 2), 0, 3);
            padding: 8px;
            clip-path: $arrowRight;
            border-radius: 4px;
        }

    }
</style>
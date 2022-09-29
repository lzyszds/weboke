<script setup lang='ts'>
import Icon from './icon.vue';
import { defineProps } from 'vue';
const list = [
    { name: 'icon-icon-taikong13', fill: '#888', },
    { name: 'icon-icon-taikong9', fill: '#888', },
    { name: 'icon-icon-taikong17', fill: '#888', },
]
const props: any = defineProps({
    data: {}
})
const { taikong9, taikong13, taikong17 } = props.data.information
const selectHandle = (index: number) => {
    if (index == 0) return taikong13
    if (index == 1) return taikong9
    if (index == 2) return taikong17 + '条评论'
}
const { text, image, title } = props.data.content

</script>

<template>
    <div class="conDiv">
        <img :src="image" alt="">
        <div class="conDiv_text">
            <div class="title">{{title}}</div>
            <div class="synopsis"> {{text}} </div>
            <div class="time">
                <span v-for="(item,index) in list " :key="index">
                    <Icon :fill="item.fill" :name="item.name"></Icon>
                    {{selectHandle(index)}}
                </span>
            </div>
        </div>

    </div>
</template>

<style scoped>
.conDiv {
    cursor: pointer;
    display: flex;
    box-shadow: -1px 1px 6px 2px rgb(233, 233, 233);
    border-radius: 8px;
    margin-bottom: 30px;
    margin-top: 3px;
    background-color: #fff;
    transition: .3s;
    /* opacity: 0; */
    transform: translateX(-150%);
}

.conDiv:hover {
    box-shadow: -1px 1px 6px 2px rgb(233, 233, 233);
    animation: shake 0.5s cubic-bezier(0.68, -1.55, 0.265, 4.55) both;

}

@keyframes shake {
    0% {
        transform: scale(1) rotate(1deg);
    }

    50% {
        transform: scale(1.02) rotate(-1deg);
    }

    100% {
        transform: scale(1.05) rotate(0deg);
    }

}

.conDiv:hover:nth-child(2n) {
    box-shadow: -1px 1px 6px 2px rgb(233, 233, 233);
    animation: shake1 0.5s cubic-bezier(0.68, -1.55, 0.265, 4.55) both;
}

@keyframes shake1 {
    0% {
        transform: scale(1)
    }

    50% {
        transform: scale(1.02)
    }

    100% {
        transform: scale(1.05)
    }

}

.conDiv img {
    width: 280px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px 0 0 8px;
}

.conDiv_text {
    padding: 30px 40px 0;
}

.title {
    font-size: 25px;
    color: #000;
}

/* 超出数量显示省略号 */
.synopsis {
    /* width: 500px; */
    font-size: 14px;
    color: #888;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-top: 20px;
    line-height: 20px;
    margin-bottom: 20px;
}

.time {
    border-top: 1px solid #eee;
    font-size: 14px;
    color: #888;
    padding-top: 7px;
    display: flex;

}

.time span {
    display: flex;
    height: 20px;
    line-height: 25px;
}

.time span:nth-child(1),
.time span:nth-child(2) {
    margin-right: 30px;
}

.time span svg {
    width: 30px !important;
    height: 25px;
    margin-right: 5px;
}
</style>

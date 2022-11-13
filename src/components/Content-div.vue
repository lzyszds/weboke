<!-- 文章列表中的长方形组件 -->
<script setup lang='ts'>
import { defineProps, ref } from 'vue';
import dayjs from 'dayjs';
const list = [
    { name: 'icon-icon-taikong13', fill: '#888', },
    { name: 'icon-icon-taikong9', fill: '#888', },
    { name: 'icon-icon-taikong17', fill: '#888', },
]
interface Props {
    data: {
        title: string,
        content: string,
        time: string,
        createTime: string,
        authorId: string,
        comNumber: string,
        coverImg: string,
    }
}
const props = defineProps<Props>();
const data: any = ref(props.data)
const selectHandle = (index: number) => {
    if (index == 0) return data.value.author
    if (index == 1) return dayjs(data.value.createTime * 1000).format('YYYY-MM-DD')
    if (index == 2) return (data.value.comNumber || 0) + '条评论'
}
</script>

<template>
    <div v-transition="'animate'" class="conDiv">
        <img v-lazy :src="data.coverImg" alt="">
        <div class="conDiv_text">
            <div class="title">{{ data.title }}</div>
            <div class="synopsis" v-html="data.coverContent"></div>
            <div class="time">
                <span v-for="(item, index) in list " :key="index">
                    <lzyIcon :fill="item.fill" :name="item.name"></lzyIcon>
                    {{ selectHandle(index) }}
                </span>
            </div>
        </div>

    </div>
</template>

<style scoped>
.conDiv {
    cursor: var(--linkCup);
    display: flex;
    box-shadow: -1px 1px 6px 2px rgb(233, 233, 233);
    border-radius: 8px;
    margin-bottom: 30px;
    margin-top: 3px;
    background-color: #fff;
    /* transition: 0.5s all; */
    opacity: 1;
    /* display: none; */
}

.conDiv.animate {
    animation: slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
}

@-webkit-keyframes slide-in-blurred-bottom {
    0% {
        -webkit-transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
        transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
        -webkit-transform-origin: 50% 100%;
        transform-origin: 50% 100%;
        -webkit-filter: blur(40px);
        filter: blur(40px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateY(0) scaleY(1) scaleX(1);
        transform: translateY(0) scaleY(1) scaleX(1);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        -webkit-filter: blur(0);
        filter: blur(0);
        opacity: 1;
    }
}

@keyframes slide-in-blurred-bottom {
    0% {
        -webkit-transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
        transform: translateY(1000px) scaleY(2.5) scaleX(0.2);
        -webkit-transform-origin: 50% 100%;
        transform-origin: 50% 100%;
        -webkit-filter: blur(40px);
        filter: blur(40px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateY(0) scaleY(1) scaleX(1);
        transform: translateY(0) scaleY(1) scaleX(1);
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
        -webkit-filter: blur(0);
        filter: blur(0);
        opacity: 1;
    }
}

.conDiv:hover .title {
    /* box-shadow: -1px 1px 6px 1px var(--themeColor); */
    color: var(--themeColor);
}

.conDiv img {
    width: 280px;
    height: 200px;
    object-fit: cover;
    border-radius: 8px 0 0 8px;
}

.conDiv_text {
    padding: 20px 40px 0;
}

.title {
    font-size: 25px;
    color: #000;
}

/* 超出数量显示省略号 */
.synopsis {
    /* width: 500px; */
    height: 60px;
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

.time span:nth-child(1) {
    width: 80px;
    white-space: nowrap;
    overflow: hidden;
}

.time span {
    margin-right: 30px;
    width: 125px;
}

.time span svg {
    width: 30px !important;
    height: 25px;
    margin-right: 5px;
}
</style>

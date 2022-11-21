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
    },
    index: number,
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
    <div v-transition="'tosiTion'" class="conDiv">
        <img v-lazy="props.index" :src="data.coverImg" alt="">
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
    opacity: .5;
    transition: all .5s cubic-bezier(0.68, -0.55, 0.68, 1.55);
    transform: translateY(200px);

}

.tosiTion {
    opacity: 1;
    transform: translate(0) !important;
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

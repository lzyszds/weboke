<!-- 文章列表中的长方形组件 -->
<script setup lang='ts'>
import { defineProps, onMounted } from 'vue';
const list = [
    { name: 'icon-icon-taikong13', fill: '#888', },
    { name: 'icon-icon-taikong9', fill: '#888', },
    { name: 'icon-icon-taikong17', fill: '#888', },
]
const props: any = defineProps({
    data: {},
})
const { createTime, authorId, comNumber } = props.data
const selectHandle = (index: number) => {
    if (index == 0) return authorId
    if (index == 1) return createTime
    if (index == 2) return comNumber + '条评论'
}
const { content, coverImg, title } = props.data
onMounted(() => {
    const con = document.querySelectorAll('.conDiv')
    con.forEach((item: any, index) => {
        item.style.display = 'flex'
        setTimeout(() => {
            item.classList.add('animate')
        }, (500 + (300 * index)))
    })

})
</script>

<template>
    <div class="conDiv animate">
        <img v-lazy :src="coverImg" alt="">
        <div class="conDiv_text">
            <div class="title">{{ title }}</div>
            <div class="synopsis"> {{ content }} </div>
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
    animation: 1s linear 0s 1 normal both running bottom-up-spring;
}

.conDiv:hover {
    box-shadow: -1px 1px 6px 1px var(--themeColor);
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

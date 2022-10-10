<!-- 文章列表中的长方形组件 -->
<script setup lang='ts'>
import Icon from './icon.vue';
import { defineProps, onMounted } from 'vue';
const list = [
    { name: 'icon-icon-taikong13', fill: '#888', },
    { name: 'icon-icon-taikong9', fill: '#888', },
    { name: 'icon-icon-taikong17', fill: '#888', },
]
const props: any = defineProps({
    data: {},
})
const { taikong9, taikong13, taikong17 } = props.data.information
const selectHandle = (index: number) => {
    if (index == 0) return taikong13
    if (index == 1) return taikong9
    if (index == 2) return taikong17 + '条评论'
}
const { text, image, title } = props.data.content
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
    cursor: var(--linkCup);
    display: flex;
    box-shadow: -1px 1px 6px 2px rgb(233, 233, 233);
    border-radius: 8px;
    margin-bottom: 30px;
    margin-top: 3px;
    background-color: #fff;
    /* transition: 0.5s all; */
    opacity: 0;
    display: none;
}

.conDiv.animate {
    animation: 1s linear 0s 1 normal both running bottom-up-spring;
}

.conDiv:hover {
    box-shadow: -1px 1px 6px 1px var(--themeColor);
    /* animation: shake 0.5s cubic-bezier(0.68, -1.55, 0.265, 4.55) both; */
    /* animation: 1000ms linear 0s 1 normal both running bottom-up-spring; */
}

@keyframes bottom-up-spring {
    0% {
        transform: translateY(2.96em);
        opacity: 0.01;
    }

    1% {
        transform: translateY(2.9em);
        opacity: 0.03;
    }

    2% {
        transform: translateY(2.81em);
        opacity: 0.06;
    }

    3% {
        transform: translateY(2.69em);
        opacity: 0.1;
    }

    4% {
        transform: translateY(2.56em);
        opacity: 0.15;
    }

    5% {
        transform: translateY(2.42em);
        opacity: 0.19;
    }

    6% {
        transform: translateY(2.27em);
        opacity: 0.24;
    }

    7% {
        transform: translateY(2.11em);
        opacity: 0.3;
    }

    8% {
        transform: translateY(1.95em);
        opacity: 0.35;
    }

    9% {
        transform: translateY(1.79em);
        opacity: 0.4;
    }

    10% {
        transform: translateY(1.63em);
        opacity: 0.46;
    }

    11% {
        transform: translateY(1.47em);
        opacity: 0.51;
    }

    12% {
        transform: translateY(1.32em);
        opacity: 0.56;
    }

    13% {
        transform: translateY(1.17em);
        opacity: 0.61;
    }

    14% {
        transform: translateY(1.03em);
        opacity: 0.66;
    }

    15% {
        transform: translateY(0.9em);
        opacity: 0.7;
    }

    16% {
        transform: translateY(0.77em);
        opacity: 0.74;
    }

    17% {
        transform: translateY(0.65em);
        opacity: 0.78;
    }

    18% {
        transform: translateY(0.55em);
        opacity: 0.82;
    }

    19% {
        transform: translateY(0.45em);
        opacity: 0.85;
    }

    20% {
        transform: translateY(0.35em);
        opacity: 0.88;
    }

    21% {
        transform: translateY(0.27em);
        opacity: 0.91;
    }

    22% {
        transform: translateY(0.2em);
        opacity: 0.93;
    }

    23% {
        transform: translateY(0.13em);
        opacity: 0.96;
    }

    24% {
        transform: translateY(0.07em);
        opacity: 0.98;
    }

    25% {
        transform: translateY(0.02em);
        opacity: 0.99;
    }

    26% {
        transform: translateY(-0.02em);
        opacity: 1.01;
    }

    27% {
        transform: translateY(-0.06em);
        opacity: 1.02;
    }

    28% {
        transform: translateY(-0.09em);
        opacity: 1.03;
    }

    29% {
        transform: translateY(-0.12em);
        opacity: 1.04;
    }

    30% {
        transform: translateY(-0.14em);
        opacity: 1.05;
    }

    31% {
        transform: translateY(-0.16em);
        opacity: 1.05;
    }

    32% {
        transform: translateY(-0.17em);
        opacity: 1.06;
    }

    33% {
        transform: translateY(-0.18em);
    }

    34% {
        transform: translateY(-0.18em);
    }

    35% {
        transform: translateY(-0.19em);
    }

    36% {
        transform: translateY(-0.19em);
    }

    37% {
        transform: translateY(-0.18em);
    }

    38% {
        transform: translateY(-0.18em);
    }

    39% {
        transform: translateY(-0.17em);
    }

    40% {
        transform: translateY(-0.17em);
        opacity: 1.06;
    }

    41% {
        transform: translateY(-0.16em);
        opacity: 1.05;
    }

    42% {
        transform: translateY(-0.15em);
    }

    43% {
        transform: translateY(-0.14em);
        opacity: 1.05;
    }

    44% {
        transform: translateY(-0.13em);
        opacity: 1.04;
    }

    45% {
        transform: translateY(-0.12em);
    }

    46% {
        transform: translateY(-0.11em);
        opacity: 1.04;
    }

    47% {
        transform: translateY(-0.1em);
        opacity: 1.03;
    }

    48% {
        transform: translateY(-0.09em);
    }

    49% {
        transform: translateY(-0.08em);
        opacity: 1.03;
    }

    50% {
        transform: translateY(-0.07em);
        opacity: 1.02;
    }

    51% {
        transform: translateY(-0.06em);
    }

    52% {
        transform: translateY(-0.05em);
    }

    53% {
        transform: translateY(-0.05em);
        opacity: 1.02;
    }

    54% {
        transform: translateY(-0.04em);
        opacity: 1.01;
    }

    55% {
        transform: translateY(-0.03em);
    }

    56% {
        transform: translateY(-0.03em);
    }

    57% {
        transform: translateY(-0.02em);
    }

    58% {
        transform: translateY(-0.02em);
        opacity: 1.01;
    }

    59% {
        transform: translateY(-0.01em);
        opacity: 1;
    }

    60% {
        transform: translateY(-0.01em);
    }

    61% {
        transform: translateY(0);
    }

    64% {
        transform: translateY(0);
    }

    65% {
        transform: translateY(0.01em);
    }

    85% {
        transform: translateY(0.01em);
    }

    86% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }

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

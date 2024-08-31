<!-- 文章列表中的长方形组件 -->
<script setup lang="ts">
import dayjs from "dayjs";
import LzyIcon from "./LzyIcon.vue";
const list = [
  { name: "basil:user-solid" },
  { name: "basil:alarm-outline" },
  { name: "humbleicons:chat" },
  { name: "prime:eye" },
];
interface Data {
  title: string;
  content: string;
  time: string;
  create_date: string;
  uname: string;
  comments_count: string;
  cover_img: string;
  partial_content: string;
  tags: string[];
  access_count: number;
}
interface Props {
  data: Data;
  index: number;
}
// const api = import.meta.env.VITE_BASE_URL

const props = defineProps<Props>();
const tags = props.data.tags;
const data = ref<Data>(props.data);
const selectHandle = (index: number) => {
  if (index == 0) return data.value.uname;
  if (index == 1)
    return dayjs(data.value.create_date).format("YYYY-MM-DD");
  if (index == 2) return (data.value.comments_count || 0);
  if (index == 3) return data.value.access_count;
};

</script>

<template>
  <div v-transition="'tosiTion'" class="conent_div">
    <div class="conent_div_img">
      <img v-lazy="props.index" :src="'/api/public' + data.cover_img" alt="" />
    </div>
    <div class="conent_div_text">
      <div class="title">{{ data.title }}</div>
      <div class="synopsis" v-text="data.partial_content"></div>
      <div class="tags">
        <span class="mr-1 taglzy" v-for="item of tags">{{ item }} </span>
      </div>
      <div class="time">
        <span v-for="(item, index) in list" :key="index">
          <LzyIcon :name="item.name"></LzyIcon>
          {{ selectHandle(index) }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.tosiTion {
  opacity: 1 !important;
  transform: translate(0) !important;
}

.conent_div {

  display: block;
  box-shadow: 0 0px 5px rgb(0 0 0 / 33%);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  opacity: 0.5;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.68, 1.55),
    opacity 0.5s cubic-bezier(0.68, -0.55, 0.68, 1.55);
  transform: translateY(200px);
  height: 400px;
  padding: 5px;
  border: 1px solid #888;

  &:hover {
    border: 1px solid var(--themeColor);
    box-shadow: 0px 10px 15px -3px rgba(93, 110, 205, 0.1);

    .title {
      /* box-shadow: -1px 1px 6px 1px var(--themeColor); */
      color: var(--themeColor);

    }
  }

  .conent_div_img {
    border-bottom: 1px solid #eee;

    img {
      width: 100%;
      aspect-ratio: 16 / 6;
      object-fit: cover;
      border-radius: 8px;
    }
  }

  .conent_div_text {
    width: 96%;
    height: 20rem;
    padding: 10px;
    display: grid;
    grid-template-rows: 60px 1fr 30px 35px;
    gap: 5px
  }

  .title {
    font-size: 22px;
    color: #000;
    font-family: "dindin";
    overflow: hidden;
  }

  /* 超出数量显示省略号 */
  .synopsis {
    font-size: 14px;
    color: #888;
    height: 40px;
    //超出两行显示省略号
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 1.5;

  }

  .time {
    border-top: 1px solid #eee;
    font-size: 14px;
    color: #888;
    padding: 7px;
    display: flex;

    span {
      display: flex;
      height: 20px;
      line-height: 25px;
      flex: 1;
      margin-right: 10px;

      &:nth-child(1) {
        white-space: nowrap;
        overflow: hidden;
      }

      &:nth-child(3) {
        text-align: center;
        width: 60px;
        flex: none;
      }

      &:nth-child(4) {
        text-align: center;
        width: 80px;
        flex: none;
      }

      svg {
        width: 20px !important;
        height: 20px;
        margin-right: 5px;
        padding-top: 2px;
      }
    }
  }
}
</style>

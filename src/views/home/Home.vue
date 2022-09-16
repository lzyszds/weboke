<template>
  <div class="home">
    <div class="card"
      :style="`background: url('${count == 0?bgicon:list[count-1].icon}') no-repeat center center;background-size: cover;`">
    </div>
    <div class="card4">
      <div class="itemsCard" v-for="(item,index) in list" :key="index" @mouseover="count = index+1"
        @mouseout="count = 0">
        <div class="itemIcon">
          <img :class="count!=index+1?'hover':''" :src="item.icon" alt="">
        </div>
        <div class="itemContent" :class="count!=index+1?'hover':''">
          <div class="itemTitle">{{item.title}}</div>
          <!-- <div class="itemText">{{item.content}}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
const bgicon = new URL('../../assets/images/bg.jpg', import.meta.url).href;

const count = ref(0);
const list = ref([
  {
    hover: false,
    icon: 'http://localhost:1024/img/an1.jpg',
    title: '突如其来的疾病、藕断丝连的失恋、电影《独行月球》、小插曲',
    content: '当你有两个朝夕相处的朋友，一个以为要离开我，去追求爱情，突然不走了。而另一个以为不离开我，却追求亲情，又可能要走。所以，你看我就没有患得患失的状态。生活悲欢离合，再常见不过了。 要想在平平淡淡的生活中找点事是很简单的，就比如我愿意成为朋友们释放感情的中心。当然，羊毛出在羊身上，我自身的经历就比较丰富，所以都是我自己一手造就。而以上的事，你说这是平常事吗？',
  },
  {
    hover: false,
    icon: 'http://localhost:1024/img/an2.jpg',
    title: '突如其来的疾病、藕断丝连的失恋、电影《独行月球》、小插曲',
    content: '当你有两个朝夕相处的朋友，一个以为要离开我，去追求爱情，突然不走了。而另一个以为不离开我，却追求亲情，又可能要走。所以，你看我就没有患得患失的状态。生活悲欢离合，再常见不过了。 要想在平平淡淡的生活中找点事是很简单的，就比如我愿意成为朋友们释放感情的中心。当然，羊毛出在羊身上，我自身的经历就比较丰富，所以都是我自己一手造就。而以上的事，你说这是平常事吗？',
  },
  {
    hover: false,
    icon: 'http://localhost:1024/img/an3.jpg',
    title: '突如其来的疾病、藕断丝连的失恋、电影《独行月球》、小插曲',
    content: '当你有两个朝夕相处的朋友，一个以为要离开我，去追求爱情，突然不走了。而另一个以为不离开我，却追求亲情，又可能要走。所以，你看我就没有患得患失的状态。生活悲欢离合，再常见不过了。 要想在平平淡淡的生活中找点事是很简单的，就比如我愿意成为朋友们释放感情的中心。当然，羊毛出在羊身上，我自身的经历就比较丰富，所以都是我自己一手造就。而以上的事，你说这是平常事吗？',
  },
])
onMounted(() => {

})
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.card {
  width: 90%;
  height: calc(100vh - 360px);
  /* background: url('@/assets/images/bg.jpg') no-repeat center center;
  background-size: cover; */
  /* background-attachment: fixed; */
  box-shadow: 1px 4px 8px 5px #777;
  border-radius: 10px;
  transition: .3s;
}

.card4 {
  width: 70%;
  display: flex;
  justify-content: space-between;

}

.itemsCard {
  width: 400px;
  height: 200px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 2px #999;
}

.itemIcon {
  width: 400px;
  height: 200px;
  text-align: center;

}

.itemIcon img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  user-select: none;
  position: relative;
  transition: 1s all;
}

.itemIcon img.hover {
  transform: scale(1.2);
}

.itemContent {
  transition: .3s;
  position: absolute;
  top: 0;
}

.itemContent.hover {
  transform: translateY(-80px) scale(30%);
}

.itemTitle {
  font-size: 25px;
  padding: 21px;
  color: #fff;
  text-shadow: 1px 3px 3px #000;
}
</style>

<template>
  <div class="home">
    <ContentHead></ContentHead>
    <div class="p-9">
      <div class="wrapper">
        <Yiqcom :option="{ title: '现有确诊' }"></Yiqcom>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ContentHead from "../../components/Content-head.vue";
import Yiqcom from "../../components/Yiqcom.vue";
export default defineComponent({
  name: "Home",
  components: {
    ContentHead,
    Yiqcom,
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.map-container {
  width: 100%;
  height: 700px;
}
</style>

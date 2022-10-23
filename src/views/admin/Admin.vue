<script setup lang='ts'>
import SetLeft from './components/SetLeft.vue'
</script>

<template>
  <div class="base">
    <div class="admin">
      <div class="tool">
        <Suspense>
          <SetLeft />
        </Suspense>
      </div>
      <div class="content">
        <Suspense>
          <router-view />
        </Suspense>
      </div>
    </div>
  </div>
</template>

<style lang="less"  scoped>
.base {
  width: 100vw;
  height: 100vh;
  background-color: var(--themeColor);
  display: grid;
  justify-content: center;
  align-content: center;
}

.admin {
  width: 90vw;
  height: 90vh;
  background-color: #eef7ff;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 4fr;

  .tool {
    // width: 400px;
    height: 100%;
    background-color: #fff;
    border-radius: 10px 0 0 10px;
    // box-shadow: 0 0 4px 3px rgba(0, 0, 0, 0.1);
    margin-right: 30px;
  }

  .content {
    height: 100%;
    background-color: #fff;
    border-radius: 0 10px 10px 0;
  }
}
</style>

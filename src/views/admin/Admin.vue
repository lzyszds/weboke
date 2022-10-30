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
</style>

<style lang="less">
@import url('@/assets/css/admin.less');
</style>

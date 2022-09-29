
<template>
  <div>
    <div class="cardMask1"></div>
    <div class="cardMask2"></div>
    <div class="cardMask3"></div>
    <div class="cardMask4"></div>
    <div class="cardMask5"></div>
    <div class="cardMask6"></div>
    <div class="cardMask7"></div>
  </div>
</template>

<style scoped>
.cardMask,
.cardMask1,
.cardMask2,
.cardMask3,
.cardMask4,
.cardMask5,
.cardMask6,
.cardMask7 {
  width: 130px;
  height: 2px;
  background: linear-gradient(to left, #fff, rgb(211, 211, 211, 0));
  transform: rotate(135deg) translateX(-300%);
  border-radius: 5px;
  transition: 5s;
  animation: leftToRight 5s infinite linear;
}



@keyframes leftToRight {
  100% {
    transform: rotate(135deg) translateX(350%);
  }

}


.cardMask2 {
  animation: leftToRight2 4s infinite linear;
  transform: rotate(135deg) translate(-400%, 50px);
}

@keyframes leftToRight2 {

  100% {
    transform: rotate(135deg) translate(500%, 50px);
  }
}

.cardMask3 {
  animation: leftToRight3 6s infinite linear;
  transform: rotate(135deg) translate(-400%, 500px);
}

@keyframes leftToRight3 {
  100% {
    transform: rotate(135deg) translate(500%, 500px);
  }
}

.cardMask4 {
  animation: leftToRight4 8s infinite linear;
  transform: rotate(135deg) translate(-400%, 200px);
}

@keyframes leftToRight4 {
  100% {
    transform: rotate(135deg) translate(500%, 200px);
  }
}

.cardMask5 {
  animation: leftToRight5 20s infinite linear;
  transform: rotate(135deg) translate(-1500%, -300px);
}

@keyframes leftToRight5 {
  100% {
    transform: rotate(135deg) translate(1500%, -300px);
  }
}

.cardMask6 {
  animation: leftToRight6 10s infinite linear;
  transform: rotate(135deg) translate(-400%, -600px);
}

@keyframes leftToRight6 {
  100% {
    transform: rotate(135deg) translate(500%, -600px);
  }
}

.cardMask7 {
  animation: leftToRight7 10s infinite linear;
  transform: rotate(135deg) translate(-400%, -100px);
}

@keyframes leftToRight7 {
  100% {
    transform: rotate(135deg) translate(500%, -100px);
  }
}
</style>

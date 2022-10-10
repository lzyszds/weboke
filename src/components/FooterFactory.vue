<script setup lang='ts'>

</script>

<template>
  <div class="footerClass">
    <!-- partial:index.partial.html -->
    <div class="main"></div>
    <div class="footer">
      <div class="content">
        <div>
          <div><b>Eldew</b><a href="#">Secuce</a><a href="#">Drupand</a><a href="#">Oceash</a><a href="#">Ugefe</a><a
              href="#">Babed</a></div>
          <div><b>Spotha</b><a href="#">Miskasa</a><a href="#">Agithe</a><a href="#">Scesha</a><a href="#">Lulle</a>
          </div>
          <div><b>Chashakib</b><a href="#">Chogauw</a><a href="#">Phachuled</a><a href="#">Tiebeft</a><a
              href="#">Ocid</a><a href="#">Izom</a><a href="#">Ort</a></div>
          <div><b>Athod</b><a href="#">Pamuz</a><a href="#">Vapert</a><a href="#">Neesk</a><a href="#">Omemanen</a>
          </div>
        </div>
        <div><a class="image" href="https://codepen.io/z-" target="_blank"
            style="background-image: url(&quot;https://s3-us-west-2.amazonaws.com/s.cdpn.io/199011/happy.svg&quot;)"></a>
          <p>©2019 Not Really</p>
        </div>
      </div>
    </div>
    <svg style="position:fixed; top:100vh">
      <defs>
        <filter id="blob">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob">
          </feColorMatrix>
          <!--feComposite(in="SourceGraphic" in2="blob" operator="atop") //After reviewing this after years I can't remember why I added this but it isn't necessary for the blob effect-->
        </filter>
      </defs>
    </svg>
    <!-- partial -->
  </div>
</template>

<style scoped>
.footerClass {
  display: grid;
  grid-template-rows: 1fr 10rem auto;
  grid-template-areas: "main" "." "footer";
  overflow-x: hidden;
  background: #F5F7FA;
  /* min-height: 100vh; */
  width: 100%;
  font-family: "Open Sans", sans-serif;
}

.footerClass .footer {
  z-index: 1;
  --footer-background: #5161CE;
  display: grid;
  position: relative;
  grid-area: footer;
  min-height: 12rem;
}

.footerClass .footer .bubbles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1rem;
  background: var(--footer-background);
  filter: url("#blob");
}


.footerClass .footer .content {
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 4rem;
  padding: 2rem;
  background: var(--footer-background);
}

.footerClass .footer .content a,
.footerClass .footer .content p {
  color: #F5F7FA;
  text-decoration: none;
}

.footerClass .footer .content b {
  color: white;
}

.footerClass .footer .content p {
  margin: 0;
  font-size: 0.75rem;
}

.footerClass .footer .content>div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footerClass .footer .content>div>div {
  margin: 0.25rem 0;
}

.footerClass .footer .content>div>div>* {
  margin-right: 0.5rem;
}

.footerClass .footer .content>div .image {
  align-self: center;
  width: 4rem;
  height: 4rem;
  margin: 0.25rem 0;
  background-size: cover;
  background-position: center;
}
</style>

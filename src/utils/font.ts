export default function (document) {
  // 动态字体生成style
  const style = document.createElement('style')
  style.innerHTML = `
  @font-face {
    font-family: 'dindin';
    src: url('/api/public/font/dist/DingTalk_JinBuTi_Regular.woff');
  }
  @font-face {
    font-family: 'black-Magic';
    src: url('/api/public/font/dist/Black-Magic.ttf');
  }
  @font-face {
    font-family: 'firaCode';
    src: url('/api/public/font/dist/FiraCode.ttf');
  }
  @font-face {
    font-family: 'Fira Code VF';
    src: url('/api/public/font/dist/FiraCode-VF.woff2') format('woff2-variations');
    font-weight: 300 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'momo ink night';
    src: url('/api/public/font/dist/momo ink night.ttf');
  }
  @font-face {
    font-family: 'slackey';
    src: url('/api/public/font/dist/slackey.woff2');
  }
  `
  // @font-face {
  //   font - family: 'almama';
  //   src: url('${import.meta.env.VITE_BASE_URL}/public/font/dist/AlimamaShuHeiTi-Bold.woff');
  // }
  document.head.appendChild(style)
}

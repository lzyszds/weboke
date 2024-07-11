export default function (document) {
  // 动态字体生成style
  const style = document.createElement('style')
  style.innerHTML = `
  @font-face {
    font-family: 'dindin';
    src: url('/api/public/fonts/DingTalk JinBuTi.woff2');
  }
  @font-face {
    font-family: 'black-Magic';
    src: url('/api/public/fonts/Black-Magic.ttf');
  }
  @font-face {
    font-family: 'Fira Code';
    src: url('/api/public/fonts/FiraCode-VF.woff2') format('woff2-variations');
    font-weight: 300 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'momo ink night';
    src: url('/api/public/fonts/momo ink night.ttf');
  }
  @font-face {
    font-family: 'slackey';
    src: url('/api/public/fonts/slackey.woff2');
  }
  @font-face {
    font - family: 'almama';
    src: url('/api/public/fonts/AlimamaShuHeiTi-Bold.woff2');
  }
  `

  document.head.appendChild(style)
}

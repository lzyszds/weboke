
import './loading.css';
//移除loading效果
export const hide = (id) => {
  if (!id) document.getElementById("loadingDiv").style.display = "none";
  else {
    var childs = document.querySelector(id).childNodes
    Array.prototype.forEach.call(childs, function (child, index) {
      if (child.id == "loadingDiv") {
        child.style.display = "none"
      }
    });
  }
};
//展示loading效果
export const show = (id, text) => {
  //在页面未加载完毕之前显示的loading Html自定义内容
  var _LoadingHtml = `
  <div id="over" style="position: absolute;top: 0;left: 0; width: 100%;height: 100%; background-color: #000;opacity:0.8;z-index: 999999;">
  </div>
  <div id="layout" style="position: absolute;top: 50%;left: 50%;z-index: 9999999;text-align: center;transform: translate(-50%, -50%);}">
  ${html1}
  <div style="margin: 40px;text-align: center;color: #fff;">${text == null ? text = "加载中..." : text = text}</div>
  </div>
  `;
  var div = document.createElement('div');
  div.setAttribute('id', 'loadingDiv')
  div.setAttribute('style', 'display: none;')
  //呈现loading效果
  div.innerHTML = _LoadingHtml
  let _id = document.querySelector(id || 'body')
  _id.appendChild(div)
  document.getElementById("loadingDiv").style.display = "block";
}

/* 下方是一些loading效果的方案 */
// 方案一
const html1 = `<div class="loader">
  <div class="outer"></div>
  <div class="middle"></div>
  <div class="inner"></div>
</div>`
// 方案二
const html2 = `<div class='html2'>
<span></span>
<span></span>
<span></span>
<span></span>
</div>`
// 方案三
const html3 = `<svg viewBox="0 0 50 50" class='html3'>
<circle class="ring" cx="25" cy="25" r="20"></circle>
<circle class="ball" cx="25" cy="5" r="3.5"></circle>
</svg>
`

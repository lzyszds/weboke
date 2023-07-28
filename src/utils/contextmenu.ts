import { LNotification } from '@/utils/common'
const svg = {
  back: `<svg t="1690022021897" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4346" width="400" height="400"><path d="M384 512L731.733333 202.666667c17.066667-14.933333 19.2-42.666667 4.266667-59.733334-14.933333-17.066667-42.666667-19.2-59.733333-4.266666l-384 341.333333c-10.666667 8.533333-14.933333 19.2-14.933334 32s4.266667 23.466667 14.933334 32l384 341.333333c8.533333 6.4 19.2 10.666667 27.733333 10.666667 12.8 0 23.466667-4.266667 32-14.933333 14.933333-17.066667 14.933333-44.8-4.266667-59.733334L384 512z" fill="#ffffff" p-id="4347"></path></svg>`,
  enter: `<svg t="1690022003577" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4144" width="400" height="400"><path d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z" fill="#ffffff" p-id="4145"></path></svg>`,
  refresh: `<svg t="1690021754496" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3750" width="400" height="400"><path d="M934.4 206.933333c-17.066667-4.266667-34.133333 6.4-38.4 23.466667l-23.466667 87.466667C797.866667 183.466667 654.933333 96 497.066667 96 264.533333 96 74.666667 281.6 74.666667 512s189.866667 416 422.4 416c179.2 0 339.2-110.933333 398.933333-275.2 6.4-17.066667-2.133333-34.133333-19.2-40.533333-17.066667-6.4-34.133333 2.133333-40.533333 19.2-51.2 138.666667-187.733333 232.533333-339.2 232.533333C298.666667 864 138.666667 706.133333 138.666667 512S300.8 160 497.066667 160c145.066667 0 277.333333 87.466667 330.666666 217.6l-128-36.266667c-17.066667-4.266667-34.133333 6.4-38.4 23.466667-4.266667 17.066667 6.4 34.133333 23.466667 38.4l185.6 49.066667c2.133333 0 6.4 2.133333 8.533333 2.133333 6.4 0 10.666667-2.133333 17.066667-4.266667 6.4-4.266667 12.8-10.666667 14.933333-19.2l49.066667-185.6c0-17.066667-8.533333-34.133333-25.6-38.4z" fill="#ffffff" p-id="3751"></path></svg>`,
  toTop: `<svg t="1690021718641" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3442" width="400" fill="none" height="400"><path d="M904.533333 674.133333l-362.666666-362.666666c-17.066667-17.066667-42.666667-17.066667-59.733334 0l-362.666666 362.666666c-17.066667 17.066667-17.066667 42.666667 0 59.733334 17.066667 17.066667 42.666667 17.066667 59.733333 0L512 401.066667l332.8 332.8c8.533333 8.533333 19.2 12.8 29.866667 12.8s21.333333-4.266667 29.866666-12.8c17.066667-17.066667 17.066667-42.666667 0-59.733334z" p-id="3443"></path></svg>`,
  home: `<svg t="1690021668001" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2208" width="400" fill="none" height="400"><path d="M468.906667 57.941333a68.394667 68.394667 0 0 1 86.165333 0l399.936 322.624c30.058667 24.234667 35.136 68.693333 11.328 99.328a69.269333 69.269333 0 0 1-37.802667 24.768l-3.712 0.810667 0.021334 361.514667c0 59.370667-44.48 108.48-102.528 113.877333l-4.736 0.362667-4.949334 0.106666H211.370667c-59.84 0-109.056-47.808-112.106667-109.312l-0.106667-5.034666-0.021333-361.514667-2.453333-0.490667c-29.696-6.848-52.16-33.088-53.909334-64.96L42.666667 436.010667c0-21.610667 9.685333-42.026667 26.325333-55.466667z m46.72 50.026667a5.76 5.76 0 0 0-7.253334 0L108.864 431.146667a6.058667 6.058667 0 0 0-2.218667 4.693333c0 3.328 2.624 6.016 5.866667 6.016h18.816c17.536-0.021333 31.744 14.506667 31.744 32.405333v392.533334l0.064 3.392C164.437333 896.533333 185.792 917.333333 211.712 917.333333h599.765333l3.328-0.085333c25.770667-1.322667 46.101333-23.146667 46.101334-49.621333V474.282667c0-17.92 14.208-32.426667 31.744-32.426667h18.816c1.792 0 3.477333-0.832 4.608-2.261333a6.101333 6.101333 0 0 0-0.96-8.426667z m138.133333 564.693333a32 32 0 0 1-3.754667 45.098667C610.858667 750.890667 568.106667 768 522.666667 768c-45.44 0-88.192-17.109333-127.36-50.24a32 32 0 1 1 41.386666-48.853333C464.704 692.650667 493.056 704 522.666667 704c29.589333 0 57.941333-11.349333 85.973333-35.093333a32 32 0 0 1 45.12 3.754666z" fill="#111111" p-id="2209"></path></svg>`,
  copyIcon: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`,
  cutIcon: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="6" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="20" y1="4" x2="8.12" y2="15.88"></line><line x1="14.47" y1="14.48" x2="20" y2="20"></line><line x1="8.12" y1="8.12" x2="12" y2="12"></line></svg>`,
  pasteIcon: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px; position: relative; top: -1px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`,
  downloadIcon: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" style="margin-right: 7px; position: relative; top: -1px" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  deleteIcon: `<svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" stroke-width="2.5" fill="none" style="margin-right: 7px" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
};

const menuItems = [
  {
    content: `${svg.back}`,
    events: {
      click: () => {
        window.history.back();
      }
    }
  },  //返回
  {
    content: `${svg.enter}`,
    events: {
      click: () => {
        window.history.forward();
      }
    }
  },//前进
  {
    content: `${svg.refresh}`,
    events: {
      click: () => {
        window.location.reload();
      }
    }
  },
  {
    content: `${svg.toTop}`,
    events: {
      click: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  },
  {
    content: `${svg.copyIcon}复制`,
    events: {
      click: () => {
        //获取当前浏览器选中的文本
        const text = window.getSelection()!.toString()
        //将文本通过 clipboard 传入剪切板
        navigator.clipboard.writeText(text).then(() => {
          if (!text) return LNotification(`<i class="iconfont icon-error-"></i> 复制失败,请选择文本`)
          LNotification(`<i class="iconfont icon-copy"></i> 复制成功,转载请声明来源！`)
        }, function (res) {
          console.log("lzy ~ res", res)
        });
      },
    },
  },
  { content: `${svg.pasteIcon}粘贴` },
  { content: `${svg.cutIcon}返回` },
  { content: `${svg.downloadIcon}` },
  {
    content: `${svg.deleteIcon}Delete`,
    divider: "top", // top, bottom, top-bottom
  },
];

























let ul
window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  if (ul) ul.remove();
  ul = document.createElement("ul");
  document.body.appendChild(ul);
  ul.classList.add("contextMenu");
  menuItems.forEach((item, index) => {
    const button = document.createElement("button");
    const li: any = document.createElement("li");
    button.classList.add("contextMenu-button");
    li.classList.add("contextMenu-item");
    button.innerHTML = item.content;
    li.addEventListener("click", () => {
      ul.remove();
      if (item.events) {
        item.events.click();
      }
    });
    li.appendChild(button);
    li.firstChild.setAttribute("style", `animation-delay: ${index * 0.08}s`);
    ul.appendChild(li);
    ul.setAttribute("style", `--height: ${ul.scrollHeight}px;--top: ${e.clientY}px; --left: ${e.clientX}px;`);
  });
});

function removeMessage() {
  const contextMenu = document.querySelector(".contextMenu");
  if (contextMenu) contextMenu.remove();
}
window.addEventListener("click", removeMessage);
// window.addEventListener("blur", removeMessage);

//提示框
// function ElNotification(options) {
//   const content: any = document.querySelectorAll('.notification-content')
//   let top = null
//   if (content.length > 0) {
//     top = content[content.length - 1].parentNode.offsetTop +
//       content[content.length - 1].parentNode.scrollHeight + 20
//   }
//   const notification = document.createElement("div");
//   notification.classList.add("notification");
//   if (top) notification.style.top = top + 'px'
//   const style = options.title == '提示' ? 'color:#67c23a' : 'color:red';
//   notification.innerHTML = `
//     <div class="notification-content">
//       <h2 class="notification-title" style='${style}'>${options.title}</h2>
//       <div class="notification-message">${options.message}</div>
//     </div>
//     <div class="notification-close">
//       <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
//     </div>
//   `;
//   const close: any = notification.querySelector('.notification-close')
//   const closeclick = close.addEventListener('click', function (e) {
//     close.removeEventListener('click', closeclick)
//     notification.remove()
//   })
//   document.body.appendChild(notification);
//   const title = notification.querySelector('.notification-title') as HTMLDivElement
//   const message = notification.querySelector('.notification-message') as HTMLDivElement
//   notification.style.height =
//     title.scrollHeight
//     + message.scrollHeight + 34 + 'px'
//   setTimeout(() => {
//     close.removeEventListener('click', closeclick)
//     notification.remove();
//   }, 222000);
// }

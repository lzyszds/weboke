// // 防止处理多次点击全局函数
// // methods是点击后需要执行的函数， param是函数需要传的参数，可传可不传
// function noMulClicks(methods, param) {
//   const _this = this
//   if (_this.noClick) {
//     // 第一次点击时执行
//     _this.noClick = false
//     if ((param && param !== '') || param === 0) {
//       methods(param)
//     } else {
//       methods()
//     }
//     // 添加按键延时设置
//     setTimeout(() => {
//       _this.noClick = true
//     }, 3500)
//   }
// }
// // 导出
// export default {
//   noMulClicks // 禁止多次点击
// }

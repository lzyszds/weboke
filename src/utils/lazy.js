/* 图片懒加载 */

export default {
  mounted(el) {
    const elImg = el.src
    el.src = ''
    const observe = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting == true) {
        el.src = elImg
        observe.unobserve(el)
      }

    })
    observe.observe(el)

  },
}

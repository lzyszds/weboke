
export default {
  mounted(el, binding) {
    const elImg = el.src
    el.src = '/api/common/getLazyLoadGif'
    const observe = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0]
      if (isIntersecting == true) {

        setTimeout(() => {
          el.src = elImg
          observe.unobserve(el)
        }, binding.value * 500);
      }
    })
    observe.observe(el)
  }
}

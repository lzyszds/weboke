const ANIMATION_DURATION = 100; // 动画持续时间，根据您的实际动画调整

const animationState = {
  isAnimating: false,
  pendingElements: new Map(),
  animatingElement: null
};

export const domOrderedAnimateDirective = {
  mounted(el, binding) {
    const observer = new IntersectionObserver((entries) => {
      const { isIntersecting } = entries[0];
      if (isIntersecting) {
        // 将元素添加到待处理Map中
        animationState.pendingElements.set(el, binding.value);
        observer.unobserve(el);

        // 如果当前没有动画在执行，开始执行
        if (!animationState.isAnimating) {
          executeNextAnimation();
        }
      }
    });
    observer.observe(el);
  }
};

function executeNextAnimation() {
  if (animationState.pendingElements.size > 0) {
    animationState.isAnimating = true;

    // 获取DOM中顺序最靠前的元素
    const nextElement: any = findNextElementInDOM(animationState.pendingElements);

    if (nextElement) {
      const animation = animationState.pendingElements.get(nextElement);
      animationState.pendingElements.delete(nextElement);

      nextElement.classList.add('animate__animated');
      nextElement.classList.add(animation);

      animationState.animatingElement = nextElement;

      setTimeout(() => {
        animationState.isAnimating = false;
        animationState.animatingElement = null;
        executeNextAnimation(); // 执行下一个动画
      }, ANIMATION_DURATION)

    }
  } else {
    animationState.isAnimating = false;
  }
}

function findNextElementInDOM(elementsMap) {
  // 将Map转换为数组并根据DOM顺序排序
  const sortedElements = Array.from(elementsMap.keys()).sort((a: any, b) => {
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });

  return sortedElements[0]; // 返回DOM中顺序最靠前的元素
}

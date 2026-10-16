// composables/useSlide.ts
const DURATION = 200;

export function useSlide(duration = DURATION) {
  function slideDown(el: Element, done?: () => void) {
    const node = el as HTMLElement;
    node.style.overflow = 'hidden';
    const anim = node.animate(
      [{ height: '0px' }, { height: `${node.scrollHeight}px` }],
      { duration, easing: 'ease-out' },
    );
    anim.onfinish = () => {
      node.style.overflow = '';
      done?.();
    };
    anim.oncancel = () => {
      node.style.overflow = '';
    };
  }

  function slideUp(el: Element, done?: () => void) {
    const node = el as HTMLElement;
    node.style.overflow = 'hidden';
    const anim = node.animate(
      [{ height: `${node.scrollHeight}px` }, { height: '0px' }],
      { duration, easing: 'ease-out' },
    );
    anim.onfinish = () => {
      node.style.overflow = '';
      done?.();
    };
    anim.oncancel = () => {
      node.style.overflow = '';
    };
  }

  return { slideDown, slideUp };
}
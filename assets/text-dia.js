(() => {
  const root = document.querySelector('.dia-text');
  if (!root) return;
  const words = ['независимость', 'правду', 'Россию'];
  const word = root.querySelector('.dia-text__word');
  const color = root.querySelector('.dia-text__color');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  let generation = 0;

  async function cycle() {
    const currentGeneration = generation;
    try {
      await word.animate([
        { transform: 'translateY(0)', opacity: 1, filter: 'blur(0)' },
        { transform: 'translateY(-100%)', opacity: 0, filter: 'blur(4px)' },
      ], { duration: 240, easing: 'ease-in', fill: 'forwards' }).finished;
      if (currentGeneration !== generation) return;
      index = (index + 1) % words.length;
      color.textContent = words[index];
      word.getAnimations().forEach(animation => animation.cancel());
      word.animate([
        { transform: 'translateY(100%)', opacity: 0, filter: 'blur(4px)' },
        { transform: 'translateY(0)', opacity: 1, filter: 'blur(0)' },
      ], { duration: 450, easing: 'cubic-bezier(.22, 1, .36, 1)' });
      color.animate([
        { backgroundPosition: '100% 0%' },
        { backgroundPosition: '0% 0%' },
      ], { duration: 800, delay: 100, easing: 'ease-in-out', fill: 'backwards' });
      timer = window.setTimeout(cycle, 2400);
    } catch (error) {
      if (error.name !== 'AbortError') throw error;
    }
  }

  function sync() {
    generation++;
    window.clearTimeout(timer);
    word.getAnimations().forEach(animation => animation.cancel());
    color.getAnimations().forEach(animation => animation.cancel());
    if (!reducedMotion.matches && !document.hidden && typeof word.animate === 'function') {
      timer = window.setTimeout(cycle, 2400);
    }
  }
  reducedMotion.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  sync();
})();

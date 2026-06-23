/**
 * Inject slide-deco layer vào mọi .slide — không cần sửa HTML từng slide.
 * Variants: cover | content | section
 * Accents: blue | purple | orange (xoay vòng theo index)
 */
(function initSlideDeco() {
  const ACCENTS = ['blue', 'purple', 'orange'];

  document.querySelectorAll('.slide').forEach((slide, index) => {
    if (slide.querySelector('.slide-deco')) return;

    const isCover = slide.classList.contains('slide-cover');
    const isSection = !isCover && slide.querySelector('.section-divider') && !slide.querySelector('.slide-header');
    const variant = isCover ? 'cover' : isSection ? 'section' : 'content';
    const accent = ACCENTS[index % ACCENTS.length];

    slide.dataset.accent = accent;

    const deco = document.createElement('div');
    deco.className = `slide-deco slide-deco--${variant} slide-deco--accent-${accent}`;
    deco.setAttribute('aria-hidden', 'true');
    deco.innerHTML = `
      <div class="slide-deco__orb"></div>
      <div class="slide-deco__pattern slide-deco__pattern--circuit"></div>
      ${variant === 'cover' ? '<div class="slide-deco__pattern slide-deco__pattern--iso"></div>' : ''}
      <div class="slide-deco__ticks"></div>
      ${variant !== 'cover' ? '<span class="slide-deco__brand">HRIS · Digital Blueprint</span>' : ''}
    `;

    slide.insertBefore(deco, slide.firstChild);
  });

  const coverInfo = document.getElementById('cover-info');
  if (coverInfo && !coverInfo.classList.contains('cad-frame')) {
    coverInfo.classList.add('cad-frame');
    ['tl', 'tr', 'bl', 'br'].forEach((pos) => {
      const corner = document.createElement('span');
      corner.className = `cad-frame__corner cad-frame__corner--${pos}`;
      corner.setAttribute('aria-hidden', 'true');
      coverInfo.appendChild(corner);
    });
  }
})();

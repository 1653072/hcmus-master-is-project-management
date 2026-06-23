/**
 * Điều hướng slide — dùng cho general_slide.html.
 */
(function () {
  const deck = document.getElementById('deck');
  if (!deck) return;

  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const indicator = document.getElementById('indicator');
  let current = 0;

  function showSlide(n) {
    slides[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (indicator) indicator.textContent = (current + 1) + ' / ' + slides.length;
    history.replaceState(null, '', '#slide-' + (current + 1));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(current + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); showSlide(current + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); showSlide(current - 1); }
    if (e.key === 'Home') showSlide(0);
    if (e.key === 'End') showSlide(slides.length - 1);
  });

  const hash = location.hash.match(/^#slide-(\d+)$/);
  if (hash) {
    const idx = parseInt(hash[1], 10) - 1;
    if (idx >= 0 && idx < slides.length) showSlide(idx);
  }
})();

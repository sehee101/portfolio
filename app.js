const dialog = document.querySelector('.image-dialog');
let opener;
document.querySelectorAll('.image-expand').forEach(button => {
  button.addEventListener('click', () => {
    if (!dialog || typeof dialog.showModal !== 'function') {
      window.open(button.dataset.image, '_blank', 'noopener');
      return;
    }
    opener = button;
    const img = document.createElement('img');
    img.src = button.dataset.image;
    img.alt = button.dataset.caption;
    dialog.querySelector('.dialog-image').replaceChildren(img);
    dialog.querySelector('#image-caption').textContent = button.dataset.caption;
    dialog.showModal();
    document.body.classList.add('image-open');
  });
});
dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog?.addEventListener('close', () => {
  document.body.classList.remove('image-open');
  opener?.focus();
});

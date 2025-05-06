const items = document.querySelectorAll('.carousel .item');
let current = 0;

function updateCarousel() {
  items.forEach((item) => {
    item.classList.remove(
      'center', 'left-1', 'left-2',
      'right-1', 'right-2'
    );
    item.style.order = "0";
  });

  const total = items.length;

  const left2  = (current - 2 + total) % total;
  const left1  = (current - 1 + total) % total;
  const right1 = (current + 1) % total;
  const right2 = (current + 2) % total;

  items[current].classList.add('center');
  items[left1].classList.add('left-1');
  items[left2].classList.add('left-2');
  items[right1].classList.add('right-1');
  items[right2].classList.add('right-2');

  items[left2].style.order = "1";
  items[left1].style.order = "2";
  items[current].style.order = "3";
  items[right1].style.order = "4";
  items[right2].style.order = "5";
}

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    if (index === current) {
      window.location.href = item.dataset.url;
    } else {
      current = index;
      updateCarousel();
    }
  });
});

updateCarousel();

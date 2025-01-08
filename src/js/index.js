const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const menuBtn = document.getElementById('menuBtn');
const menuList = document.getElementById('menuList');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  tabsContent.forEach(c => c.classList.add('hidden'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.remove('hidden');
});

menuBtn.addEventListener('click', () => {
  menuList.classList.toggle('hidden');
});

window.addEventListener('click', function (event) {
  if (!menuBtn.contains(event.target) && !menuList.contains(event.target)) {
    menuList.classList.add('hidden');
  }
});

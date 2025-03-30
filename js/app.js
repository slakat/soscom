window.addEventListener('scroll', function () {
  const header = document.getElementById('main-header');
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// PARALLAX EFFECT

const counters = document.querySelectorAll('.kpi-number');
let hasAnimated = false;

function animateCounters() {
  if (hasAnimated) return;
  const section = document.querySelector('.parallax-kpi');
  const sectionTop = section.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 100) {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target.toLocaleString();
        }
      };
      updateCount();
    });
    hasAnimated = true;
  }
}

window.addEventListener('scroll', animateCounters);


// services section

const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
let activeIndex = 0;
const tabOrder = ['obras', 'canal'];

// Tabs click
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    contents[index].classList.add('active');
    activeIndex = index;
  });
});

// Swipe
const servicioSection = document.querySelector('.servicios-section');
const hammer = new Hammer(servicioSection);

hammer.on('swipeleft swiperight', function (ev) {
  if (ev.type === 'swipeleft' && activeIndex < tabOrder.length - 1) {
    activeIndex++;
  } else if (ev.type === 'swiperight' && activeIndex > 0) {
    activeIndex--;
  }

  tabs.forEach(t => t.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));

  document.querySelector(`.tab-btn[data-tab="${tabOrder[activeIndex]}"]`).classList.add('active');
  document.getElementById(tabOrder[activeIndex]).classList.add('active');
});

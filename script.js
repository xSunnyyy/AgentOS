const config = {
  price: 97,
};

const priceTargets = document.querySelectorAll('[data-price-cta]');
for (const target of priceTargets) {
  target.textContent = `Start for $${config.price}`;
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'dark' || storedTheme === 'light') {
  root.dataset.theme = storedTheme;
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  root.dataset.theme = 'dark';
}

const updateToggleEmoji = () => {
  if (!toggle) return;
  toggle.textContent = root.dataset.theme === 'dark' ? '☀️' : '🌙';
};

updateToggleEmoji();

if (toggle) {
  toggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    updateToggleEmoji();
  });
}

const faqItems = document.querySelectorAll('.faq details');
faqItems.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    faqItems.forEach((other) => {
      if (other !== item) other.open = false;
    });
  });
});

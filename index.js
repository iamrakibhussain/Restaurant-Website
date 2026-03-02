const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const menuOverlay = document.querySelector('.menu-overlay');

const openMenu = () => {
    nav.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
};

const closeMenu = () => {
    nav.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
};

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('active')) {
        closeMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && nav.classList.contains('active')) {
        closeMenu();
    }
});

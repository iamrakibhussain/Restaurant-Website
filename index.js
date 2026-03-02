const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');

// Open menu with hamburger icon
menuToggle.addEventListener('click', () => {
    nav.classList.add('active');
});

// Close menu with the 'X' icon
menuClose.addEventListener('click', () => {
    nav.classList.remove('active');
});

// Close menu when a navigation link is clicked
// This is useful for single-page applications
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

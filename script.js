// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.classList.add('hidden');
});

// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('open');
}

// Smooth scrolling
document.querySelectorAll('.smooth-scroll').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        if (!this.classList.contains('block')) return;
        toggleMobileMenu();
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.fade-in').forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
});

// Testimonial slider
let currentSlide = 0;
const slides = document.querySelectorAll('#testimonial-slider > div');
const dots = document.querySelectorAll('.dot');
let autoSlideInterval = setInterval(() => slideTestimonials(1), 5000);
function updateSlider() {
    document.getElementById('testimonial-slider').style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
}
function slideTestimonials(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    updateSlider();
}
function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}
document.querySelector('.testimonial-carousel').addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
document.querySelector('.testimonial-carousel').addEventListener('mouseleave', () => autoSlideInterval = setInterval(() => slideTestimonials(1), 5000));

// Keyboard navigation for testimonial slider
document.querySelectorAll('.dot').forEach((dot, index) => {
    dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goToSlide(index);
        }
    });
});
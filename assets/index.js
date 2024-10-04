document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Add animation to sections when they come into view
    const animatedSections = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        observer.observe(section);
    });

    // Animate skill and contact items
    const animateItems = (items, delay = 100) => {
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * delay);
        });
    };

    const skillItems = document.querySelectorAll('.skills-list li');
    const contactItems = document.querySelectorAll('.contact-list li');

    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });

    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });

    const skillsSection = document.querySelector('#skills');
    const contactSection = document.querySelector('#contact');

    const animateObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target === skillsSection) {
                    animateItems(skillItems);
                } else if (entry.target === contactSection) {
                    animateItems(contactItems);
                }
                animateObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateObserver.observe(skillsSection);
    animateObserver.observe(contactSection);
});
/**
 * ============================================
 * PORTFOLIO WEBSITE - JAVASCRIPT
 * Interactive features and animations
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function () {

    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('mainNavbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Initial check and scroll listener
    handleNavbarScroll();
    window.addEventListener('scroll', handleNavbarScroll);

    // ========== SMOOTH SCROLL NAVIGATION ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }

                // Calculate offset for fixed navbar
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ACTIVE NAV LINK UPDATE ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ========== SCROLL ANIMATIONS (Intersection Observer) ==========
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;

                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);

                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Simple validation
            let isValid = true;
            const inputs = contactForm.querySelectorAll('.form-control');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });

            // Email validation
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;

                submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Message Sent!';
                submitBtn.disabled = true;
                submitBtn.style.background = '#10B981';

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    inputs.forEach(input => {
                        input.classList.remove('is-valid');
                    });
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);

                // Log form data (replace with actual form submission)
                console.log('Form submitted:', { name, email, subject, message });
            }
        });

        // Remove validation states on input
        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function () {
                this.classList.remove('is-invalid');
            });
        });
    }

    // ========== TYPING EFFECT FOR CODE WINDOW (Optional Enhancement) ==========
    const codeBody = document.querySelector('.code-body code');
    if (codeBody) {
        const originalHTML = codeBody.innerHTML;
        const text = codeBody.textContent;

        // Only run typing effect on larger screens
        if (window.innerWidth > 991) {
            codeBody.innerHTML = '';
            let charIndex = 0;

            function typeCode() {
                if (charIndex < originalHTML.length) {
                    codeBody.innerHTML = originalHTML.substring(0, charIndex + 1);
                    charIndex++;

                    // Variable speed for more natural typing
                    const delay = Math.random() * 30 + 20;
                    setTimeout(typeCode, delay);
                }
            }

            // Start typing after a short delay
            setTimeout(typeCode, 1000);
        }
    }

    // ========== PARALLAX EFFECT FOR HERO SHAPES ==========
    const shapes = document.querySelectorAll('.shape');

    if (shapes.length > 0 && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                const x = (mouseX - 0.5) * speed;
                const y = (mouseY - 0.5) * speed;

                shape.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // ========== COUNTER ANIMATION FOR STATS ==========
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                let currentValue = 0;
                const increment = Math.ceil(finalValue / 50);
                const duration = 1500;
                const stepTime = duration / (finalValue / increment);

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = target.textContent.includes('+')
                            ? finalValue + '+'
                            : finalValue + '+';
                        clearInterval(counter);
                    } else {
                        target.textContent = currentValue + '+';
                    }
                }, stepTime);

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

});

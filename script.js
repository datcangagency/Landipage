document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Custom Cursor Glow
    const cursorGlow = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Cursor interactions with buttons/links
    const interactables = document.querySelectorAll('a, button, .service-card, .about-image-card');
    
    interactables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 51, 51, 0.25) 0%, transparent 60%)';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            cursorGlow.style.background = 'radial-gradient(circle, rgba(230, 0, 0, 0.15) 0%, transparent 60%)';
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Navbar Scroll State
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Initial Hero Animation
    setTimeout(() => {
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                
                // If it's the about section with stats, trigger counter animation
                if (entry.target.classList.contains('reveal-right')) {
                    startCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Stat Counters Animation
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        countersStarted = true;
        
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200; // lower is slower
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Lower inc to slow and higher to fast
                const inc = target / speed;
                
                // Check if target is reached
                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target + (target > 90 ? '+' : '');
                    if(target === 98) counter.innerText = '98%'; // For percentage stat
                }
            };
            
            updateCount();
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when clicking a link
        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

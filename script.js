/**
 * PORTFOLIO NDOUWE SALVADOR - JAVASCRIPT
 * Interactive features and animations
 * Production-ready with EmailJS integration
 */

// ============================================
// EMAILJS CONFIGURATION
// ============================================
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'iwv0lkPja6Y4132Bx',
    SERVICE_ID: 'service_mryopdc',
    TEMPLATE_ID: 'template_3et1u5j'
};

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    initEmailJS();
    
    // Initialize all components
    initNavbar();
    initTypingEffect();
    initParticles();
    initScrollAnimations();
    initSkillBars();
    initCounterAnimation();
    initProjectFilter();
    initContactForm();
    initBackToTop();
    initSmoothScroll();
    initActiveNavLink();
    initWhatsAppFloat();
});

// ============================================
// EMAILJS INITIALIZATION
// ============================================
function initEmailJS() {
    try {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
        console.log('%c✉️ EmailJS initialized successfully', 'color: #00d4ff; font-size: 12px;');
    } catch (error) {
        console.error('EmailJS initialization error:', error);
    }
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu on link click
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const titles = [
        'Ingénieur Électricien',
        'Expert Hyperfréquence',
        'Spécialiste Énergie Solaire',
        'Chercheur en Physique'
    ];
    
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before new word
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a delay
    setTimeout(type, 1000);
}

// ============================================
// PARTICLES ANIMATION
// ============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random properties
    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;
    
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;
    
    container.appendChild(particle);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-header, .skill-card, .project-card, .service-card, .research-card, .contact-card'
    );
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// ============================================
// SKILL BARS ANIMATION
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
                
                observer.unobserve(bar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeOut);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// PROJECT FILTER
// ============================================
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ============================================
// CONTACT FORM - EMAILJS INTEGRATION
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Disable submit button during sending
        setSubmitButtonState(submitBtn, 'loading');
        
        try {
            // Send email using EmailJS
            const result = await emailjs.sendForm(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                form
            );
            
            console.log('Email sent successfully:', result);
            
            // Show success message
            showToast('Message envoyé avec succès ! Je vous répondrai sous 24h.', 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Email sending error:', error);
            showToast('Erreur lors de l\'envoi. Veuillez réessayer ou utiliser WhatsApp.', 'error');
        } finally {
            // Re-enable submit button
            setSubmitButtonState(submitBtn, 'ready');
        }
    });
}

function validateForm(data) {
    const { name, email, subject, message } = data;
    
    // Check empty fields
    if (!name || !email || !subject || !message) {
        showToast('Veuillez remplir tous les champs', 'error');
        return false;
    }
    
    // Name validation (minimum 2 characters)
    if (name.trim().length < 2) {
        showToast('Veuillez entrer un nom valide', 'error');
        return false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Veuillez entrer une adresse email valide', 'error');
        return false;
    }
    
    // Subject validation (minimum 3 characters)
    if (subject.trim().length < 3) {
        showToast('Veuillez entrer un sujet plus descriptif', 'error');
        return false;
    }
    
    // Message validation (minimum 10 characters)
    if (message.trim().length < 10) {
        showToast('Veuillez décrire votre projet en plus de détails', 'error');
        return false;
    }
    
    return true;
}

function setSubmitButtonState(button, state) {
    const originalText = button.querySelector('span').textContent;
    const icon = button.querySelector('i');
    
    switch (state) {
        case 'loading':
            button.disabled = true;
            button.querySelector('span').textContent = 'Envoi en cours...';
            icon.className = 'fas fa-spinner fa-spin';
            break;
        case 'ready':
            button.disabled = false;
            button.querySelector('span').textContent = 'Envoyer le message';
            icon.className = 'fas fa-paper-plane';
            break;
        case 'success':
            button.disabled = false;
            button.querySelector('span').textContent = 'Message envoyé !';
            icon.className = 'fas fa-check';
            setTimeout(() => setSubmitButtonState(button, 'ready'), 3000);
            break;
    }
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    
    // Update icon based on type
    const icon = toast.querySelector('i');
    if (icon) {
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    }
    
    // Update background color
    toast.style.background = type === 'success' ? 'var(--success)' : 'var(--error)';
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ============================================
// BACK TO TOP
// ============================================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// WHATSAPP FLOAT BUTTON
// ============================================
function initWhatsAppFloat() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    if (!whatsappFloat) return;
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            whatsappFloat.classList.add('visible');
        } else {
            whatsappFloat.classList.remove('visible');
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// ACTIVE NAV LINK
// ============================================
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            
            if (scrollY >= sectionTop - navbarHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// PARALLAX EFFECT (Optional)
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// MOUSE MOVE EFFECT (Optional - Desktop only)
// ============================================
if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.gradient-orb');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 10;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            orb.style.transform += ` translate(${xOffset}px, ${yOffset}px)`;
        });
    });
}

// ============================================
// PERFORMANCE: Pause animations when tab is hidden
// ============================================
document.addEventListener('visibilitychange', () => {
    const particles = document.querySelectorAll('.particle');
    
    if (document.hidden) {
        particles.forEach(p => p.style.animationPlayState = 'paused');
    } else {
        particles.forEach(p => p.style.animationPlayState = 'running');
    }
});

// ============================================
// CONSOLE GREETING
// ============================================
console.log('%c⚡ Ndouwe Salvador - Portfolio', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cIngénieur Électricien | Hyperfréquence | Énergie Solaire', 'color: #a0a0b0; font-size: 14px;');
console.log('%cContact: ndouwesalvador@email.com | +33 7 59 36 00 81', 'color: #00d4ff; font-size: 12px;');

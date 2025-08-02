// ========================================
// GLOBAL VARIABLES
// ========================================
let currentTestimonial = 0;
let testimonials = [];
let dots = [];

// ========================================
// DOM CONTENT LOADED
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeTestimonialSlider();
    initializeFormHandlers();
    initializeAnimations();
    initializeBackToTop();
    initializeSmoothScrolling();
});

// ========================================
// NAVIGATION
// ========================================
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle with enhanced functionality
    if (menuToggle && navMenu) {
        // Ensure mobile menu is properly initialized
        navMenu.style.display = 'flex';
        
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = navMenu.classList.contains('active');
            
            if (isActive) {
                // Close menu
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            } else {
                // Open menu
                navMenu.classList.add('active');
                menuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            }
            
            // Enhanced hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (menuToggle.classList.contains('active')) {
                    switch(index) {
                        case 0:
                            span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                            break;
                        case 1:
                            span.style.opacity = '0';
                            break;
                        case 2:
                            span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                            break;
                    }
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                    });
                }
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        }
    });

    // Active nav link highlighting
    highlightActiveNavLink();
}

function getMenuAnimation(index) {
    const animations = [
        'rotate(45deg) translate(5px, 5px)',
        'opacity: 0',
        'rotate(-45deg) translate(7px, -6px)'
    ];
    return animations[index];
}

function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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

// ========================================
// SCROLL EFFECTS
// ========================================
function initializeScrollEffects() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Counter animation
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const countUp = (counter) => {
        const dataCount = counter.getAttribute('data-count');
        const target = dataCount ? parseFloat(dataCount) : parseFloat(counter.innerText.replace(/[^\d.]/g, ''));
        let count = 0;
        const inc = target / speed;

        const updateCounter = () => {
            if (count < target) {
                count += inc;
                const currentCount = Math.ceil(count);
                counter.innerText = formatNumber(currentCount, counter.innerText);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = formatNumber(target, counter.innerText);
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function formatNumber(num, original) {
    if (original.includes('+')) return num + '+';
    if (original.includes('%')) return num + '%';
    if (original.includes('.')) {
        // For numbers like 3.247, 9.847
        if (num >= 1000) {
            return num.toLocaleString('tr-TR');
        }
        return num.toString();
    }
    return num.toString();
}

// ========================================
// TESTIMONIAL SLIDER
// ========================================
function initializeTestimonialSlider() {
    console.log('Initializing testimonial slider...');
    
    // Initialize testimonials and dots arrays
    testimonials = document.querySelectorAll('.testimonial-card');
    dots = document.querySelectorAll('.dot');
    
    console.log('Found testimonials:', testimonials.length);
    console.log('Found dots:', dots.length);
    
    // Reset all testimonials first
    testimonials.forEach((testimonial, index) => {
        testimonial.classList.remove('active');
    });
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
    });
    
    // Set first testimonial as active
    if (testimonials.length > 0) {
        testimonials[0].classList.add('active');
        console.log('Set first testimonial as active');
    }
    if (dots.length > 0) {
        dots[0].classList.add('active');
        console.log('Set first dot as active');
    }
    
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialsDots');

    console.log('Buttons found:', !!prevBtn, !!nextBtn);

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Previous button clicked');
            changeTestimonial(-1);
        });
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Next button clicked');
            changeTestimonial(1);
        });
    }

    if (dotsContainer) {
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                console.log('Dot clicked, going to slide:', slideIndex);
                goToTestimonial(slideIndex);
            }
        });
    }

    // Auto-play testimonials (commented out for debugging)
    // setInterval(() => {
    //     changeTestimonial(1);
    // }, 5000);

    // Touch/swipe support for mobile
    addSwipeSupport();
}

function changeTestimonial(direction) {
    if (!testimonials.length) {
        console.log('No testimonials found');
        return;
    }

    
    testimonials[currentTestimonial].classList.remove('active');
    dots[currentTestimonial]?.classList.remove('active');

    currentTestimonial += direction;

    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }
    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }

    
    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial]?.classList.add('active');
}

function goToTestimonial(index) {
    if (!testimonials.length) return;

    testimonials[currentTestimonial].classList.remove('active');
    dots[currentTestimonial]?.classList.remove('active');

    currentTestimonial = index;

    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial]?.classList.add('active');
}

function addSwipeSupport() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;

    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                changeTestimonial(1); // Swipe left - next
            } else {
                changeTestimonial(-1); // Swipe right - previous
            }
        }
    }
}

// ========================================
// FORM HANDLERS
// ========================================
function initializeFormHandlers() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    // Contact buttons
    const contactButtons = document.querySelectorAll('[href="#iletisim"]');
    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToContact();
        });
    });
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (validateEmail(email)) {
        // Simulate newsletter subscription
        showNotification('Bülten aboneliğiniz başarıyla gerçekleştirildi!', 'success');
        e.target.reset();
    } else {
        showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function scrollToContact() {
    const contactSection = document.getElementById('iletisim');
    if (contactSection) {
        contactSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ========================================
// ANIMATIONS
// ========================================
function initializeAnimations() {
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('featured') 
                ? 'scale(1.05)' 
                : 'translateY(0) scale(1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    });

    // Logo animation
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.style.transform = 'rotate(360deg)';
            logo.style.transition = 'transform 0.6s ease';
        });
        
        logo.addEventListener('mouseleave', () => {
            logo.style.transform = 'rotate(0deg)';
        });
    }
}

// ========================================
// BACK TO TOP
// ========================================
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================
// Smooth scrolling is now handled in the unified button system above
function initializeSmoothScrolling() {
    // This function is now deprecated - all scroll handling is done in the unified system
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================
// Optimize scroll events with debouncing
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ========================================
// ACCESSIBILITY ENHANCEMENTS
// ========================================
function initializeAccessibility() {
    // Focus management for mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                menuToggle.click();
            }
        });
    }
    
    // Keyboard navigation for testimonial slider
    document.addEventListener('keydown', (e) => {
        if (e.target.closest('.testimonials')) {
            if (e.key === 'ArrowLeft') {
                changeTestimonial(-1);
            } else if (e.key === 'ArrowRight') {
                changeTestimonial(1);
            }
        }
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Ana içeriğe geç';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// ========================================
// CONTACT FORM ENHANCEMENT
// ========================================
// Create contact modal function
function createContactModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Ücretsiz Görüşme Rezervasyonu</h3>
                <button class="modal-close" aria-label="Kapat">&times;</button>
            </div>
            <div class="modal-body">
                <form class="contact-form" id="contactForm">
                    <div class="form-group">
                        <label for="modal-name">Adınız Soyadınız *</label>
                        <input type="text" id="modal-name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="modal-email">E-posta Adresiniz *</label>
                        <input type="email" id="modal-email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="modal-phone">Telefon Numaranız *</label>
                        <input type="tel" id="modal-phone" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="modal-service">İlgilendiğiniz Hizmet *</label>
                        <select id="modal-service" name="service" required>
                            <option value="">Seçiniz</option>
                            <option value="yasam-koclugu">Yaşam Koçluğu</option>
                            <option value="ogrenci-koclugu">Öğrenci Koçluğu</option>
                            <option value="yonetici-koclugu">Yönetici Koçluğu</option>
                            <option value="kariyer-koclugu">Kariyer Koçluğu</option>
                            <option value="ilişki-koclugu">İlişki Koçluğu</option>
                            <option value="ebeveyn-koclugu">Ebeveyn Koçluğu</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="modal-message">Mesajınız (Opsiyonel)</label>
                        <textarea id="modal-message" name="message" rows="3" placeholder="Hedefleriniz ve beklentileriniz hakkında kısa bilgi verebilirsiniz..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary btn-large">
                        <i class="fas fa-paper-plane"></i>
                        Görüşme Talebini Gönder
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    return modal;
}

// Perfect scroll function for all sections
function smoothScrollToElement(targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;
    
    // Special precise handling for services section
    if (targetId === 'hizmetler') {
        setTimeout(() => {
            // Find the section-tag (HİZMETLERİMİZ) element for perfect positioning
            const sectionTag = targetElement.querySelector('.section-tag');
            
            if (sectionTag) {
                const headerHeight = 80;
                const perfectPadding = 10; // Minimal spacing to show "HİZMETLERİMİZ" tag right below header
                
                const elementTop = sectionTag.offsetTop;
                const targetPosition = elementTop - headerHeight - perfectPadding;
                
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            } else {
                // Fallback to section-header if section-tag not found
                const sectionHeader = targetElement.querySelector('.section-header');
                const scrollTarget = sectionHeader || targetElement;
                
                const headerHeight = 80;
                const padding = 30;
                
                const elementTop = scrollTarget.offsetTop;
                const targetPosition = elementTop - headerHeight - padding;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        }, 150);
        return;
    }
    
    // Default scroll for other sections  
    setTimeout(() => {
        const headerHeight = 80;
        const padding = 40;
        
        const elementTop = targetElement.offsetTop;
        const targetPosition = elementTop - headerHeight - padding;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }, 150);
}

// Initialize all button functionality
document.addEventListener('DOMContentLoaded', function() {
    let contactModal = null;
    
    // Function to open modal
    function openContactModal(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        if (!contactModal) {
            contactModal = createContactModal();
            initializeContactModal(contactModal);
        }
        
        // Prevent any scrolling
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        contactModal.classList.add('active');
        
        return false;
    }
    
    // Handle all buttons that should open modal
    const modalTriggers = document.querySelectorAll('a');
    
    modalTriggers.forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        
        // Check if this should trigger modal
        if ((href === '#iletisim' || href === 'iletisim.html') && 
            (text.includes('Ücretsiz Görüşme') || 
             text.includes('Görüşme') ||
             link.classList.contains('btn-primary'))) {
            
            link.addEventListener('click', openContactModal, true);
        }
    });
    
    // Handle all other internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        const text = link.textContent.trim();
        
        // Skip modal triggers
        if (text.includes('Ücretsiz Görüşme') || 
            text.includes('Görüşme') ||
            link.classList.contains('btn-primary')) {
            return;
        }
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            smoothScrollToElement(targetId);
        });
    });
});

function initializeContactModal(modal) {
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const form = modal.querySelector('.contact-form');
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        showNotification('Görüşme talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'success');
        
        form.reset();
        closeModal();
    });
}
        
function handleFormSubmit(form, closeModal) {
    form.reset();
    closeModal();
}

// Add modal styles
const modalStyles = `
    .contact-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1001;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .contact-modal.active {
        opacity: 1;
        visibility: visible;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        position: relative !important;
        background: white;
        border-radius: 20px;
        max-width: 500px !important;
        width: 90% !important;
        max-height: calc(100vh - 40px) !important;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 2 !important;
        transform: scale(0.8) translateY(20px);
        transition: all 0.3s ease;
    }
    
    .contact-modal.active .modal-content {
        transform: scale(1) translateY(0) !important;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 30px 20px;
        border-bottom: 1px solid #e9ecef;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #2C5AA0;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #6c757d;
        transition: color 0.2s ease;
    }
    
    .modal-close:hover {
        color: #E76F51;
    }
    
    .modal-body {
        padding: 20px 30px 30px;
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #343a40;
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 12px 16px;
        border: 2px solid #e9ecef;
        border-radius: 12px;
        font-size: 16px;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #2C5AA0;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        z-index: 1002;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        min-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-content {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .notification-success {
        border-left: 4px solid #28a745;
    }
    
    .notification-error {
        border-left: 4px solid #dc3545;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        margin-left: 15px;
        color: #6c757d;
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
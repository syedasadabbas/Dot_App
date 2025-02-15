// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Form validation and enhanced UX
document.querySelector('.registration-form').addEventListener('submit', function(e) {
    const phoneNumber = document.getElementById('phone_number').value;
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    
    if (!phoneRegex.test(phoneNumber)) {
        e.preventDefault();
        showToast('Please enter a valid phone number', 'error');
        return;
    }

    // Add loading state to submit button
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Registering...';
    submitBtn.disabled = true;
});

// Interactive feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.querySelector('.feature-icon').style.transform = 'scale(1.2) rotate(10deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.querySelector('.feature-icon').style.transform = 'scale(1) rotate(0)';
    });
});

// Custom toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(toast);

    // Trigger reflow
    toast.offsetHeight;

    // Add show class
    toast.classList.add('show');

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Animate numbers in features
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize number animations when elements come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateValue(entry.target, 0, parseInt(entry.target.dataset.value), 2000);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.animate-number').forEach((number) => observer.observe(number));

// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });
});

// Learning Path Image Popup
function showPathImage(path) {
    const modal = new bootstrap.Modal(document.getElementById('pathModal'));
    const imageElement = document.getElementById('pathImage');
    
    // Set image source based on path
    switch(path) {
        case 'frontend':
            imageElement.src = '/static/images/FronE-End.png';
            break;
        case 'backend':
            imageElement.src = '/static/images/BackEnd.png';
            break;
        case 'ai':
            imageElement.src = '/static/images/AI.png';
            break;
    }
    
    // Show modal
    modal.show();
}

// Path Explorer Functionality
document.addEventListener('DOMContentLoaded', function() {
    const pathButtons = document.querySelectorAll('.path-btn');
    const learningJourney = document.getElementById('learning-journey');
    const frontendPath = document.getElementById('frontend-path');
    const backendPath = document.getElementById('backend-path');
    const aiPath = document.getElementById('ai-path');

    // Hide all paths initially except learning journey
    learningJourney.classList.add('active');

    pathButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            pathButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Hide learning journey
            learningJourney.classList.remove('active');

            // Hide all paths
            [frontendPath, backendPath, aiPath].forEach(path => {
                path.classList.remove('active');
            });

            // Show selected path
            const pathType = this.getAttribute('data-path');
            switch(pathType) {
                case 'frontend':
                    frontendPath.classList.add('active');
                    break;
                case 'backend':
                    backendPath.classList.add('active');
                    break;
                case 'ai':
                    aiPath.classList.add('active');
                    break;
            }
        });
    });
});

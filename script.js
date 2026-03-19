document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Run once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // 3. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // 4. Contact Form to WhatsApp Logic
    const demoForm = document.getElementById('demo-form');
    
    if(demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('name').value;
            const school = document.getElementById('school').value;
            const city = document.getElementById('city').value;
            const phone = document.getElementById('phone').value;
            const msg = document.getElementById('message').value;

            // Construct text payload
            const textToSend = `*New Demo Request - CampusBot*%0A%0A*Name:* ${name}%0A*School:* ${school}%0A*City:* ${city}%0A*Number:* ${phone}%0A*Message:* ${msg || 'N/A'}`;

            // Replace with the ACTUAL destination WhatsApp number for CampusBot
            const destinationPhone = '919994320609'; 
            const whatsappUrl = `https://wa.me/${destinationPhone}?text=${textToSend}`;

            // Open in new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Reset form
            demoForm.reset();
        });
    }

    // 5. Basic Privacy Policy Modal/Alert (Optional handling for the link)
    const privacyLink = document.getElementById('privacy-link');
    if(privacyLink) {
        privacyLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert("Privacy Policy: CampusBot uses the official WhatsApp Business API. We do not sell, rent, or share your school's or parents' data with any third parties. All communications are end-to-end encrypted by WhatsApp.");
        });
    }
});
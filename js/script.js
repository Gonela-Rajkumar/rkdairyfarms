/* ==========================================================================
   RK Dairy Farm - Interactive JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('open');
        });

        // Close mobile drawer when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Active Navigation Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
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

    // 3. Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 4. Subscription Form Submission Handler
    const subscriptionForm = document.getElementById('subscriptionForm');
    const subSuccessMsg = document.getElementById('subSuccessMsg');

    if (subscriptionForm) {
        subscriptionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            subSuccessMsg.style.display = 'block';
            subscriptionForm.reset();
            setTimeout(() => {
                subSuccessMsg.style.display = 'none';
            }, 6000);
        });
    }

    // 5. Contact Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    const contactSuccessMsg = document.getElementById('contactSuccessMsg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // If Formspree URL is set, form will submit natively or via Ajax.
            // For now, prevent default and display success message demo:
            e.preventDefault();
            contactSuccessMsg.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                contactSuccessMsg.style.display = 'none';
            }, 6000);
        });
    }
});

// 6. Milk Subscription Dynamic Calculator
function calculatePrice() {
    const litresInput = document.getElementById('calcLitres');
    const litresVal = document.getElementById('litresVal');
    const totalPrice = document.getElementById('totalPrice');

    if (litresInput && litresVal && totalPrice) {
        const litres = parseFloat(litresInput.value);
        const ratePerLiter = 75; // Rate for pure buffalo milk
        const monthlyTotal = litres * ratePerLiter * 30;

        litresVal.textContent = `${litres} Liter${litres > 1 ? 's' : ''} / Day`;
        totalPrice.textContent = `₹${monthlyTotal.toLocaleString('en-IN')}`;
    }
}

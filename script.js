/* =========================================================
   GYPSY CARTEL — PRODUCTION MASTER JS v1.2
   STATUS: LOCKED (Old Cursor Logic + New Features)
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       1. GLOBAL PAGE LOAD (Cinematic Lift)
    ========================================================= */
    // Wait for everything to load, then trigger the lift
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);
    });


    /* =========================================================
       2. YOUR EXACT OLD CURSOR LOGIC (RESTORED)
    ========================================================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;

    // Only run if cursor elements exist
    if (cursorDot && cursorOutline) {

        // 🔒 Activate custom cursor class
        document.body.classList.add('gc-cursor-active');

        // 1. Track Mouse Position
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instant follow for Dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // 2. Smooth Follow for Outline (Your RequestAnimationFrame Logic)
        const followCursor = () => {
            cursorOutline.style.left = `${mouseX}px`;
            cursorOutline.style.top = `${mouseY}px`;
            requestAnimationFrame(followCursor);
        };
        followCursor();

        // 3. Hover Zoom Logic (Extended to include new elements)
        const interactiveSelectors = 'a, button, input, textarea, .btn, .apps-gallery-img, .apps-gallery-arrow, .gc-dropdown-selected, .logo-icon';
        
        document.querySelectorAll(interactiveSelectors).forEach(el => {
            el.addEventListener('mouseenter', () => {
                // Your specific scale transform
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }


    /* =========================================================
       3. PREMIUM DROPDOWN (Studio Selector)
    ========================================================= */
    const dropdowns = document.querySelectorAll('.gc-dropdown');

    dropdowns.forEach(dropdown => {
        const selected = dropdown.querySelector('.gc-dropdown-selected');
        const list = dropdown.querySelector('.gc-dropdown-list');
        const items = dropdown.querySelectorAll('.gc-dropdown-list li');
        const input = dropdown.querySelector('input[type="hidden"]'); // If you use one

        // Toggle Open/Close
        selected.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        // Select Item
        items.forEach(item => {
            item.addEventListener('click', () => {
                selected.textContent = item.textContent;
                dropdown.classList.remove('open');
                
                // Update hidden input if it exists
                if(input) input.value = item.getAttribute('data-value');

                // Visual Active State
                items.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('open'));
    });


    /* =========================================================
       4. APPS GALLERY SLIDER (Scroll & Arrows)
    ========================================================= */
    const track = document.querySelector('.apps-gallery-track');
    const btnLeft = document.querySelector('.apps-gallery-arrow.left');
    const btnRight = document.querySelector('.apps-gallery-arrow.right');

    if (track && btnLeft && btnRight) {
        btnLeft.addEventListener('click', () => {
            track.scrollBy({ left: -340, behavior: 'smooth' });
        });

        btnRight.addEventListener('click', () => {
            track.scrollBy({ left: 340, behavior: 'smooth' });
        });
    }


    /* =========================================================
       5. APPS MODAL (Lightbox)
    ========================================================= */
    const modal = document.querySelector('.apps-modal');
    const modalImg = document.querySelector('.apps-modal-img');
    const modalClose = document.querySelector('.apps-modal-close');
    const galleryImages = document.querySelectorAll('.apps-gallery-img');
    
    // Modal Navigation Arrows
    const modalArrowLeft = document.querySelector('.apps-modal-arrow.left');
    const modalArrowRight = document.querySelector('.apps-modal-arrow.right');
    
    let currentImageIndex = 0;

    if (modal && galleryImages.length > 0) {

        // Open Modal
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentImageIndex = index;
                updateModalImage();
                modal.style.display = 'flex';
                // Trigger animation
                requestAnimationFrame(() => {
                    modalImg.style.opacity = "1";
                    modalImg.style.transform = "scale(1)";
                });
            });
        });

        // Update Image Helper
        const updateModalImage = () => {
            const src = galleryImages[currentImageIndex].src;
            modalImg.src = src;
        };

        // Close Modal
        const closeModal = () => {
            modal.style.display = 'none';
        };

        if(modalClose) modalClose.addEventListener('click', closeModal);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Navigate Left
        if(modalArrowLeft) {
            modalArrowLeft.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateModalImage();
                }
            });
        }

        // Navigate Right
        if(modalArrowRight) {
            modalArrowRight.addEventListener('click', (e) => {
                e.stopPropagation();
                if (currentImageIndex < galleryImages.length - 1) {
                    currentImageIndex++;
                    updateModalImage();
                }
            });
        }
    }


    /* =========================================================
       6. AJAX CONTACT FORM (From Your Original Script)
    ========================================================= */
    const designForm = document.getElementById('designForm');

    if (designForm) {
        designForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const successMsg = document.getElementById('design-success');
            const formData = new FormData(designForm);

            try {
                const response = await fetch(designForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    designForm.reset();
                    if(successMsg) successMsg.style.display = 'block';
                } else {
                    alert('Submission failed. Please try again.');
                }
            } catch (error) {
                alert('Network error. Please try again.');
            }
        });
    }

}); // End DOMContentLoaded


/* =========================================================
   7. LEGAL PAGES (Global Functions)
   Keep these outside DOMContentLoaded so HTML onclick works
========================================================= */
function openPolicy(type) {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');

    if (!modal || !content) return;

    if (type === 'privacy') {
        content.innerHTML = `
            <h2 style="color:var(--primary-orange); margin-bottom:15px;">Privacy Policy</h2>
            <p>Gypsy Cartel respects your privacy. We collect only the information you voluntarily provide through our website forms.</p>
            <p>We do not sell, rent, or share your personal data. Form submissions may be securely processed using trusted third-party services.</p>
            <p>For questions, contact <strong>support@gypsycartel.shop</strong></p>
        `;
    }

    if (type === 'terms') {
        content.innerHTML = `
            <h2 style="color:var(--primary-orange); margin-bottom:15px;">Terms of Service</h2>
            <p>By accessing or using the Gypsy Cartel website, you agree to comply with these terms.</p>
            <p>Submitting a project request does not guarantee acceptance or delivery. All pricing is discussed separately.</p>
            <p>All designs and content are the intellectual property of Gypsy Cartel.</p>
        `;
    }

    modal.classList.remove('gc-hidden');
    modal.scrollTop = 0;
}

function closePolicy() {
    const modal = document.getElementById('policy-modal');
    if (modal) {
        modal.classList.add('gc-hidden');
    }
}

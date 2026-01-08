document.addEventListener('DOMContentLoaded', () => {

    /* ===============================
       CUSTOM CURSOR
    =============================== */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    let mouseX = 0;
    let mouseY = 0;

    if (cursorDot && cursorOutline) {

        /* 🔒 Activate custom cursor ONLY when ready */
        document.body.classList.add('gc-cursor-active');

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        /* smooth follow using requestAnimationFrame (NO animation stacking) */
        const followCursor = () => {
            cursorOutline.style.left = `${mouseX}px`;
            cursorOutline.style.top = `${mouseY}px`;
            requestAnimationFrame(followCursor);
        };
        followCursor();

        document.querySelectorAll('a, button, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform =
                    'translate(-50%, -50%) scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform =
                    'translate(-50%, -50%) scale(1)';
            });
        });
    }

    /* ===============================
       POLICY MODAL – FORCE SAFE STATE
    =============================== */
    const modal = document.getElementById('policy-modal');
    if (modal) {
        modal.classList.add('gc-hidden'); // always hidden on load
    }
});

/* ===============================
   POLICY OPEN / CLOSE FUNCTIONS
=============================== */
function openPolicy(type) {
    const modal = document.getElementById('policy-modal');
    const content = document.getElementById('policy-content');

    if (!modal || !content) return;

    if (type === 'privacy') {
        content.innerHTML = `
            <h2 style="color:var(--primary-orange); margin-bottom:15px;">
                Privacy Policy
            </h2>
            <p>
                Gypsy Cartel respects your privacy. We collect only the
                information you voluntarily provide through our website
                forms to respond to inquiries and project requests.
            </p>
            <p>
                We do not sell, rent, or share your personal data.
                Form submissions may be securely processed using
                trusted third-party services such as Formspree.
            </p>
            <p>
                Reasonable security measures are taken, but no
                online transmission is 100% secure.
            </p>
            <p>
                For questions, contact
                <strong>support@gypsycartel.shop</strong>
            </p>
        `;
    }

    if (type === 'terms') {
        content.innerHTML = `
            <h2 style="color:var(--primary-orange); margin-bottom:15px;">
                Terms of Service
            </h2>
            <p>
                By accessing or using the Gypsy Cartel website,
                you agree to comply with these terms.
            </p>
            <p>
                Submitting a project request does not guarantee
                acceptance or delivery. All pricing, timelines,
                and deliverables are discussed separately.
            </p>
            <p>
                All designs, graphics, software, logos, and content
                are the intellectual property of Gypsy Cartel.
                Unauthorized use is prohibited.
            </p>
            <p>
                Gypsy Cartel is not liable for damages arising
                from use or inability to use this website.
            </p>
        `;
    }

    modal.scrollTop = 0;   // prevent half-open scroll bug
    modal.classList.remove('gc-hidden');
}

/* ===============================
   CLOSE POLICY MODAL
=============================== */
function closePolicy() {
    const modal = document.getElementById('policy-modal');
    if (modal) {
        modal.classList.add('gc-hidden');
    }
}
/* ===============================
   DESIGN FORM — AJAX SUBMIT (NO REDIRECT)
=============================== */
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
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                designForm.reset();
                successMsg.style.display = 'block';
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (error) {
            alert('Network error. Please try again.');
        }
    });
}
/* ===============================
   LOAD HEADER & FOOTER PARTIALS
   (STATIC SAFE — GITHUB PAGES)
=============================== */
document.addEventListener('DOMContentLoaded', () => {

    // Load Header
    fetch('/partials/header.html')
        .then(res => res.text())
        .then(html => {
            const headerMount = document.getElementById('site-header');
            if (headerMount) headerMount.innerHTML = html;

            // Activate current nav
            const path = window.location.pathname;
            document.querySelectorAll('nav a[data-nav]').forEach(link => {
                if (path === '/' && link.dataset.nav === 'home') {
                    link.classList.add('active');
                } else if (path.includes(link.dataset.nav)) {
                    link.classList.add('active');
                }
            });
        });

    // Load Footer
    fetch('/partials/footer.html')
        .then(res => res.text())
        .then(html => {
            const footerMount = document.getElementById('site-footer');
            if (footerMount) footerMount.innerHTML = html;

            // Dynamic Year
            const y = document.getElementById('year');
            if (y) y.textContent = new Date().getFullYear();
        });

});

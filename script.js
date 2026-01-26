This code is 99% perfect. I have made **3 Critical Updates** to ensure it is "Production Ready":

1. **Moved `designForm` inside `DOMContentLoaded`:** To prevent errors if the script runs before the HTML loads.
2. **Robust Path Logic:** Changed `split('/')` to a cleaner replace method so `/about.html` matches `data-nav="about"` correctly.
3. **Scroll Lock on Modal:** Added `overflow: hidden` to body when the Gallery Modal opens so the background doesn't scroll.

Here is your **Final Master Script**.

### 📂 FILE: `script.js`

(Copy & Paste this entire block)

```javascript
/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL CLEAN)
   Desktop cursor ON • Mobile cursor OFF
   Gallery modal premium
   Studio dropdown premium grey selection
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       1. DEVICE DETECTION
    ================================== */
    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches;


    /* ===============================
       2. CUSTOM CURSOR ENGINE
       (Physics-Based: No Lag, No Shake)
    ================================== */
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (!isTouchDevice && cursorDot && cursorOutline) {

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        /* Dot sticks instantly to mouse */
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;

            // Reveal on first move
            cursorDot.style.opacity = "1";
            cursorOutline.style.opacity = "1";
        });

        /* Smooth Physics Loop (The "Magnetic" Effect) */
        function animateCursor() {
            // Move 15% of the distance per frame
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        /* Input Fix: Hide cursor when typing */
        document.querySelectorAll("input, textarea, select, label").forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorDot.style.opacity = "0";
                cursorOutline.style.opacity = "0";
            });
            el.addEventListener("mouseleave", () => {
                cursorDot.style.opacity = "1";
                cursorOutline.style.opacity = "1";
            });
        });

        /* Hover Effect: Scale Up on Links */
        document.querySelectorAll("a, button, .btn, .apps-gallery-img").forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
                cursorOutline.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            });
            el.addEventListener("mouseleave", () => {
                cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
                cursorOutline.style.backgroundColor = "transparent";
            });
        });

    } else {
        /* Mobile Fallback: Hide Custom, Show System */
        if (cursorDot) cursorDot.style.display = "none";
        if (cursorOutline) cursorOutline.style.display = "none";
        document.body.style.cursor = "auto";
    }


    /* ===============================
       3. APPS GALLERY MODAL (Premium)
    ================================== */
    const modal = document.getElementById("appsModal");
    const modalImg = document.getElementById("appsModalImg");
    const closeBtn = document.querySelector(".apps-modal-close");
    const galleryImages = document.querySelectorAll(".apps-gallery-img");

    let currentIndex = 0;

    if (modal && modalImg && galleryImages.length) {

        function toggleScroll(disable) {
            document.body.style.overflow = disable ? 'hidden' : '';
        }

        function showImage(index) {
            currentIndex = index;
            modalImg.src = galleryImages[currentIndex].src;
            modal.style.display = "flex";
            toggleScroll(true); // Lock background scroll
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        function prevImage() {
            currentIndex =
                (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        // Click to Open
        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => showImage(index));
        });

        // Close Logic
        function closeModal() {
            modal.style.display = "none";
            toggleScroll(false); // Restore scroll
        }

        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        // Keyboard Nav
        document.addEventListener("keydown", (e) => {
            if (modal.style.display !== "flex") return;
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") closeModal();
        });
    }


    /* ===============================
       4. STUDIO — CUSTOM DROPDOWN
    ================================== */
    document.querySelectorAll(".gc-dropdown").forEach(dropdown => {
        const selectedBox = dropdown.querySelector(".gc-dropdown-selected");
        const items = dropdown.querySelectorAll("li");
        const hiddenInput = dropdown.querySelector("input[type='hidden']");

        if (!selectedBox || !hiddenInput) return;

        // Toggle Open
        selectedBox.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("open");
        });

        // Select Item
        items.forEach(item => {
            item.addEventListener("click", () => {
                selectedBox.textContent = item.textContent;
                hiddenInput.value = item.dataset.value;

                // Visual Feedback (Grey Active)
                items.forEach(li => li.classList.remove("active"));
                item.classList.add("active");

                dropdown.classList.remove("open");
            });
        });

        // Close on Click Outside
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    });


    /* ===============================
       5. LOAD HEADER & NAV FIX
    ================================== */
    fetch("/partials/header.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-header");
            if (mount) mount.innerHTML = html;

            /* Auto Active Nav Highlight */
            let path = window.location.pathname;
            // Removes "/" and ".html" for robust matching (e.g., "/about.html" -> "about")
            path = path.replace(/^\//, "").replace(".html", "");
            if (path === "" || path === "index") path = "home";

            document.querySelectorAll("header nav a").forEach(link => {
                if (link.dataset.nav === path) {
                    link.classList.add("active");
                }
            });
        });


    /* ===============================
       6. LOAD FOOTER
    ================================== */
    fetch("/partials/footer.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-footer");
            if (mount) mount.innerHTML = html;

            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();
        });


    /* ===============================
       7. DESIGN FORM — AJAX SUBMIT
    ================================== */
    const designForm = document.getElementById("designForm");

    if (designForm) {
        designForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const successMsg = document.getElementById("design-success");
            const submitBtn = designForm.querySelector("button");
            const originalText = submitBtn.innerText;
            const formData = new FormData(designForm);

            // Loading State
            submitBtn.innerText = "SENDING...";

            try {
                const response = await fetch(designForm.action, {
                    method: "POST",
                    body: formData,
                    headers: { Accept: "application/json" }
                });

                if (response.ok) {
                    designForm.reset();
                    submitBtn.innerText = "SENT ✅";
                    if (successMsg) successMsg.style.display = "block";
                    
                    // Reset button after 3s
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        successMsg.style.display = "none";
                    }, 3000);
                } else {
                    alert("Submission failed. Please try again.");
                    submitBtn.innerText = originalText;
                }
            } catch {
                alert("Network error. Please try again.");
                submitBtn.innerText = originalText;
            }
        });
    }

});

```

/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL MASTER)
   ✅ Zero-Lag Cursor Physics (Old Style)
   ✅ No Input Flickering
   ✅ No Modal Issues
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. PAGE LOAD TRIGGER
    ========================================================= */
    setTimeout(() => {
        document.body.classList.add("page-loaded");
    }, 50);

    /* =========================================================
       2. DEVICE DETECTION
    ========================================================= */
    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches;

    /* =========================================================
       3. PREMIUM CURSOR ENGINE (CLEAN PHYSICS)
    ========================================================= */
    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");

    if (!isTouchDevice && dot && outline) {
        
        // Variables for position
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        // 1. Instant Dot Movement (No lag)
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows instantly
            dot.style.left = mouseX + "px";
            dot.style.top = mouseY + "px";
        });

        // 2. Smooth Outline Physics Loop
        function animateCursor() {
            // Standard smooth lerp physics (0.15 = premium weight)
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            outline.style.left = outlineX + "px";
            outline.style.top = outlineY + "px";

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // 3. Hover Zoom Logic (ADD CLASS ONLY - NO INLINE STYLES)
        // This makes the ring bigger on buttons, links, etc.
        const interactives = document.querySelectorAll('a, button, .btn, .apps-gallery-img, .gc-dropdown-selected, .gc-dropdown-list li, .apps-gallery-arrow, .apps-modal-arrow, .apps-modal-close');

        interactives.forEach(el => {
            el.addEventListener("mouseenter", () => {
                outline.classList.add("active");
            });
            el.addEventListener("mouseleave", () => {
                outline.classList.remove("active");
            });
        });
        
        // NOTE: We do NOT hide the cursor on inputs anymore to prevent flickering.
        // The system I-Beam will show up because of CSS (cursor:text), 
        // and the custom dot will float above it.
    }

    /* =========================================================
       4. APPS GALLERY MODAL + SCROLL LOCK
    ========================================================= */
    const modal = document.getElementById("appsModal");
    const modalImg = document.getElementById("appsModalImg");
    const closeBtn = document.querySelector(".apps-modal-close");
    const galleryImages = document.querySelectorAll(".apps-gallery-img");

    let currentIndex = 0;

    if (modal && modalImg && galleryImages.length) {

        function toggleScroll(lock) {
            document.body.style.overflow = lock ? "hidden" : "";
        }

        function showImage(index) {
            currentIndex = index;
            modalImg.src = galleryImages[currentIndex].src;
            modal.style.display = "flex";
            toggleScroll(true);
        }

        function closeModal() {
            modal.style.display = "none";
            toggleScroll(false);
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        // Open
        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => showImage(index));
        });

        // Close
        if (closeBtn) closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        // Arrows
        const leftArrow = document.querySelector('.apps-modal-arrow.left');
        const rightArrow = document.querySelector('.apps-modal-arrow.right');
        if (leftArrow) leftArrow.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
        if (rightArrow) rightArrow.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

        // Keys
        document.addEventListener("keydown", (e) => {
            if (modal.style.display !== "flex") return;
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        });
    }

    /* =========================================================
       5. STUDIO DROPDOWN
    ========================================================= */
    document.querySelectorAll(".gc-dropdown").forEach(dropdown => {
        const selectedBox = dropdown.querySelector(".gc-dropdown-selected");
        const items = dropdown.querySelectorAll("li");
        const hiddenInput = dropdown.querySelector("input[type='hidden']");

        if (!selectedBox || !hiddenInput) return;

        selectedBox.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("open");
        });

        items.forEach(item => {
            item.addEventListener("click", () => {
                selectedBox.textContent = item.textContent;
                hiddenInput.value = item.dataset.value;
                items.forEach(li => li.classList.remove("active"));
                item.classList.add("active");
                dropdown.classList.remove("open");
            });
        });

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
        });
    });

    /* =========================================================
       6. HEADER + FOOTER LOADER
    ========================================================= */
    const partialsPath = "/partials/";

    // Header
    fetch(partialsPath + "header.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-header");
            if (mount) mount.innerHTML = html;

            let currentPath = window.location.pathname.replace(/\/$/, "").split("/").pop();
            if (currentPath === "" || currentPath === "index") currentPath = "home";

            document.querySelectorAll("header nav a").forEach(link => {
                // Re-attach hover listeners to dynamic header links
                if (!isTouchDevice && outline) {
                    link.addEventListener("mouseenter", () => outline.classList.add("active"));
                    link.addEventListener("mouseleave", () => outline.classList.remove("active"));
                }
                if (link.dataset.nav === currentPath) link.classList.add("active");
            });
        });

    // Footer
    fetch(partialsPath + "footer.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-footer");
            if (mount) mount.innerHTML = html;
            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();
            
            // Re-attach hover listeners to dynamic footer links
            if (!isTouchDevice && outline) {
                document.querySelectorAll("footer a").forEach(link => {
                    link.addEventListener("mouseenter", () => outline.classList.add("active"));
                    link.addEventListener("mouseleave", () => outline.classList.remove("active"));
                });
            }
        });

    /* =========================================================
       7. DESIGN FORM AJAX SUBMIT
    ========================================================= */
    const designForm = document.getElementById("designForm");
    if (designForm) {
        designForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const successMsg = document.getElementById("design-success");
            const submitBtn = designForm.querySelector("button");
            const originalText = submitBtn.innerText;
            const formData = new FormData(designForm);

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
                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        if (successMsg) successMsg.style.display = "none";
                    }, 4000);
                } else {
                    alert("Submission failed.");
                    submitBtn.innerText = originalText;
                }
            } catch {
                alert("Network error.");
                submitBtn.innerText = originalText;
            }
        });
    }

});

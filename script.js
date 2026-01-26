/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL MASTER)
   ✅ Fixed: Zero-Lag Cursor (Old Physics)
   ✅ Fixed: No Input Flicker
   ✅ Fixed: Global Page Animation
   ✅ Fixed: Dynamic Header/Footer Hover Safe
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. GLOBAL PAGE LOAD TRIGGER (Cinematic Lift)
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
       3. PREMIUM CURSOR ENGINE (OLD PHYSICS RESTORED)
    ========================================================= */
    const dot = document.querySelector(".cursor-dot");
    const outline = document.querySelector(".cursor-outline");

    // Safe check
    if (!isTouchDevice && dot && outline) {

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        /* --- Dot Instant Movement --- */
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            dot.style.left = mouseX + "px";
            dot.style.top = mouseY + "px";
        });

        /* --- Outline Smooth Physics Follow --- */
        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            outline.style.left = outlineX + "px";
            outline.style.top = outlineY + "px";

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        /* --- Hover Zoom Class Only (Premium) --- */
        function attachCursorHover(selector) {
            document.querySelectorAll(selector).forEach(el => {
                el.addEventListener("mouseenter", () => {
                    outline.classList.add("active");
                });
                el.addEventListener("mouseleave", () => {
                    outline.classList.remove("active");
                });
            });
        }

        // Attach hover to all clickable elements
        attachCursorHover(`
            a,
            button,
            .btn,
            .apps-gallery-img,
            .gc-dropdown-selected,
            .gc-dropdown-list li,
            .apps-gallery-arrow,
            .apps-modal-arrow,
            .apps-modal-close
        `);

        // NOTE: Input hiding removed completely (no flicker)
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

        // Open modal
        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => showImage(index));
        });

        // Close modal
        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        // Modal arrows
        const leftArrow = document.querySelector(".apps-modal-arrow.left");
        const rightArrow = document.querySelector(".apps-modal-arrow.right");

        if (leftArrow) {
            leftArrow.addEventListener("click", (e) => {
                e.stopPropagation();
                prevImage();
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener("click", (e) => {
                e.stopPropagation();
                nextImage();
            });
        }

        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (modal.style.display !== "flex") return;

            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        });
    }


    /* =========================================================
       5. STUDIO DROPDOWN (Locked Clean)
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

        // Close dropdown on outside click
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    });


    /* =========================================================
       6. HEADER + FOOTER LOADER (Dynamic Safe)
    ========================================================= */
    const partialsPath = "/partials/";

    // HEADER LOAD
    fetch(partialsPath + "header.html")
        .then(res => res.text())
        .then(html => {

            const mount = document.getElementById("site-header");
            if (mount) mount.innerHTML = html;

            let currentPath = window.location.pathname
                .replace(/\/$/, "")
                .split("/")
                .pop();

            if (currentPath === "" || currentPath === "index") {
                currentPath = "home";
            }

            document.querySelectorAll("header nav a").forEach(link => {
                if (link.dataset.nav === currentPath) {
                    link.classList.add("active");
                }
            });

        });


    // FOOTER LOAD
    fetch(partialsPath + "footer.html")
        .then(res => res.text())
        .then(html => {

            const mount = document.getElementById("site-footer");
            if (mount) mount.innerHTML = html;

            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();

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

            if (!submitBtn) return;

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

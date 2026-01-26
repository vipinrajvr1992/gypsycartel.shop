/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL MASTER)
   ✅ Cinematic Page Load Trigger
   ✅ Physics Cursor Engine (Old Premium Feel)
   ✅ Cursor Zoom via .active Class
   ✅ Apps Modal + Scroll Lock + Arrows
   ✅ Studio Dropdown Locked
   ✅ Auto Nav Highlight Folder Safe
   ✅ Header/Footer Loader Universal
   ✅ Design Form Success Message FIXED
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. PREMIUM PAGE LOAD TRIGGER
    ========================================================= */
    setTimeout(() => {
        document.body.classList.add("page-loaded");
    }, 60);


    /* =========================================================
       2. DEVICE DETECTION (Cursor Safe)
    ========================================================= */
    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches;


    /* =========================================================
       3. CUSTOM CURSOR ENGINE (DESKTOP ONLY)
    ========================================================= */
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    if (!isTouchDevice && cursorDot && cursorOutline) {

        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        /* Instant Dot */
        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        /* Smooth Physics Outline */
        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.14;
            outlineY += (mouseY - outlineY) * 0.14;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();


        /* =========================================================
           CURSOR PREMIUM ZOOM ONLY ON CLICKABLES
        ========================================================= */
        const clickables = document.querySelectorAll(
            "a, button, .btn, .apps-gallery-img, footer a"
        );

        clickables.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("active");
            });

            el.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("active");
            });
        });


        /* =========================================================
           HIDE CURSOR INSIDE INPUTS (Typing Comfort)
        ========================================================= */
        const formFields = document.querySelectorAll(
            "input, textarea, select"
        );

        formFields.forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursorDot.style.opacity = "0";
                cursorOutline.style.opacity = "0";
            });

            el.addEventListener("mouseleave", () => {
                cursorDot.style.opacity = "1";
                cursorOutline.style.opacity = "1";
            });
        });

    } else {
        /* Mobile Cursor Disable */
        if (cursorDot) cursorDot.style.display = "none";
        if (cursorOutline) cursorOutline.style.display = "none";
        document.body.style.cursor = "auto";
    }


    /* =========================================================
       4. APPS MODAL + ARROWS + SCROLL LOCK
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
            currentIndex =
                (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            modalImg.src = galleryImages[currentIndex].src;
        }

        /* Open */
        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => showImage(index));
        });

        /* Close */
        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        /* Modal Arrows */
        const leftArrow = document.querySelector(".apps-modal-arrow.left");
        const rightArrow = document.querySelector(".apps-modal-arrow.right");

        if (leftArrow)
            leftArrow.addEventListener("click", (e) => {
                e.stopPropagation();
                prevImage();
            });

        if (rightArrow)
            rightArrow.addEventListener("click", (e) => {
                e.stopPropagation();
                nextImage();
            });

        /* Keyboard */
        document.addEventListener("keydown", (e) => {
            if (modal.style.display !== "flex") return;

            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        });
    }


    /* =========================================================
       5. STUDIO CUSTOM DROPDOWN
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
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    });


    /* =========================================================
       6. HEADER + FOOTER LOADER + ACTIVE NAV
    ========================================================= */
    const partialsPath = "partials/";

    fetch(partialsPath + "header.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-header");
            if (mount) mount.innerHTML = html;

            let current = window.location.pathname.split("/").filter(Boolean).pop();
            if (!current) current = "home";

            document.querySelectorAll("header nav a").forEach(link => {
                if (link.dataset.nav === current.replace(".html", "")) {
                    link.classList.add("active");
                }
            });
        });

    fetch(partialsPath + "footer.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-footer");
            if (mount) mount.innerHTML = html;

            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();
        });


    /* =========================================================
       7. DESIGN FORM AJAX SUBMIT + SUCCESS MESSAGE
    ========================================================= */
    const designForm = document.getElementById("designForm");

    if (designForm) {

        designForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const successMsg = document.getElementById("design-success");
            const submitBtn = designForm.querySelector("button");
            const originalText = submitBtn.innerText;

            submitBtn.innerText = "SENDING...";

            try {
                const response = await fetch(designForm.action, {
                    method: "POST",
                    body: new FormData(designForm),
                    headers: { Accept: "application/json" }
                });

                if (response.ok) {

                    designForm.reset();
                    submitBtn.innerText = "SENT ✅";

                    if (successMsg) {
                        successMsg.style.display = "block";
                    }

                    setTimeout(() => {
                        submitBtn.innerText = originalText;
                        if (successMsg) successMsg.style.display = "none";
                    }, 4000);

                } else {
                    alert("Submission failed. Try again.");
                    submitBtn.innerText = originalText;
                }

            } catch {
                alert("Network error. Please try again.");
                submitBtn.innerText = originalText;
            }
        });
    }

});

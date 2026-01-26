/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL CLEAN)
   Desktop cursor ON • Mobile cursor OFF
   Gallery modal premium
   Studio dropdown premium grey selection
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       DEVICE DETECTION
    =============================== */
    const isTouchDevice =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;


    /* ===============================
       CUSTOM CURSOR (DESKTOP ONLY)
    =============================== */
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorOutline = document.querySelector(".cursor-outline");

    let mouseX = 0;
    let mouseY = 0;

    if (!isTouchDevice && cursorDot && cursorOutline) {

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        const followCursor = () => {
            cursorOutline.style.left = `${mouseX}px`;
            cursorOutline.style.top = `${mouseY}px`;
            requestAnimationFrame(followCursor);
        };
        followCursor();

    } else {
        if (cursorDot) cursorDot.style.display = "none";
        if (cursorOutline) cursorOutline.style.display = "none";
        document.body.style.cursor = "auto";
    }


    /* ===============================
       APPS GALLERY MODAL
    =============================== */
    const modal = document.getElementById("appsModal");
    const modalImg = document.getElementById("appsModalImg");
    const closeBtn = document.querySelector(".apps-modal-close");
    const galleryImages = document.querySelectorAll(".apps-gallery-img");

    let currentIndex = 0;

    if (modal && modalImg && galleryImages.length) {

        function showImage(index) {
            currentIndex = index;
            modalImg.src = galleryImages[currentIndex].src;
            modal.style.display = "flex";
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

        galleryImages.forEach((img, index) => {
            img.addEventListener("click", () => showImage(index));
        });

        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.style.display = "none";
        });

        document.addEventListener("keydown", (e) => {
            if (modal.style.display !== "flex") return;

            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") modal.style.display = "none";
        });
    }


    /* ===============================
       STUDIO — PREMIUM CUSTOM DROPDOWN
       Grey hover + Grey selected
    =============================== */
    document.querySelectorAll(".gc-dropdown").forEach(dropdown => {

        const selectedBox = dropdown.querySelector(".gc-dropdown-selected");
        const items = dropdown.querySelectorAll("li");
        const hiddenInput = dropdown.querySelector("input[type='hidden']");

        if (!selectedBox || !hiddenInput) return;

        /* Open/Close */
        selectedBox.addEventListener("click", () => {
            dropdown.classList.toggle("open");
        });

        /* Select item */
        items.forEach(item => {
            item.addEventListener("click", () => {

                selectedBox.textContent = item.textContent;
                hiddenInput.value = item.dataset.value;

                /* Remove old active */
                items.forEach(li => li.classList.remove("active"));

                /* Add grey active */
                item.classList.add("active");

                dropdown.classList.remove("open");
            });
        });

        /* Close outside click */
        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("open");
            }
        });
    });


    /* ===============================
       LOAD HEADER
    =============================== */
    fetch("/partials/header.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-header");
            if (mount) mount.innerHTML = html;
        });


    /* ===============================
       LOAD FOOTER
    =============================== */
    fetch("/partials/footer.html")
        .then(res => res.text())
        .then(html => {
            const mount = document.getElementById("site-footer");
            if (mount) mount.innerHTML = html;

            const year = document.getElementById("year");
            if (year) year.textContent = new Date().getFullYear();
        });

});


/* ===============================
   DESIGN FORM — AJAX SUBMIT
=============================== */
const designForm = document.getElementById("designForm");

if (designForm) {
    designForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const successMsg = document.getElementById("design-success");
        const formData = new FormData(designForm);

        try {
            const response = await fetch(designForm.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                designForm.reset();
                if (successMsg) successMsg.style.display = "block";
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch {
            alert("Network error. Please try again.");
        }
    });
}
<script>
document.addEventListener("DOMContentLoaded", () => {

  let path = window.location.pathname;

  if (path === "/") path = "home";
  else path = path.split("/")[1];

  document.querySelectorAll("header nav a").forEach(link => {
    if (link.dataset.nav === path) {
      link.classList.add("active");
    }
  });

});
</script>

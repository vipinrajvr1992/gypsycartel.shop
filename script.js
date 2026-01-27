/* =========================================================
   GYPSY CARTEL — GLOBAL SCRIPT (FINAL MASTER)
   ✅ Cinematic Page Load Trigger
   ✅ Apps Modal + Scroll Lock
   ✅ Studio Dropdown (Active Grey)
   ✅ Header/Footer Loader (Absolute Path Fix)
   ✅ Auto Nav Highlight (Folder Safe)
   ✅ Design Form AJAX Submit
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. PREMIUM PAGE LOAD TRIGGER
  ========================================================= */
  setTimeout(() => {
    document.body.classList.add("page-loaded");
  }, 50);


  /* =========================================================
     2. APPS GALLERY MODAL + SCROLL LOCK
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

    // Open modal
    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => showImage(index));
    });

    // Close button
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    // Background click close
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
     3. STUDIO CUSTOM DROPDOWN (Grey Active)
  ========================================================= */
  document.querySelectorAll(".gc-dropdown").forEach((dropdown) => {
    const selectedBox = dropdown.querySelector(".gc-dropdown-selected");
    const items = dropdown.querySelectorAll("li");
    const hiddenInput = dropdown.querySelector("input[type='hidden']");

    if (!selectedBox || !hiddenInput) return;

    selectedBox.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("open");
    });

    items.forEach((item) => {
      item.addEventListener("click", () => {
        selectedBox.textContent = item.textContent;
        hiddenInput.value = item.dataset.value;

        items.forEach((li) => li.classList.remove("active"));
        item.classList.add("active");

        dropdown.classList.remove("open");
      });
    });

    // Close dropdown outside click
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
    });
  });


  /* =========================================================
     4. HEADER + FOOTER LOADER (ABSOLUTE PATH FIX)
  ========================================================= */
  const partialsPath = "/partials/";

  // HEADER
  fetch(partialsPath + "header.html")
    .then((res) => res.text())
    .then((html) => {
      const mount = document.getElementById("site-header");
      if (mount) mount.innerHTML = html;

      // Nav Highlight
      let currentPath = window.location.pathname
        .replace(/\/$/, "")
        .split("/")
        .pop();

      if (currentPath === "" || currentPath === "index") currentPath = "home";

      document.querySelectorAll("header nav a").forEach((link) => {
        if (link.dataset.nav === currentPath) {
          link.classList.add("active");
        }
      });
    });

  // FOOTER
  fetch(partialsPath + "footer.html")
    .then((res) => res.text())
    .then((html) => {
      const mount = document.getElementById("site-footer");
      if (mount) mount.innerHTML = html;

      const year = document.getElementById("year");
      if (year) year.textContent = new Date().getFullYear();
    });


  /* =========================================================
     5. DESIGN FORM AJAX SUBMIT
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
          headers: { Accept: "application/json" },
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

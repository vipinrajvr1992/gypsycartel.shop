fetch("gallery/gc-data.json")
  .then(r => r.json())
  .then(items => {
    const wrap = document.getElementById("gc-dynamic-gallery");
    if (!wrap) return;

    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "gc-card";
      div.innerHTML = `
        <img src="${item.image}" alt="">
        <h4>${item.title}</h4>
      `;
      div.onclick = () => openGC(item);
      wrap.appendChild(div);
    });
  });

const popup = document.getElementById("gc-popup");
const closeBtn = document.getElementById("gc-close");

function openGC(item) {
  document.getElementById("gc-popup-img").src = item.image;
  document.getElementById("gc-popup-title").innerText = item.title;
  document.getElementById("gc-popup-desc").innerText = item.description;
  popup.classList.remove("gc-hidden");
}

// CLOSE BUTTON
closeBtn.onclick = () => {
  popup.classList.add("gc-hidden");
};

// CLICK OUTSIDE TO CLOSE
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.add("gc-hidden");
  }
});

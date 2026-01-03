fetch("gallery/gc-data.json")
  .then(r => r.json())
  .then(items => {
    const wrap = document.getElementById("gc-dynamic-gallery");

    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "gc-card";
      div.innerHTML = `<img src="${item.image}" alt="">
                       <h4>${item.title}</h4>`;
      div.onclick = () => openGC(item);
      wrap.appendChild(div);
    });
  });

function openGC(item) {
  document.getElementById("gc-popup-img").src = item.image;
  document.getElementById("gc-popup-title").innerText = item.title;
  document.getElementById("gc-popup-desc").innerText = item.description;
  document.getElementById("gc-popup").classList.remove("gc-hidden");
}

document.getElementById("gc-close").onclick = () => {
  document.getElementById("gc-popup").classList.add("gc-hidden");
};
document.getElementById("gc-popup").addEventListener("click", (e) => {
  if (e.target.id === "gc-popup") {
    document.getElementById("gc-popup").classList.add("gc-hidden");
  }
});

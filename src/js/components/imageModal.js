import { getImagesByFoodCode } from "../services/imageService.js";

let slideshowImages = [];
let currentIndex = 0;
let imageModalEventsBound = false;
let zoomLevel = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;

export function renderImageModal() {
  return `
    <div id="imageModal" class="modal">
      <div class="modal-background" id="modalBg"></div>

      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title has-text-centered" id="modalImgTitle"></p>

          <button class="button is-small mr-2" id="fullscreenBtn" type="button">
            ⛶
          </button>

          <button class="delete" aria-label="close" id="closeImgModalBtn" type="button"></button>
        </header>

        <section class="modal-card-body has-text-centered">
          <img id="slideshowImage" class="modal-slideshow-image zoomable-image" draggable="false" src="" alt=""/>

          <div class="buttons is-centered mt-3">
            <button class="button is-small is-primary" id="prevImageBtn" type="button">
              ←
            </button>

            <button class="button is-small is-primary" id="nextImageBtn" type="button">
              →
            </button>
            
          </div>
        </section>
      </div>
    </div>
  `;
}

export function bindImageModalEvents() {
  if (imageModalEventsBound) return;
  imageModalEventsBound = true;

  document.addEventListener("click", (event) => {
    const openBtn = event.target.closest(".open-image-btn");
    if (openBtn) {
      const foodCode = openBtn.dataset.foodcode;
      const foodName = openBtn.dataset.foodname;
      showImages(foodCode, foodName);
      return;
    }

    const closeBtn = event.target.closest("#closeImgModalBtn");
    if (closeBtn) {
      closeImgModal();
      return;
    }

    const modalBg = event.target.closest("#modalBg");
    if (modalBg) {
      closeImgModal();
      return;
    }

    const prevBtn = event.target.closest("#prevImageBtn");
    if (prevBtn) {
      prevImage();
      return;
    }

    const nextBtn = event.target.closest("#nextImageBtn");
    if (nextBtn) {
      nextImage();
    }

    // fullscreen
    const fullscreenBtn = event.target.closest("#fullscreenBtn");
    if (fullscreenBtn) {
      toggleFullscreen();
      return;
    }
  });

  // Зургийг zoom хийгээд зөөж шилжих
  document.addEventListener("mousedown", (event) => {
    const imageEl = event.target.closest("#slideshowImage");
    if (!imageEl || zoomLevel <= 1) return;

    isDragging = true;
    startX = event.clientX - translateX;
    startY = event.clientY - translateY;
    imageEl.style.cursor = "grabbing";
  });

  document.addEventListener("mousedown", (event) => {
    const imageEl = event.target.closest("#slideshowImage");
    if (!imageEl || zoomLevel <= 1) return;

    event.preventDefault();

    isDragging = true;
    startX = event.clientX - translateX;
    startY = event.clientY - translateY;

    imageEl.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    event.preventDefault();

    const imageEl = document.getElementById("slideshowImage");
    if (!imageEl) return;

    translateX = event.clientX - startX;
    translateY = event.clientY - startY;

    imageEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;

    const imageEl = document.getElementById("slideshowImage");
    if (imageEl) {
      imageEl.style.cursor = zoomLevel > 1 ? "grab" : "zoom-in";
    }
  });

  document.addEventListener("mouseleave", () => {
    isDragging = false;
  });

  // modal нээлттэй үед ESC дарахад хаагдана.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    const modalEl = document.getElementById("imageModal");
    if (!modalEl?.classList.contains("is-active")) return;

    closeImgModal();
  });
}

// zoom хийх
document.addEventListener(
  "wheel",
  (event) => {
    const imageEl = event.target.closest("#slideshowImage");
    if (!imageEl) return;

    event.preventDefault();

    zoomLevel += event.deltaY < 0 ? 0.15 : -0.15;
    zoomLevel = Math.min(Math.max(zoomLevel, 1), 4);

    imageEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoomLevel})`;
    imageEl.style.cursor = zoomLevel > 1 ? "zoom-out" : "zoom-in";
  },
  { passive: false },
);

function showImages(foodCode, foodName) {
  slideshowImages = getImagesByFoodCode(foodCode);

  if (!slideshowImages.length) {
    alert("No images found for " + foodName);
    return;
  }

  currentIndex = 0;

  const imageEl = document.getElementById("slideshowImage");
  const titleEl = document.getElementById("modalImgTitle");
  const modalEl = document.getElementById("imageModal");

  if (!imageEl || !titleEl || !modalEl) return;

  imageEl.src = slideshowImages[currentIndex];
  resetImageZoom(imageEl);
  imageEl.alt = foodName;
  titleEl.textContent = foodName;
  modalEl.classList.add("is-active");
}

function nextImage() {
  if (!slideshowImages.length) return;

  currentIndex = (currentIndex + 1) % slideshowImages.length;

  const imageEl = document.getElementById("slideshowImage");
  if (imageEl) {
    imageEl.src = slideshowImages[currentIndex];
    resetImageZoom(imageEl);
  }
}

function prevImage() {
  if (!slideshowImages.length) return;

  currentIndex = (currentIndex - 1 + slideshowImages.length) % slideshowImages.length;

  const imageEl = document.getElementById("slideshowImage");
  if (imageEl) {
    imageEl.src = slideshowImages[currentIndex];
    resetImageZoom(imageEl);
  }
}

function closeImgModal() {
  const modalEl = document.getElementById("imageModal");
  if (modalEl) {
    modalEl.classList.remove("is-active");
  }
}

// zoom move reset
function resetImageZoom(imageEl) {
  zoomLevel = 1;
  translateX = 0;
  translateY = 0;

  imageEl.style.transform = "translate(0px, 0px) scale(1)";
  imageEl.style.cursor = "zoom-in";
}

// fullscreen
async function toggleFullscreen() {
  const imageEl = document.getElementById("slideshowImage");

  if (!imageEl) return;

  try {
    if (!document.fullscreenElement) {
      await imageEl.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error("Fullscreen error:", error);
  }
}

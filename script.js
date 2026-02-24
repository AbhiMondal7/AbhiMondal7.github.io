
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    setTimeout(() => { preloader.style.display = "none"; }, 500);
});
// Prevent right-click on images
document.addEventListener("contextmenu", function(e) {
    if (e.target.tagName === "IMG") {
    e.preventDefault();
    alert("Image download disabled © Abhi Mondal");
    }
});

// Fullscreen image modal
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
document.querySelectorAll(".gallery-item img").forEach(img => {
    img.addEventListener("click", () => {
    modal.style.display = "flex";
    modalImg.src = img.src;
    });
});
function closeModal() {
    modal.style.display = "none";
}

// Scroll-to-top button
const topBtn = document.getElementById("topBtn");
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    topBtn.style.display = "block";
    } else {
    topBtn.style.display = "none";
    }
};
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
// Open modal with clicked card content
function openCardModal(cardElement) {
    const modal = document.getElementById("cardModal");
    const modalContent = document.getElementById("modalContent");

    // Copy the inner content of the clicked card
    modalContent.innerHTML = cardElement.innerHTML;

    // Show modal
    modal.style.display = "flex";
}

// Close modal
function closeCardModal() {
    document.getElementById("cardModal").style.display = "none";
}

// Close when clicking outside content
window.onclick = function(event) {
    const modal = document.getElementById("cardModal");
    if (event.target === modal) {
    modal.style.display = "none";
    }
}



window.addEventListener("pageshow", function (event) {
    const preloader = document.getElementById("preloader");
    if (event.persisted) {
    // If coming from cache, show and then hide preloader again
    preloader.style.display = "flex";
    preloader.style.opacity = "1";
    setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => { preloader.style.display = "none"; }, 500);
    }, 300);
    }
});
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const images = document.querySelectorAll(".grid-large .card img");
const closeBtn = document.querySelector(".lightbox .close");
const prevBtn = document.querySelector(".lightbox .prev");
const nextBtn = document.querySelector(".lightbox .next");

let currentIndex = 0;

// Open lightbox
images.forEach((img, index) => {
    img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    // lightboxCaption.textContent = img.dataset.caption;
    currentIndex = index;
    });
});

// Close lightbox
closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

// Prev / Next navigation
function showImage(index) {
    if (index >= images.length) index = 0;
    if (index < 0) index = images.length - 1;
    lightboxImg.src = images[index].src;
    // lightboxCaption.textContent = images[index].dataset.caption;
    currentIndex = index;
}
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

// Close on outside click
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
    lightbox.style.display = "none";
    }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "block") {
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "Escape") lightbox.style.display = "none";
    }
});

// Progressive Gallery Loading  

const cards = document.querySelectorAll(".gallery-card");
const loadBtn = document.getElementById("loadMoreBtn");

let visibleCount = 8;   // first batch
const step = 8;         // load next 8

// hide all initially
cards.forEach((card, index) => {
  if(index >= visibleCount){
    card.style.display = "none";
  }
});

loadBtn.addEventListener("click", () => {

  visibleCount += step;

  cards.forEach((card, index) => {
    if(index < visibleCount){
      card.style.display = "block";
    }
  });

  // hide button when finished
  if(visibleCount >= cards.length){
    loadBtn.style.display = "none";
  }
});
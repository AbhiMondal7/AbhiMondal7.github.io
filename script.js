
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
    // for index page only
    if (topBtn) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
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
if (closeBtn) {
    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

// Prev / Next navigation
function showImage(index) {
    if (index >= images.length) index = 0;
    if (index < 0) index = images.length - 1;
    lightboxImg.src = images[index].src;
    // lightboxCaption.textContent = images[index].dataset.caption;
    currentIndex = index;
}

// Prev / Next navigation
if (prevBtn) {
    prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
}
if (nextBtn) {
    nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
}

// Close on outside click
if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    // Add the 'lightbox' check first
    if (lightbox && lightbox.style.display === "block") {
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

if (loadBtn) {
    loadBtn.addEventListener("click", () => {
        visibleCount += step;
        cards.forEach((card, index) => {
            if(index < visibleCount){
                card.style.display = "block";
            }
        });

        if(visibleCount >= cards.length){
            loadBtn.style.display = "none";
        }
    });
}

// Function to toggle the About Me timeline section
function toggleAboutSection() {
  const section = document.getElementById("about-me-section");
  if (section.style.display === "none" || section.style.display === "") {
    section.style.display = "block"; // Opens the section
  } else {
    section.style.display = "none"; // Closes the section
  }
}

const simpleModal = document.getElementById("imgModal");
const simpleModalImg = document.getElementById("modalImg");
const simpleModalCaption = document.getElementById("modalCaption"); // Added caption variable

document.querySelectorAll(".gallery-item img, .mini-image").forEach(img => {
    img.addEventListener("click", () => {
        if (simpleModal && simpleModalImg) { 
            simpleModal.style.display = "flex";
            simpleModalImg.src = img.src;
            
            // Grabs the text from alt="..." and puts it in the caption box!
            if (simpleModalCaption) {
                simpleModalCaption.textContent = img.alt || ""; 
            }
        }
    });
});

function closeModal() {
    if (simpleModal) {
        simpleModal.style.display = "none";
    }
}

document.querySelectorAll('.mini-gallery').forEach(gallery => {
    const miniImages = gallery.querySelectorAll('.mini-image');
    const miniLimit = 4; // Number of images to show initially
    const miniStep = 4;  // Number of images to reveal per click
    
    let currentVisible = miniLimit; // Tracks our current index

    // Only trigger if this specific school has more than the initial limit
    if (miniImages.length > miniLimit) {
        
        // Hide the extra images right away
        for (let i = miniLimit; i < miniImages.length; i++) {
            miniImages[i].style.display = 'none';
        }

        // Create a container so the button sits on its own line
        const btnContainer = document.createElement('div');
        btnContainer.className = 'mini-btn-container';

        // Create the "View More" button
        const viewMoreBtn = document.createElement('button');
        viewMoreBtn.textContent = 'View More ↓';
        viewMoreBtn.className = 'mini-load-more';

        // Attach the button to the gallery
        btnContainer.appendChild(viewMoreBtn);
        gallery.appendChild(btnContainer);

        // When clicked, unhide the NEXT batch of images
        viewMoreBtn.addEventListener('click', () => {
            // Calculate where to stop this batch (using Math.min so don't go out of bounds)
            const nextVisible = Math.min(currentVisible + miniStep, miniImages.length);
            
            // Unhide the images for this specific batch
            for (let i = currentVisible; i < nextVisible; i++) {
                miniImages[i].style.display = ''; 
            }
            
            // Update our tracker to the new index
            currentVisible = nextVisible;
            
            // If reached or passed the end of the array, hide the button
            if (currentVisible >= miniImages.length) {
                btnContainer.style.display = 'none'; 
            }
        });
    }
});

// Time line 

function fixTimelineLine() {
    const container = document.querySelector('.timeline-container');
    if (!container) return; // Only run if on the About page

    // Find all the school sections (items)
    const items = container.querySelectorAll('.timeline-item');
    
    if (items.length > 0) {
        // Logically grab the very last one in the list 
        const lastItem = items[items.length - 1];
        
        // Calculate distance from top of container to the last item.
        // offsetTop gives us the exact pixel drop. add +15 to reach the center of the red dot
        const exactHeight = lastItem.offsetTop + 15; 
        
        // Inject this exact mathematical measurement into the CSS
        container.style.setProperty('--line-height', exactHeight + 'px');
    }
}

// Trigger the math when the page first loads
window.addEventListener('load', fixTimelineLine);

// Trigger the math if the screen size changes (like rotating a phone)
window.addEventListener('resize', fixTimelineLine);

// Trigger the math whenever ANY button is clicked (like "View More")
document.addEventListener('click', () => {
    // add a tiny 50 millisecond delay so the photos have time to open 
    // and push the page down BEFORE do the math
    setTimeout(fixTimelineLine, 50); 
});
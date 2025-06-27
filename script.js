// Carousel functionality
const images = [
  {
    src: "farm_photos/farm1.jpg",
    caption: "Freshly harvested tomatoes from our field"
  },
  {
    src: "farm_photos/farm2.jpg",
    caption: "Green and healthy cabbage patch"
  },
  {
    src: "farm_photos/farm3.jpg",
    caption: "Morning sun over the organic farm"
  },
  {
    src: "farm_photos/farm4.jpg",
    caption: "Irrigation system keeping crops hydrated"
  },
  {
    src: "farm_photos/farm5.jpg",
    caption: "Farmers handpicking organic greens"
  },
  {
    src: "farm_photos/farm6.jpg",
    caption: "Panoramic view of our eco-friendly farmland"
  }
];

let currentIndex = 0;
let autoSlideInterval;

function showSlide(index) {
  const imageElement = document.getElementById("carousel-image");
  const captionElement = document.getElementById("carousel-caption");

  if (index >= images.length) currentIndex = 0;
  else if (index < 0) currentIndex = images.length - 1;
  else currentIndex = index;

  imageElement.src = images[currentIndex].src;
  captionElement.textContent = images[currentIndex].caption;

  updateDots();
}

function changeSlide(direction) {
  showSlide(currentIndex + direction);
  restartAutoSlide();
}

function autoSlide() {
  autoSlideInterval = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 4000);
}

function restartAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlide();
}

function createDots() {
  const dotsContainer = document.getElementById("carousel-dots");
  dotsContainer.innerHTML = "";

  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.innerHTML = "&#9679;";
    dot.addEventListener("click", () => {
      showSlide(i);
      restartAutoSlide();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll("#carousel-dots span");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

// Initialize carousel
createDots();
showSlide(currentIndex);
autoSlide();

// App logic
const cart = [];

function goToMain() {
  document.getElementById("welcomePage").style.display = "none";
  document.getElementById("mainContent").style.display = "flex";
  document.getElementById("footerLocation").style.display = "block";
}

function increase(button) {
  const span = button.previousElementSibling;
  span.textContent = parseInt(span.textContent) + 1;
}

function decrease(button) {
  const span = button.nextElementSibling;
  let value = parseInt(span.textContent);
  if (value > 1) span.textContent = value - 1;
}

function addToCart(button) {
  const card = button.closest(".product-card");
  const name = card.querySelector("h3").textContent;
  const qty = parseInt(card.querySelector("span").textContent);

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, qty });
  }

  alert(`✅ ${qty} x ${name} added to cart!`);
}

function showCart() {
  const list = document.getElementById("cartItems");
  list.innerHTML = "";

  if (cart.length === 0) {
    list.innerHTML = "<li>No items in cart.</li>";
  } else {
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} × ${item.qty}`;
      list.appendChild(li);
    });
  }

  document.getElementById("cartModal").style.display = "flex";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function placeOrder() {
  const userEmail = document.getElementById("userEmail").value;
  const payment = document.getElementById("payment").value;

  if (!userEmail) {
    alert("Please enter your email.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const orderSummary = cart.map(item => `${item.qty} x ${item.name}`).join(", ");
  const templateParams = {
    email: userEmail,
    message: `Order placed with ${orderSummary} | Payment Mode: ${payment}`
  };

  emailjs.send("service_4sjgu6n", "template_vt2kw3i", templateParams)
    .then(function(response) {
      alert("🎉 Order placed successfully!");
      cart.length = 0;
      closeCart();
    }, function(error) {
      alert("❌ Failed to place order. Please try again.");
      console.error("EmailJS error:", error);
    });
}

function showProfile() {
  alert("Profile feature coming soon!");
}

function openModal(id) {
  alert("Signup modal - coming soon!");
}

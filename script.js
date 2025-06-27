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
     const paymentMethod = document.getElementById("payment").value;
     const orderDetails = cart.map(item => `${item.name} × ${item.qty}`).join(", ");
     const now = new Date();
     const formattedTime = now.toLocaleString();

     if (!userEmail || !orderDetails) {
      alert("Please enter your email and ensure cart is not empty.");
      return;
    }

    
     console.log("Sending to email:", userEmail); 

     emailjs.send("service_f0c03mk", "template_pgbycrt",{
      name: "Customer",
      email: userEmail,
      title: paymentMethod,
      message: orderDetails,
      time: formattedTime
    })
     .then(() => {
      alert("🎉 Thank you! Your order has been placed.");
      cart.length = 0;
      closeCart();
    })
     .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send email. Please try again.");
    });
  }
  function openModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

let userData = {};

function submitSignup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const mobile = document.getElementById("signupMobile").value;
  const address = document.getElementById("signupAddress").value;
  const dob = document.getElementById("signupDOB").value;

  if (!name || !email || !mobile || !address || !dob) {
    alert("Please fill in all fields.");
    return;
  }

  userData = { name, email, mobile, address, dob };
  alert("✅ Sign-up successful!");
  closeModal("signupModal");
}

function submitLogin() {
  const mobile = document.getElementById("loginMobile").value;
  const otp = document.getElementById("loginOTP").value;

  if (userData.mobile === mobile && otp === "1234") {
    alert("✅ Logged in successfully!");
    closeModal("loginModal");
  } else {
    alert("❌ Incorrect mobile or OTP. Hint: OTP is '1234'");
  }
}

function showProfile() {
  if (!userData.name) {
    alert("Please sign up first.");
    return;
  }
  const profileText = `
    Name: ${userData.name}<br>
    Email: ${userData.email}<br>
    Mobile: ${userData.mobile}<br>
    Address: ${userData.address}<br>
    DOB: ${userData.dob}
  `;
  document.getElementById("profileData").innerHTML = profileText;
  openModal("profileModal");
}



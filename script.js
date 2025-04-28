// Sample Data
const hotelsData = [
  { name: "Hotel Arunachala", rating: 4.7, price: "₹1,500", image: "assets/arun.jpg", link: "https://hotelarunachala.in/" },
  { name: "Sri Ramana Lodge", rating: 4.5, price: "₹1,200", image: "assets/ram.jpg", link: "https://ramanaresidency.in/index.html" }
];

const spotsData = [
  { name: "Arunachaleswarar Temple", description: "Ancient Shiva temple with magnificent architecture", image: "assets/anna.jpg", map: "https://g.co/kgs/oFWaqAP" },
  { name: "Girivalam Path", description: "Sacred 14km path around Arunachala Hill", image: "assets/giri1.jpg", map: "https://g.co/kgs/KYwabaQ" },
  { name: "Ramanashram", description: "Spiritual center dedicated to Ramana Maharshi", image: "assets/ram1.jpg", map: "https://g.co/kgs/XmthscN" },
  { name: "Skandashram", description: "Meditation cave with panoramic views", image: "assets/kan.jpg", map: "https://g.co/kgs/fTaLtyy" }
];

// DOM Elements
const loginBtn = document.getElementById("loginBtn");
const modal = document.getElementById("loginModal");
const closeBtn = document.querySelector(".close");
const loginForm = document.getElementById("loginForm");
const toggleSignup = document.getElementById("toggleSignup");
const contactForm = document.getElementById("contactForm");

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let users = JSON.parse(localStorage.getItem("users")) || [];

// Smooth Scroll
function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.addEventListener("DOMContentLoaded", () => {
  renderHotels();
  renderSpots();
  updateAuthUI();

  document.querySelectorAll('.cta-buttons .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScroll(btn.getAttribute('href'));
    });
  });

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
});

// Render Hotels
function renderHotels() {
  const container = document.getElementById("hotelsList");
  container.innerHTML = hotelsData.map(hotel => `
    <div class="card">
      <img src="${hotel.image}" alt="${hotel.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
      <div class="card-content">
        <h3>${hotel.name}</h3>
        <div class="rating">${'★'.repeat(Math.floor(hotel.rating))} ${hotel.rating}/5</div>
        <p>${hotel.price}</p>
        <a href="${hotel.link}" class="btn" target="_blank">Book Now</a>
      </div>
    </div>
  `).join("");
}

// Render Spots
function renderSpots() {
  const container = document.getElementById("spotsList");
  container.innerHTML = spotsData.map(spot => `
    <div class="card">
      <img src="${spot.image}" alt="${spot.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
      <div class="card-content">
        <h3>${spot.name}</h3>
        <p>${spot.description}</p>
        <a href="${spot.map}" class="btn" target="_blank">View Map</a>
      </div>
    </div>
  `).join("");
}

// Update Authentication UI
function updateAuthUI() {
  loginBtn.textContent = currentUser ? "Logout" : "Login / Sign Up";
}

// Login/Logout
loginBtn.addEventListener("click", (e) => {
  if (currentUser) {
    e.preventDefault();
    currentUser = null;
    localStorage.removeItem("currentUser");
    updateAuthUI();
    alert("You have been logged out");
  } else {
    modal.style.display = "flex";
  }
});

closeBtn.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

// Login Form Submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const existingUser = users.find(user => user.email === email);

  if (existingUser) {
    if (existingUser.password === password) {
      currentUser = { email, loggedIn: true };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      updateAuthUI();
      alert(`Welcome back, ${email.split('@')[0]}!`);
      modal.style.display = "none";
      loginForm.reset();
    } else {
      alert("Incorrect password");
    }
  } else {
    if (confirm("No account found. Create one now?")) {
      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      currentUser = { email, loggedIn: true };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      updateAuthUI();
      alert(`Account created! Welcome, ${email.split('@')[0]}!`);
      modal.style.display = "none";
      loginForm.reset();
    }
  }
});

// Toggle Signup
toggleSignup.addEventListener("click", (e) => {
  e.preventDefault();
  alert("Just enter your email and password, and submit to sign up!");
});

// Contact Form
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    alert(`Thanks, ${name}! We'll contact you soon.`);
    contactForm.reset();
  } else {
    alert("Please fill all fields correctly!");
  }
});

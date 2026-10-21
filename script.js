// --- Service Catalog Data with Direct Image Links ---
const services = [
  {
    id: 1,
    name: "Dry Cleaning",
    price: 200,
    imageUrl: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Leather & Suede Cleaning",
    price: 999,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Ironing",
    price: 30,
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Wedding Dress Cleaning",
    price: 2400,
    imageUrl: "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Wash And Fold",
    price: 140,
    imageUrl: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Stain Removal",
    price: 500,
    imageUrl: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
  }
];

// --- App State ---
let currentServiceIndex = 0;
let cartItems = [];

// --- DOM References ---
const serviceImgEl = document.getElementById("serviceImg");
const serviceNameEl = document.getElementById("serviceName");
const servicePriceEl = document.getElementById("servicePrice");
const skipItemBtn = document.getElementById("skipItemBtn");
const addItemBtn = document.getElementById("addItemBtn");

const emptyCartState = document.getElementById("emptyCartState");
const cartItemsList = document.getElementById("cartItemsList");
const totalAmountEl = document.getElementById("totalAmount");

const bookNowBtn = document.getElementById("bookNowBtn");
const bookingMsg = document.getElementById("bookingMsg");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const logoutBtn = document.getElementById("logoutBtn");

// --- Display Current Service in Browse Section ---
function renderCurrentService() {
  const service = services[currentServiceIndex];
  
  // Set image source and alt tag
  serviceImgEl.src = service.imageUrl;
  serviceImgEl.alt = service.name;
  
  serviceNameEl.textContent = service.name;
  servicePriceEl.textContent = `₹${service.price.toFixed(2)}`;
}

// --- Cycle to Next Service ---
function nextService() {
  currentServiceIndex = (currentServiceIndex + 1) % services.length;
  renderCurrentService();
}

// --- Add Current Service to Cart ---
function addCurrentServiceToCart() {
  const service = services[currentServiceIndex];
  
  cartItems.push({
    sno: cartItems.length + 1,
    name: service.name,
    price: service.price
  });

  updateCartUI();
  nextService();
}

// --- Update Cart Table & Total UI ---
function updateCartUI() {
  if (cartItems.length === 0) {
    emptyCartState.style.display = "flex";
    cartItemsList.style.display = "none";
    totalAmountEl.textContent = "₹ 0";
    return;
  }

  emptyCartState.style.display = "none";
  cartItemsList.style.display = "flex";
  cartItemsList.innerHTML = "";

  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price;
    const itemRow = document.createElement("div");
    itemRow.className = "cart-item-row";
    itemRow.innerHTML = `
      <span class="col-sno">${index + 1}</span>
      <span class="col-name">${item.name}</span>
      <span class="col-price item-price">₹${item.price.toFixed(2)}</span>
    `;
    cartItemsList.appendChild(itemRow);
  });

  totalAmountEl.textContent = `₹ ${total.toFixed(2)}`;
}

// --- Booking Validation & Submission ---
function handleBooking() {
  // If cart is empty, show required validation error
  if (cartItems.length === 0) {
    bookingMsg.className = "booking-msg error";
    bookingMsg.innerHTML = "<span>ⓘ Add the items to the cart to book</span>";
    bookingMsg.style.display = "block";
    return;
  }

  // When cart has items, show successful submission message
  bookingMsg.className = "booking-msg success";
  bookingMsg.innerHTML = "<span>ⓘ Thank you for contacting, we will get back to you soon</span>";
  bookingMsg.style.display = "block";
}

// --- Reset / Logout Handler ---
function handleLogout() {
  cartItems = [];
  currentServiceIndex = 0;
  fullNameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  bookingMsg.style.display = "none";
  updateCartUI();
  renderCurrentService();
}

// --- Event Listeners ---
skipItemBtn.addEventListener("click", nextService);
addItemBtn.addEventListener("click", addCurrentServiceToCart);
bookNowBtn.addEventListener("click", handleBooking);
logoutBtn.addEventListener("click", handleLogout);

[fullNameInput, emailInput, phoneInput].forEach(input => {
  input.addEventListener("input", () => {
    bookingMsg.style.display = "none";
  });
});

// Initial Render
renderCurrentService();
updateCartUI();
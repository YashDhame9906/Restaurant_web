// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Initialize AOS animations
AOS.init({
    duration: 1000,
    once: true
});

// Booking form submission
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        showToast('Your table has been booked successfully!');

        bookingForm.reset();
    });
}
const dateInput = document.querySelector('input[type="date"]');

if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}
// Contact form submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        showToast('Thank you for contacting us!');

        contactForm.reset();
    });
}
// ===============================
// CART FUNCTIONALITY
// ===============================
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cartCount');

// Load cart from LocalStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart counter
function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Save cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add item to cart
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const item = {
            name: button.dataset.name,
            price: Number(button.dataset.price)
        };

        cart.push(item);
        saveCart();

        showToast(`${item.name} added to cart!`);
    });
});

// Initialize cart count on page load
updateCartCount();



// ===============================
// TOAST NOTIFICATION FUNCTION
// ===============================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');

    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
        toast.className = 'toast';
    }, 3000);
}
// ===============================
// SEARCH + FILTER FUNCTIONALITY
// ===============================
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

let currentFilter = 'all';

function filterMenu() {
    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : '';

    menuCards.forEach(card => {
        const category = card.dataset.category;
        const title = card.querySelector('h3').textContent.toLowerCase();

        const matchesCategory =
            currentFilter === 'all' || category === currentFilter;

        const matchesSearch = title.includes(searchValue);

        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Search input event
if (searchInput) {
    searchInput.addEventListener('input', filterMenu);
}

// Filter button events
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn =>
            btn.classList.remove('active')
        );

        button.classList.add('active');
        currentFilter = button.dataset.filter;

        filterMenu();
    });
});

// Initial filter call
filterMenu();
// ================= MEMORY GAME =================

document.addEventListener("DOMContentLoaded", () => {

    const startBtn =
        document.getElementById("startGameBtn");

    const closeBtn =
        document.getElementById("closeGameBtn");

    const modal =
        document.getElementById("gameModal");

    const grid =
        document.getElementById("memoryGrid");

    const timerEl =
        document.getElementById("timer");

    if (!startBtn) return;

    const emojis = ["🍕", "🍔", "🍟"];

    let cards = [...emojis, ...emojis];

    let firstCard = null;
    let secondCard = null;

    let lockBoard = false;

    let matches = 0;

    let timer = 10;

    let countdown;

    // ================= START GAME =================

    startBtn.addEventListener("click", () => {

        modal.classList.add("active");

        startGame();

    });

    // ================= CLOSE GAME =================

    closeBtn.addEventListener("click", () => {

        modal.classList.remove("active");

        clearInterval(countdown);

    });

    // ================= START FUNCTION =================

    function startGame() {

        grid.innerHTML = "";

        matches = 0;

        timer = 10;

        timerEl.textContent = timer;

        cards.sort(() => 0.5 - Math.random());

        cards.forEach(emoji => {

            const card =
                document.createElement("div");

            card.classList.add("memory-card");

            card.dataset.emoji = emoji;

            card.innerHTML = emoji;

            card.addEventListener(
                "click",
                flipCard
            );

            grid.appendChild(card);

        });

        clearInterval(countdown);

        countdown = setInterval(() => {

            timer--;

            timerEl.textContent = timer;

            if (timer <= 0) {

                clearInterval(countdown);

                showToast(
                    "⏰ Time Over!",
                    "error"
                );

            }

        }, 1000);

    }

    // ================= FLIP CARD =================

    function flipCard() {

        if (
            lockBoard ||
            this === firstCard ||
            this.classList.contains("matched")
        ) {
            return;
        }

        this.classList.add("flipped");

        if (!firstCard) {

            firstCard = this;

            return;

        }

        secondCard = this;

        checkMatch();

    }

    // ================= CHECK MATCH =================

    function checkMatch() {

        const isMatch =
            firstCard.dataset.emoji ===
            secondCard.dataset.emoji;

        if (isMatch) {

            firstCard.classList.add("matched");

            secondCard.classList.add("matched");

            matches++;

            resetBoard();

            // WIN CONDITION
            if (matches === 3) {

                clearInterval(countdown);

                // SAVE DISCOUNT
                localStorage.setItem(
                    "discountCoupon",
                    "CAFE10"
                );

                showToast(
                    "🎉 You Won 10% OFF!",
                    "success"
                );

            }

        } else {

            lockBoard = true;

            setTimeout(() => {

                firstCard.classList.remove(
                    "flipped"
                );

                secondCard.classList.remove(
                    "flipped"
                );

                resetBoard();

            }, 800);

        }

    }

    // ================= RESET =================

    function resetBoard() {

        [firstCard, secondCard] = [null, null];

        lockBoard = false;

    }

});
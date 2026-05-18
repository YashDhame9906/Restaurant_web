// ===============================
// LOAD CART FROM LOCAL STORAGE
// ===============================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// ===============================
// TOAST NOTIFICATION
// ===============================
function showToast(message) {
    const toast = document.getElementById('toast');

    if (!toast) return;

    // Set message
    toast.textContent = message;

    // Show toast
    toast.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
// ===============================
// UPDATE CART COUNT
// ===============================
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// ===============================
// SAVE CART
// ===============================
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// ===============================
// ADD TO CART
// ===============================
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
        const item = {
            name: this.dataset.name,
            price: Number(this.dataset.price),
            quantity: 1
        };

        // Always add a new item to cart
        cart.push(item);

        // Save to localStorage
        saveCart();

        // Show message
        showToast(item.name + ' added to cart!');
    });
});

// ===============================
// INITIALIZE
// ===============================
updateCartCount();
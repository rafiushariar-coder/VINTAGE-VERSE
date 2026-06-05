// Sample Products Data
const products = [
    {
        id: 1,
        name: "Vintage Jacket",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
        description: "Classic vintage leather jacket with timeless appeal"
    },
    {
        id: 2,
        name: "Classic Oversized Tee",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
        description: "Comfortable oversized vintage tee shirt"
    },
    {
        id: 3,
        name: "Retro Denim",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
        description: "Authentic retro denim jeans with vintage wash"
    },
    {
        id: 4,
        name: "Vintage Sweater",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        description: "Cozy vintage wool sweater"
    },
    {
        id: 5,
        name: "Retro Boots",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1543163521-9effd112b493",
        description: "Classic vintage leather boots"
    },
    {
        id: 6,
        name: "Vintage Hat",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1552062407-291826ab63fd",
        description: "Stylish vintage fedora hat"
    }
];

// Load products on page load
document.addEventListener('DOMContentLoaded', loadProducts);

function loadProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="cart-btn" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                    🛒 Add to Cart
                </button>
            </div>
        `;
        productsContainer.appendChild(card);
    });
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} added to cart!`);
    updateCartCount();
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Initialize cart count on page load
updateCartCount();
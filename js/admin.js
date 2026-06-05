// Admin Dashboard JavaScript

// Sample Data
let products = JSON.parse(localStorage.getItem('adminProducts')) || [
    { id: 1, name: "Vintage Jacket", price: 49.99, stock: 15, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f" },
    { id: 2, name: "Classic Oversized Tee", price: 29.99, stock: 30, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c" },
    { id: 3, name: "Retro Denim", price: 59.99, stock: 20, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1" }
];

let orders = JSON.parse(localStorage.getItem('adminOrders')) || [
    { id: 1001, customer: "Rahim", items: 2, status: "Pending", total: 50, date: "2025-06-01" },
    { id: 1002, customer: "Karim", items: 1, status: "Delivered", total: 80, date: "2025-06-02" }
];

let customers = JSON.parse(localStorage.getItem('adminCustomers')) || [
    { id: 1, name: "Rahim", email: "rahim@email.com", phone: "01700000000", totalOrders: 5, totalSpent: 250 },
    { id: 2, name: "Karim", email: "karim@email.com", phone: "01700000001", totalOrders: 3, totalSpent: 150 }
];

let coupons = JSON.parse(localStorage.getItem('adminCoupons')) || [
    { code: "SUMMER20", discount: 20, validTill: "2025-08-31", usage: 45 },
    { code: "SAVE10", discount: 10, validTill: "2025-07-31", usage: 120 }
];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    loadProducts();
    loadOrders();
    loadCustomers();
    loadCoupons();
});

function switchSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));

    // Show selected section
    document.getElementById(section).classList.add('active');
    event.target.classList.add('active');

    // Update page title
    const titles = {
        dashboard: "Admin Dashboard",
        products: "Products Management",
        orders: "Orders Management",
        customers: "Customers",
        coupons: "Coupons",
        settings: "Settings"
    };
    document.getElementById('pageTitle').textContent = titles[section];
}

function loadDashboard() {
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalCustomers').textContent = customers.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalRevenue').textContent = '$' + totalRevenue.toFixed(2);

    // Load recent orders
    const recentOrdersList = document.getElementById('recentOrdersList');
    recentOrdersList.innerHTML = '';
    orders.slice(0, 5).forEach(order => {
        recentOrdersList.innerHTML += `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customer}</td>
                <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
                <td>$${order.total.toFixed(2)}</td>
                <td>${order.date}</td>
            </tr>
        `;
    });
}

function loadProducts() {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    
    products.forEach(product => {
        productsList.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td><img src="${product.image}" style="width:50px; border-radius:5px;"></td>
                <td>
                    <button class="action-btn edit-btn" onclick="editProduct(${product.id})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function loadOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        ordersList.innerHTML += `
            <tr>
                <td>#${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.items}</td>
                <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
                <td>$${order.total.toFixed(2)}</td>
                <td>${order.date}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="updateOrderStatus(${order.id})">Update</button>
                </td>
            </tr>
        `;
    });
}

function loadCustomers() {
    const customersList = document.getElementById('customersList');
    customersList.innerHTML = '';
    
    customers.forEach(customer => {
        customersList.innerHTML += `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>${customer.totalOrders}</td>
                <td>$${customer.totalSpent.toFixed(2)}</td>
            </tr>
        `;
    });
}

function loadCoupons() {
    const couponsList = document.getElementById('couponsList');
    couponsList.innerHTML = '';
    
    coupons.forEach((coupon, index) => {
        couponsList.innerHTML += `
            <tr>
                <td>${coupon.code}</td>
                <td>${coupon.discount}%</td>
                <td>${coupon.validTill}</td>
                <td>${coupon.usage}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="deleteCoupon(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// Product Management
let currentProductId = null;

function openProductModal() {
    currentProductId = null;
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productStock').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productModal').classList.add('show');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

function saveProduct(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const stock = parseInt(document.getElementById('productStock').value);
    const image = document.getElementById('productImage').value;
    const description = document.getElementById('productDescription').value;

    if (currentProductId) {
        const product = products.find(p => p.id === currentProductId);
        product.name = name;
        product.price = price;
        product.stock = stock;
        product.image = image;
    } else {
        products.push({
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name: name,
            price: price,
            stock: stock,
            image: image
        });
    }

    localStorage.setItem('adminProducts', JSON.stringify(products));
    loadProducts();
    loadDashboard();
    closeProductModal();
    alert('Product saved successfully!');
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    currentProductId = id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productImage').value = product.image;
    document.getElementById('productModal').classList.add('show');
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        localStorage.setItem('adminProducts', JSON.stringify(products));
        loadProducts();
        loadDashboard();
        alert('Product deleted successfully!');
    }
}

// Coupon Management
function openCouponModal() {
    document.getElementById('couponCode').value = '';
    document.getElementById('couponDiscount').value = '';
    document.getElementById('couponValidTill').value = '';
    document.getElementById('couponModal').classList.add('show');
}

function closeCouponModal() {
    document.getElementById('couponModal').classList.remove('show');
}

function saveCoupon(event) {
    event.preventDefault();
    
    const code = document.getElementById('couponCode').value.toUpperCase();
    const discount = parseInt(document.getElementById('couponDiscount').value);
    const validTill = document.getElementById('couponValidTill').value;

    coupons.push({
        code: code,
        discount: discount,
        validTill: validTill,
        usage: 0
    });

    localStorage.setItem('adminCoupons', JSON.stringify(coupons));
    loadCoupons();
    closeCouponModal();
    alert('Coupon created successfully!');
}

function deleteCoupon(index) {
    if (confirm('Are you sure you want to delete this coupon?')) {
        coupons.splice(index, 1);
        localStorage.setItem('adminCoupons', JSON.stringify(coupons));
        loadCoupons();
        alert('Coupon deleted successfully!');
    }
}

// Order Management
function updateOrderStatus(id) {
    const order = orders.find(o => o.id === id);
    const statuses = ['Pending', 'Processing', 'Delivered', 'Cancelled'];
    const currentIndex = statuses.indexOf(order.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    
    order.status = nextStatus;
    localStorage.setItem('adminOrders', JSON.stringify(orders));
    loadOrders();
    loadDashboard();
    alert(`Order status updated to ${nextStatus}`);
}

// Settings
function saveSettings(event) {
    event.preventDefault();
    
    const settings = {
        siteName: document.getElementById('siteName').value,
        siteEmail: document.getElementById('siteEmail').value,
        sitePhone: document.getElementById('sitePhone').value,
        currency: document.getElementById('currency').value
    };

    localStorage.setItem('siteSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    }
}

// Close modals when clicking outside
window.onclick = function(event) {
    const productModal = document.getElementById('productModal');
    const couponModal = document.getElementById('couponModal');
    
    if (event.target === productModal) {
        productModal.classList.remove('show');
    }
    if (event.target === couponModal) {
        couponModal.classList.remove('show');
    }
}
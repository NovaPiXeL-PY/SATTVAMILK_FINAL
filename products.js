import './style.css'

// Cart functionality (shared across pages)
let cart = [];
let isCartOpen = false;

function updateCartUI() {
  const cartPanel = document.querySelector('.cart-panel');
  const cartCount = document.querySelector('.cart-count');
  const cartItems = document.querySelector('.cart-items');
  const cartTotal = document.querySelector('.cart-total');
  
  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Show/hide cart panel
  if (totalItems > 0) {
    cartPanel.classList.add('visible');
  } else {
    cartPanel.classList.remove('visible');
    cartPanel.classList.remove('expanded');
    isCartOpen = false;
  }
  
  // Update cart items
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach(item => {
    total += item.price * item.quantity;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>${item.hindi}</p>
        <span class="cart-item-price">₹${item.price} × ${item.quantity}</span>
      </div>
      <div class="cart-item-controls">
        <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
        <span class="quantity">${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')">×</button>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });
  
  cartTotal.textContent = `₹${total}`;
}

function addToCart(productId) {
  const products = {
    'organic-cow-milk': {
      id: 'organic-cow-milk',
      name: 'Organic Cow Milk',
      hindi: 'ऑर्गेनिक गाय का दूध',
      price: 85,
      unit: 'per 1L'
    },
    'organic-desi-ghee': {
      id: 'organic-desi-ghee',
      name: 'Organic Desi Cow Ghee',
      hindi: 'ऑर्गेनिक देसी गाय का घी',
      price: 795,
      unit: 'per 500ml'
    },
    'fresh-buttermilk': {
      id: 'fresh-buttermilk',
      name: 'Organic Fresh Buttermilk',
      hindi: 'ऑर्गेनिक ताज़ा छछ',
      price: 64,
      unit: 'per 1L'
    },
    'greek-yogurt': {
      id: 'greek-yogurt',
      name: 'Organic Greek Yogurt',
      hindi: 'ऑर्गेनिक ग्रीक दही',
      price: 265,
      unit: 'per 500g'
    },
    'malai-paneer': {
      id: 'malai-paneer',
      name: 'Organic Malai Paneer',
      hindi: 'ऑर्गेनिक मलाई पनीर',
      price: 191,
      unit: 'per 250g'
    },
    'organic-milk-uht': {
      id: 'organic-milk-uht',
      name: 'Organic Milk - UHT',
      hindi: 'ऑर्गेनिक दूध (यूएचटी)',
      price: 106,
      unit: 'per 1L'
    },
    'probiotic-curd': {
      id: 'probiotic-curd',
      name: 'Organic Probiotic Curd',
      hindi: 'ऑर्गेनिक प्रोबायोटिक दही',
      price: 127,
      unit: 'per 500g'
    },
    'organic-butter': {
      id: 'organic-butter',
      name: 'Organic Butter',
      hindi: 'ऑर्गेनिक मक्खन',
      price: 159,
      unit: 'per 200g'
    },
    'buttermilk-otg': {
      id: 'buttermilk-otg',
      name: 'Organic Buttermilk On-the-go',
      hindi: 'ऑर्गेनिक छछ (पैकेट)',
      price: 43,
      unit: 'per 200ml'
    },
    'cheddar-cheese': {
      id: 'cheddar-cheese',
      name: 'Organic Cheddar Cheese',
      hindi: 'ऑर्गेनिक चेडर चीज़',
      price: 318,
      unit: 'per 200g'
    }
  };
  
  const product = products[productId];
  if (!product) return;
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartUI();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
}

function toggleCart() {
  const cartPanel = document.querySelector('.cart-panel');
  if (isCartOpen) {
    cartPanel.classList.remove('expanded');
    isCartOpen = false;
  } else {
    cartPanel.classList.add('expanded');
    isCartOpen = true;
  }
}

// Make functions global
window.addToCart = addToCart;
window.updateQuantity = updateQuantity;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;

document.querySelector('#app').innerHTML = `
  <!-- Header -->
  <header class="header">
    <div class="container">
      <div class="logo">
        <div class="logo-icon">
          <img src="/public/image.png" alt="SATTVAMILK Logo" width="50" height="50" />
        </div>
        <div class="logo-text">
          <div class="brand-name">SATTVAMILK</div>
          <div class="brand-tagline">सत्य दूध - The Honest Dairy</div>
        </div>
      </div>
      <nav class="nav">
        <a href="/" class="nav-link">Home</a>
        <a href="/products.html" class="nav-link active">Products</a>
        <a href="#" class="nav-link">Our Story</a>
        <a href="#" class="nav-link">Traceability</a>
        <a href="#" class="nav-link">Contact</a>
      </nav>
      <button class="cta-button">Order Now</button>
    </div>
  </header>

  <!-- Products Section -->
  <section class="products">
    <div class="container">
      <div class="section-header">
        <h2>Our <span class="highlight">Pure</span> Products</h2>
        <p class="section-subtitle">
          <span class="hindi">हमारे शुद्ध उत्पाद</span> - From fresh morning milk to traditional ghee, every product tells a<br>
          story of purity and tradition
        </p>
      </div>
      
      <div class="products-table">
        <div class="table-header">
          <div class="header-cell">Product</div>
          <div class="header-cell">Market Price</div>
          <div class="header-cell">Our Price</div>
          <div class="header-cell">Benefits</div>
          <div class="header-cell">Action</div>
        </div>
        
        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Cow Milk</h3>
              <p class="product-hindi">ऑर्गेनिक गाय का दूध</p>
              <span class="product-unit">per 1L</span>
              <div class="product-tags">
                <span class="tag bestseller">Best Seller</span>
                <span class="tag fresh">Fresh Today</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹90</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹85</span>
            <span class="markup">+6% markup</span>
            <span class="savings">Save ₹7</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">A2 Desi Cow Milk — Farm Fresh, No Adulterants</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('organic-cow-milk')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Desi Cow Ghee</h3>
              <p class="product-hindi">ऑर्गेनिक देसी गाय का घी</p>
              <span class="product-unit">per 500ml</span>
              <div class="product-tags">
                <span class="tag bestseller">Best Seller</span>
                <span class="tag traditional">Traditional</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹750</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹795</span>
            <span class="markup">+6% markup</span>
            <span class="savings">Save ₹67.5</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">Bilona Method — Pure A2 Cow Ghee</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('organic-desi-ghee')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Fresh Buttermilk</h3>
              <p class="product-hindi">ऑर्गेनिक ताज़ा छछ</p>
              <span class="product-unit">per 1L</span>
              <div class="product-tags">
                <span class="tag fresh">Fresh Today</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹60</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹64</span>
            <span class="markup">+6% markup</span>
            <span class="savings">Save ₹5</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">Probiotic Rich — Perfect for Digestion</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('fresh-buttermilk')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Greek Yogurt</h3>
              <p class="product-hindi">ऑर्गेनिक ग्रीक दही</p>
              <span class="product-unit">per 500g</span>
              <div class="product-tags">
                <span class="tag premium">Premium</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹250</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹265</span>
            <span class="markup">+6% markup</span>
            <span class="savings">Save ₹22.5</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">Thick & Creamy — High Protein</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('greek-yogurt')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Malai Paneer</h3>
              <p class="product-hindi">ऑर्गेनिक मलाई पनीर</p>
              <span class="product-unit">per 250g</span>
              <div class="product-tags">
                <span class="tag fresh">Fresh Today</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹180</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹191</span>
            <span class="markup">+6% markup</span>
            <span class="savings">Save ₹16</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">Soft Texture — High Protein Content</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('malai-paneer')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Milk - UHT</h3>
              <p class="product-hindi">ऑर्गेनिक दूध (यूएचटी)</p>
              <span class="product-unit">per 1L</span>
              <div class="product-tags">
                <span class="tag convenient">Convenient</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹100</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹106</span>
            <span class="markup">+6% markup</span>
            <span class="savings">Save ₹9</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">Long Shelf Life — Same Nutrition</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('organic-milk-uht')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Probiotic Curd</h3>
              <p class="product-hindi">ऑर्गेनिक प्रोबायोटिक दही</p>
              <span class="product-unit">per 500g</span>
              <div class="product-tags">
                <span class="tag fresh">Fresh Today</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹120</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹127</span>
            <span class="markup">+6% markup</span>
            <span class="savings">Save ₹11</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">Live Cultures — Digestive Health</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('probiotic-curd')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Butter</h3>
              <p class="product-hindi">ऑर्गेनिक मक्खन</p>
              <span class="product-unit">per 200g</span>
              <div class="product-tags">
                <span class="tag premium">Premium</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹150</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹159</span>
            <span class="markup">+6% markup</span>
            <span class="savings">Save ₹13.5</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">Churned Fresh — Rich in Vitamins A & D</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('organic-butter')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Buttermilk On-the-go</h3>
              <p class="product-hindi">ऑर्गेनिक छछ (पैकेट)</p>
              <span class="product-unit">per 200ml</span>
              <div class="product-tags">
                <span class="tag travel">Travel Size</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹40</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹43</span>
            <span class="markup">+8% markup</span>
            <span class="savings">Save ₹3</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">Convenient Pack — Instant Energy</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('buttermilk-otg')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>

        <div class="product-row">
          <div class="product-info">
            <div class="product-image-placeholder"></div>
            <div class="product-details">
              <h3>Organic Cheddar Cheese</h3>
              <p class="product-hindi">ऑर्गेनिक चेडर चीज़</p>
              <span class="product-unit">per 200g</span>
              <div class="product-tags">
                <span class="tag premium">Premium</span>
              </div>
            </div>
          </div>
          <div class="price-cell">
            <span class="market-price">₹300</span>
            <span class="market-avg">Market Avg.</span>
          </div>
          <div class="our-price-cell">
            <span class="our-price">₹318</span>
            <span class="markup">+6% markup</span>
            <span class="savings">Save ₹27</span>
          </div>
          <div class="benefits-cell">
            <span class="benefit-text">Aged Naturally — Rich in Protein</span>
          </div>
          <div class="action-cell">
            <button class="add-to-cart-btn" onclick="addToCart('cheddar-cheese')">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <div class="logo-icon">
              <img src="/public/image.png" alt="SATTVAMILK Logo" width="40" height="40" />
            </div>
            <div class="logo-text">
              <div class="brand-name">SATTVAMILK</div>
              <div class="brand-tagline">सत्य दूध</div>
            </div>
          </div>
          <p>Pure, honest dairy from our heart to yours. Experience the authentic taste of traditional farming.</p>
          <div class="social-links">
            <a href="#" class="social-link">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="#" class="social-link">
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div class="link-group">
            <h4>Products</h4>
            <a href="#">A2 Cow Milk</a>
            <a href="#">Fresh Buttermilk</a>
            <a href="#">Organic Ghee</a>
            <a href="#">Malai Paneer</a>
            <a href="#">Greek Yogurt</a>
            <a href="#">Probiotic Curd</a>
          </div>
          <div class="link-group">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Our Farmers</a>
            <a href="#">Quality Promise</a>
            <a href="#">Sustainability</a>
            <a href="#">Careers</a>
            <a href="#">Press</a>
          </div>
          <div class="link-group">
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Delivery Info</a>
            <a href="#">Returns</a>
            <a href="#">Contact Us</a>
            <a href="#">Track Order</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-legal">
          <span>© 2024 SATTVAMILK. All rights reserved.</span>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div class="footer-location">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>Proudly serving from Rajasthan, India</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- Cart Panel -->
  <div class="cart-panel" onclick="toggleCart()">
    <div class="cart-summary">
      <div class="cart-icon">
        <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
        </svg>
        <span class="cart-count">0</span>
      </div>
      <div class="cart-text">
        <span>Cart Total: <span class="cart-total">₹0</span></span>
        <span class="cart-subtitle">Click to view details</span>
      </div>
      <div class="cart-arrow">
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 14l5-5 5 5z"/>
        </svg>
      </div>
    </div>
    
    <div class="cart-details" onclick="event.stopPropagation()">
      <div class="cart-header">
        <h3>Your Cart</h3>
        <button class="close-cart" onclick="toggleCart()">×</button>
      </div>
      <div class="cart-items"></div>
      <div class="cart-footer">
        <div class="cart-total-section">
          <span class="total-label">Total: </span>
          <span class="cart-total">₹0</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  </div>

  <!-- Cart Overlay -->
  <div class="cart-overlay" onclick="toggleCart()"></div>
`

// Add click outside functionality
document.addEventListener('click', function(event) {
  const cartPanel = document.querySelector('.cart-panel');
  const isClickInsideCart = cartPanel.contains(event.target);
  
  if (!isClickInsideCart && isCartOpen) {
    cartPanel.classList.remove('expanded');
    isCartOpen = false;
  }
});
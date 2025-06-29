import './style.css'

// Cart functionality
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
        <a href="/" class="nav-link active">Home</a>
        <a href="/products.html" class="nav-link">Products</a>
        <a href="#" class="nav-link">Our Story</a>
        <a href="#" class="nav-link">Traceability</a>
        <a href="#" class="nav-link">Contact</a>
      </nav>
      <button class="cta-button">Order Now</button>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Pure. Fresh. <span class="highlight">Honest</span><br>
            Dairy
          </h1>
          <p class="hero-subtitle">
            <span class="hindi">सबसे की ताज़ा दूध</span> - Experience the authentic taste of farm-fresh A2 milk,<br>
            delivered from our trusted farms to your doorstep within hours of milking.
          </p>
          <div class="hero-features">
            <div class="feature">
              <svg width="20" height="20" fill="#E67E3B" viewBox="0 0 20 20">
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 7h12v9H4V7z"/>
                <path d="M8 11a1 1 0 100-2 1 1 0 000 2zM12 11a1 1 0 100-2 1 1 0 000 2z"/>
              </svg>
              <span>100% A2 Desi Cow Milk</span>
            </div>
            <div class="feature">
              <svg width="20" height="20" fill="#4A5568" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Certified Organic</span>
            </div>
            <div class="feature">
              <svg width="20" height="20" fill="#E53E3E" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
              </svg>
              <span>Farm to Table in 6 Hours</span>
            </div>
          </div>
          <div class="hero-buttons">
            <button class="primary-button">Start Your Subscription</button>
            <button class="secondary-button">Explore Products</button>
          </div>
          <div class="testimonial">
            <p>"हमारे गायों का दूध स्वादिष्ट और पौष्टिक है। SATTVAMILK पर भरोसा करो।"</p>
            <span>- Ramesh Sharma, Dairy Farmer, Rajasthan</span>
          </div>
        </div>
        <div class="hero-card">
          <div class="delivery-icon">
            <svg width="60" height="60" fill="#E67E3B" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM16 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <h3>Fresh Delivery</h3>
          <p>Every morning at 6 AM, fresh A2 milk from our partner farms reaches your doorstep</p>
          <div class="price">
            <span class="current-price">₹85</span>
            <span class="price-unit">per litre | Organic A2 Milk</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Our Story Section -->
  <section class="our-story">
    <div class="container">
      <div class="section-header">
        <h2>Our <span class="highlight">Story</span></h2>
        <p class="section-subtitle">
          <span class="hindi">हमारी कहानी</span> - From ethical animal care to your doorstep,<br>
          every step reflects our commitment to purity and tradition
        </p>
      </div>
      
      <div class="story-grid">
        <div class="story-item">
          <div class="story-icon">
            <svg width="48" height="48" fill="#E67E3B" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div class="story-content">
            <h3>Ethical Animal Care:</h3>
            <p>Our native cows, Gir and Sahiwal, are raised on pasture without hormones and are fed an Ayurvedic diet consisting of seasonal greens, mustard husk, jaggery water, and herbs.</p>
          </div>
        </div>

        <div class="story-item">
          <div class="story-icon">
            <svg width="48" height="48" fill="#E67E3B" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div class="story-content">
            <h3>Kindly, Satvik Extraction:</h3>
            <p>Only after the calf has fed is milk manually extracted. Not a machine. Don't worry. Not a single force.</p>
          </div>
        </div>

        <div class="story-item">
          <div class="story-icon">
            <svg width="48" height="48" fill="#E67E3B" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </div>
          <div class="story-content">
            <h3>Instant Cold Processing:</h3>
            <p>The milk is chilled using solar-powered cold storage within 20 minutes of being milked. This stops bacteria from growing and maintains nutrients.</p>
          </div>
        </div>

        <div class="story-item">
          <div class="story-icon">
            <svg width="48" height="48" fill="#E67E3B" viewBox="0 0 24 24">
              <path d="M9 11H7v9a2 2 0 002 2h8a2 2 0 002-2v-9h-2m-7 0V6a2 2 0 012-2h4a2 2 0 012 2v5m-6 0h4"/>
            </svg>
          </div>
          <div class="story-content">
            <h3>Bottling and Quality Control:</h3>
            <p>All batches are examined, recorded, and packaged in glass bottles or biodegradable pouches; no preservatives or plastics are used.</p>
          </div>
        </div>

        <div class="story-item">
          <div class="story-icon">
            <svg width="48" height="48" fill="#E67E3B" viewBox="0 0 24 24">
              <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zM10 6a2 2 0 014 0v1h-4V6zm8 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 002 0V9h4v1a1 1 0 002 0V9h2v10z"/>
            </svg>
          </div>
          <div class="story-content">
            <h3>Last-Mile Cold-Chain Delivery:</h3>
            <p>Orders are processed through our app or partners, and they are delivered the same day at a temperature that is controlled. In less than eight hours, from farm to door.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Heritage Story Section -->
  <section class="heritage">
    <div class="container">
      <div class="heritage-content">
        <div class="heritage-text">
          <h2>Our <span class="highlight">Heritage</span> Story</h2>
          <p class="section-subtitle">
            <span class="hindi">हमारी विरासत की कहानी</span> - Born from a deep respect for traditional dairy farming and<br>
            our sacred relationship with cows, SATTVAMILK represents generations of wisdom.
          </p>

          <div class="story-cards">
            <div class="story-card">
              <h3>गाय माता - Sacred Bond</h3>
              <p>In Indian culture, cows are revered as mothers who give selflessly. Our farmers treat each cow with love and respect, ensuring their wellbeing translates into the purest milk.</p>
            </div>
            <div class="story-card">
              <h3>Traditional Methods, Modern Quality</h3>
              <p>We combine time-honored practices like the bilona method for ghee with modern quality testing to ensure every product meets the highest standards.</p>
            </div>
          </div>

          <div class="stats">
            <div class="stat">
              <div class="stat-icon">
                <svg width="40" height="40" fill="#E67E3B" viewBox="0 0 24 24">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
              <div class="stat-number">50+</div>
              <div class="stat-label">Partner Farmers</div>
            </div>
            <div class="stat">
              <div class="stat-icon">
                <svg width="40" height="40" fill="#4A5568" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="stat-number">100%</div>
              <div class="stat-label">Organic Certified</div>
            </div>
          </div>
        </div>

        <div class="journey-timeline">
          <h3>Farm to Table Journey</h3>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-icon morning">
                <svg width="24" height="24" fill="#E67E3B" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div class="timeline-content">
                <h4>5:00 AM - Morning Milking</h4>
                <p>Our partner farmers begin the day with traditional prayers and fresh milking from happy, well-fed A2 desi cows.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon testing">
                <svg width="24" height="24" fill="#4A5568" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div class="timeline-content">
                <h4>6:00 AM - Quality Testing</h4>
                <p>Every batch undergoes rigorous testing for purity, fat content, and absence of adulterants in our certified labs.</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-icon delivery">
                <svg width="24" height="24" fill="#E67E3B" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div class="timeline-content">
                <h4>8:00 AM - Fresh Delivery</h4>
                <p>Within 3 hours of milking, fresh milk reaches your doorstep in recyclable glass bottles, preserving taste and nutrition.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Transparency Section -->
  <section class="transparency">
    <div class="container">
      <div class="transparency-header">
        <h2>Complete <span class="highlight">Transparency</span></h2>
        <p class="section-subtitle">
          <span class="hindi">ट्रेसेबिलिटी की गारंटी</span> - Every product carries a unique QR code connecting you directly to<br>
          its source farm, ensuring complete transparency.
        </p>
      </div>

      <div class="transparency-content">
        <div class="qr-section">
          <div class="qr-card">
            <div class="qr-code">
              <div class="qr-pattern">
                <div class="qr-dot"></div>
                <div class="qr-dot"></div>
                <div class="qr-dot"></div>
                <div class="qr-dot"></div>
                <div class="qr-dot"></div>
                <div class="qr-dot"></div>
                <div class="qr-dot"></div>
                <div class="qr-dot"></div>
                <div class="qr-dot"></div>
              </div>
            </div>
            <h3>Scan & Discover</h3>
            <p>Simply scan the QR code on your milk bottle to reveal its complete journey</p>
          </div>

          <div class="certification-badges">
            <div class="badge">
              <div class="badge-icon">
                <svg width="40" height="40" fill="#4A5568" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4>Lab Certified</h4>
              <p>FSSAI & Organic Certified</p>
            </div>
            <div class="badge">
              <div class="badge-icon">
                <svg width="40" height="40" fill="#E67E3B" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4>Verified Source</h4>
              <p>Direct from Partner Farms</p>
            </div>
          </div>
        </div>

        <div class="traceability-info">
          <div class="info-section">
            <h3>Farm Details</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Farmer Name:</span>
                <span class="info-value">श्री रमेश शर्मा</span>
              </div>
              <div class="info-item">
                <span class="info-label">Farm Location:</span>
                <span class="info-value">Jaipur, Rajasthan</span>
              </div>
              <div class="info-item">
                <span class="info-label">Milking Date:</span>
                <span class="info-value">Today, 5:30 AM</span>
              </div>
              <div class="info-item">
                <span class="info-label">Cow Breed:</span>
                <span class="info-value">Gir A2 Desi</span>
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3>Quality Tests</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Fat Content:</span>
                <span class="info-value">4.2%</span>
              </div>
              <div class="info-item">
                <span class="info-label">Protein:</span>
                <span class="info-value">3.8%</span>
              </div>
              <div class="info-item">
                <span class="info-label">Adulterants:</span>
                <span class="info-value">None Detected ✓</span>
              </div>
              <div class="info-item">
                <span class="info-label">Antibiotics:</span>
                <span class="info-value">None Detected ✓</span>
              </div>
            </div>
          </div>

          <div class="farm-promise">
            <h4>Farm-to-Table Promise</h4>
            <p>"हमारी गाय माता खुश और स्वस्थ है। उनका दूध प्राकृतिक रूप से मिलता से भरपूर है।" - Direct message from श्री रमेश शर्मा</p>
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
// Currency conversion setup
const currencyMap = {
    'en': 'USD',
    'pl': 'PLN',
    'de': 'EUR',
    'fr': 'EUR',
    'es': 'EUR',
    'it': 'EUR',
    'pt': 'EUR',
    'ru': 'RUB',
    'ja': 'JPY',
    'ko': 'KRW',
    'zh': 'CNY',
    'ar': 'SAR',
    'hi': 'INR',
    'tr': 'TRY',
    'nl': 'EUR',
    'sv': 'SEK',
    'da': 'DKK',
    'no': 'NOK',
    'fi': 'EUR',
    'cs': 'CZK',
    'sk': 'EUR',
    'hu': 'HUF',
    'ro': 'RON',
    'bg': 'BGN',
    'hr': 'HRK',
    'sl': 'EUR',
    'et': 'EUR',
    'lv': 'EUR',
    'lt': 'EUR',
    'mt': 'EUR',
    'cy': 'GBP',
    'ga': 'EUR',
    'is': 'ISK',
    'fo': 'DKK',
    'kl': 'DKK'
};

// Currency selector options with flag URLs
const currencyOptions = [
    { code: 'USD', name: 'USD', flag: 'https://flagcdn.com/w40/us.png', country: 'us' },
    { code: 'PLN', name: 'PLN', flag: 'https://flagcdn.com/w40/pl.png', country: 'pl' },
    { code: 'EUR', name: 'EUR', flag: 'https://flagcdn.com/w40/eu.png', country: 'eu' },
    { code: 'GBP', name: 'GBP', flag: 'https://flagcdn.com/w40/gb.png', country: 'gb' },
    { code: 'JPY', name: 'JPY', flag: 'https://flagcdn.com/w40/jp.png', country: 'jp' },
    { code: 'CAD', name: 'CAD', flag: 'https://flagcdn.com/w40/ca.png', country: 'ca' },
    { code: 'AUD', name: 'AUD', flag: 'https://flagcdn.com/w40/au.png', country: 'au' },
    { code: 'CHF', name: 'CHF', flag: 'https://flagcdn.com/w40/ch.png', country: 'ch' },
    { code: 'SEK', name: 'SEK', flag: 'https://flagcdn.com/w40/se.png', country: 'se' },
    { code: 'NOK', name: 'NOK', flag: 'https://flagcdn.com/w40/no.png', country: 'no' },
    { code: 'DKK', name: 'DKK', flag: 'https://flagcdn.com/w40/dk.png', country: 'dk' },
    { code: 'CZK', name: 'CZK', flag: 'https://flagcdn.com/w40/cz.png', country: 'cz' },
    { code: 'HUF', name: 'HUF', flag: 'https://flagcdn.com/w40/hu.png', country: 'hu' },
    { code: 'RUB', name: 'RUB', flag: 'https://flagcdn.com/w40/ru.png', country: 'ru' },
    { code: 'TRY', name: 'TRY', flag: 'https://flagcdn.com/w40/tr.png', country: 'tr' },
    { code: 'KRW', name: 'KRW', flag: 'https://flagcdn.com/w40/kr.png', country: 'kr' },
    { code: 'CNY', name: 'CNY', flag: 'https://flagcdn.com/w40/cn.png', country: 'cn' },
    { code: 'INR', name: 'INR', flag: 'https://flagcdn.com/w40/in.png', country: 'in' },
    { code: 'BRL', name: 'BRL', flag: 'https://flagcdn.com/w40/br.png', country: 'br' },
    { code: 'MXN', name: 'MXN', flag: 'https://flagcdn.com/w40/mx.png', country: 'mx' },
    { code: 'ZAR', name: 'ZAR', flag: 'https://flagcdn.com/w40/za.png', country: 'za' },
    { code: 'SGD', name: 'SGD', flag: 'https://flagcdn.com/w40/sg.png', country: 'sg' },
    { code: 'HKD', name: 'HKD', flag: 'https://flagcdn.com/w40/hk.png', country: 'hk' },
    { code: 'NZD', name: 'NZD', flag: 'https://flagcdn.com/w40/nz.png', country: 'nz' },
    { code: 'THB', name: 'THB', flag: 'https://flagcdn.com/w40/th.png', country: 'th' },
    { code: 'MYR', name: 'MYR', flag: 'https://flagcdn.com/w40/my.png', country: 'my' },
    { code: 'PHP', name: 'PHP', flag: 'https://flagcdn.com/w40/ph.png', country: 'ph' },
    { code: 'IDR', name: 'IDR', flag: 'https://flagcdn.com/w40/id.png', country: 'id' },
    { code: 'VND', name: 'VND', flag: 'https://flagcdn.com/w40/vn.png', country: 'vn' },
    { code: 'EGP', name: 'EGP', flag: 'https://flagcdn.com/w40/eg.png', country: 'eg' },
    { code: 'SAR', name: 'SAR', flag: 'https://flagcdn.com/w40/sa.png', country: 'sa' },
    { code: 'AED', name: 'AED', flag: 'https://flagcdn.com/w40/ae.png', country: 'ae' },
    { code: 'ILS', name: 'ILS', flag: 'https://flagcdn.com/w40/il.png', country: 'il' }
];

let exchangeRates = {};
let userCurrency = 'USD';

async function fetchExchangeRates() {
    try {
        // Primary API: exchangerate.host (free, no API key required)
        const response = await fetch('https://api.exchangerate.host/latest?base=USD');
        const data = await response.json();
        if (data.rates) {
            exchangeRates = data.rates;
            console.log('Exchange rates loaded from exchangerate.host:', exchangeRates);
        } else {
            throw new Error('Invalid response from exchangerate.host');
        }
    } catch (error) {
        console.error('Failed to fetch from exchangerate.host:', error);
        try {
            // Secondary API: ExchangeRate-API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            if (data.rates) {
                exchangeRates = data.rates;
                console.log('Exchange rates loaded from ExchangeRate-API:', exchangeRates);
            } else {
                throw new Error('Invalid response from ExchangeRate-API');
            }
        } catch (fallbackError) {
            console.error('All API calls failed - no exchange rates available:', fallbackError);
            // No hardcoded rates - prices will remain in USD if APIs fail
            exchangeRates = { USD: 1 };
            alert('Unable to load exchange rates. Prices shown in USD. Please check your internet connection.');
        }
    }
}

function detectUserCurrency() {
    const lang = navigator.language.split('-')[0];
    console.log('Detected language:', lang, 'Currency:', currencyMap[lang] || 'USD');
    return currencyMap[lang] || 'USD';
}

function convertPrice(priceUSD, targetCurrency) {
    if (!exchangeRates[targetCurrency]) {
        console.log('No exchange rate for', targetCurrency, 'using USD');
        return priceUSD;
    }
    const converted = priceUSD * exchangeRates[targetCurrency];
    console.log('Converting', priceUSD, 'USD to', converted.toFixed(2), targetCurrency);
    return parseFloat(converted.toFixed(2));
}

function formatPrice(price, currency) {
    console.log('Formatting price:', price, 'for currency:', currency);
    const symbols = {
        USD: '$',
        PLN: 'zł',
        EUR: '€',
        GBP: '£',
        RUB: '₽',
        JPY: '¥',
        KRW: '₩',
        CNY: '¥',
        SAR: '﷼',
        INR: '₹',
        TRY: '₺',
        SEK: 'kr',
        DKK: 'kr',
        NOK: 'kr',
        CZK: 'Kč',
        HUF: 'Ft',
        RON: 'lei',
        BGN: 'лв',
        HRK: 'kn',
        ISK: 'kr'
    };
    const symbol = symbols[currency] || currency;
    // For currencies where symbol comes after the number
    const afterCurrencies = ['PLN', 'EUR', 'RUB', 'JPY', 'KRW', 'CNY', 'SAR', 'INR', 'TRY', 'SEK', 'DKK', 'NOK', 'CZK', 'HUF', 'RON', 'BGN', 'HRK', 'ISK'];
    let formattedPrice;
    if (afterCurrencies.includes(currency)) {
        formattedPrice = `${price} ${symbol}`;
    } else {
        // For currencies like CAD, AUD, etc., add space between symbol and number
        formattedPrice = `${symbol} ${price}`;
    }

    // Add currency note if not USD
    if (currency !== 'USD') {
        formattedPrice += '<br><small style="color: #ff6b6b; font-size: 0.5rem; font-family: Minecraft, monospace;">* Currency rates may be inaccurate by a few cents</small>';
    }

    return formattedPrice;
}

function createCurrencySelector() {
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;

    // Create currency selector container
    const currencyContainer = document.createElement('li');
    currencyContainer.className = 'currency-selector';

    // Get current currency option
    const currentOption = currencyOptions.find(opt => opt.code === userCurrency) || currencyOptions[0];

    currencyContainer.innerHTML = `
        <div class="currency-dropdown">
            <button class="currency-btn" id="currencyBtn">
                <img src="${currentOption.flag}" alt="${currentOption.code}" class="currency-flag" style="width: 20px; height: 15px; margin-right: 5px; border-radius: 2px;" onerror="this.style.display='none'">
                <span class="currency-code">${currentOption.code}</span>
                <i class="fas fa-chevron-down"></i>
            </button>
            <div class="currency-menu" id="currencyMenu">
                ${currencyOptions.map(option => `
                    <div class="currency-option ${option.code === userCurrency ? 'active' : ''}" data-currency="${option.code}">
                        <img src="${option.flag}" alt="${option.code}" class="currency-flag" style="width: 20px; height: 15px; margin-right: 8px; border-radius: 2px;" onerror="this.style.display='none'">
                        <span class="currency-code">${option.code}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Insert after "Combo Packs" menu item
    const comboLink = Array.from(navMenu.querySelectorAll('li a')).find(a => a.textContent.includes('Combo Packs'));
    if (comboLink) {
        const comboLi = comboLink.closest('li');
        comboLi.insertAdjacentElement('afterend', currencyContainer);
    } else {
        // Fallback: insert before the last item
        const menuItems = navMenu.querySelectorAll('li');
        if (menuItems.length > 0) {
            navMenu.insertBefore(currencyContainer, menuItems[menuItems.length - 1]);
        } else {
            navMenu.appendChild(currencyContainer);
        }
    }



    // Add event listeners
    const currencyBtn = document.getElementById('currencyBtn');
    const currencyMenu = document.getElementById('currencyMenu');

    if (currencyBtn && currencyMenu) {
        currencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            currencyMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!currencyContainer.contains(e.target)) {
                currencyMenu.classList.remove('show');
            }
        });

        // Handle currency selection
        currencyMenu.addEventListener('click', function(e) {
            const option = e.target.closest('.currency-option');
            if (option) {
                const newCurrency = option.dataset.currency;
                if (newCurrency && newCurrency !== userCurrency) {
                    userCurrency = newCurrency;
                    // Use cookies for cross-page persistence (expires in 30 days)
                    const expiryDate = new Date();
                    expiryDate.setTime(expiryDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days
                    document.cookie = `preferredCurrency=${userCurrency}; expires=${expiryDate.toUTCString()}; path=/`;
                    currencyMenu.classList.remove('show');

                    // Update UI
                    updateCurrencyDisplay();
                    updateAllPrices();
                    updateProductPrices();

                    console.log('Currency changed to:', userCurrency);
                }
            }
        });
    }
}

function updateCurrencyDisplay() {
    const currencyBtn = document.getElementById('currencyBtn');
    if (currencyBtn) {
        const currentOption = currencyOptions.find(opt => opt.code === userCurrency) || currencyOptions[0];
        currencyBtn.innerHTML = `
            <img src="${currentOption.flag}" alt="${currentOption.code}" class="currency-flag" style="width: 20px; height: 15px; margin-right: 5px; border-radius: 2px;" onerror="this.style.display='none'">
            <span class="currency-code">${currentOption.code}</span>
            <i class="fas fa-chevron-down"></i>
        `;
    }

    // Update active state in dropdown
    document.querySelectorAll('.currency-option').forEach(option => {
        option.classList.toggle('active', option.dataset.currency === userCurrency);
    });
}

function updateAllPrices() {
    // Update featured products
    loadFeaturedProducts();

    // Update page-specific products if they exist
    const pages = ['combos', 'maps', 'datapacks', 'models', 'resources'];
    pages.forEach(page => {
        const container = document.getElementById(`${page}-grid`);
        if (container) {
            // Clear existing content
            container.innerHTML = '';

            // Re-run the page-specific loading logic
            if (page === 'combos') {
                loadCombos();
            } else if (page === 'maps') {
                loadMaps();
            } else if (page === 'datapacks') {
                loadDatapacks();
            } else if (page === 'models') {
                loadModels();
            } else if (page === 'resources') {
                loadResources();
            }
        }
    });
}

function loadCombos() {
    const combos = [
        { id: 1, title: "Combo Pack 1", priceUSD: 8.99, image: "images/products/combo1.jpg", link: "products/combo1.html" },
        { id: 2, title: "Combo Pack 2", priceUSD: 7.99, image: "images/products/combo2.jpg", link: "products/combo2.html" }
    ];

    const container = document.getElementById('combos-grid');
    if (container) {
        combos.forEach(combo => {
            const convertedPrice = convertPrice(combo.priceUSD, userCurrency);
            const formattedPrice = formatPrice(convertedPrice, userCurrency);

            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${combo.image}" alt="${combo.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${combo.title}</h3>
                    <p class="product-price">${formattedPrice}</p>
                    <div class="product-buttons">
                        <a href="${combo.link}" class="btn btn-secondary">Details</a>
                        <a href="https://gumroad.com/craftlab/demo" class="btn btn-primary">Buy Now</a>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

function loadMaps() {
    const maps = [
        { id: 1, title: "Adventure Map", priceUSD: 5.99, image: "images/products/map1.jpg", link: "products/map1.html" },
        { id: 2, title: "Survival Map", priceUSD: 6.99, image: "images/products/map2.jpg", link: "products/map2.html" }
    ];

    const container = document.getElementById('maps-grid');
    if (container) {
        maps.forEach(map => {
            const convertedPrice = convertPrice(map.priceUSD, userCurrency);
            const formattedPrice = formatPrice(convertedPrice, userCurrency);

            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${map.image}" alt="${map.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${map.title}</h3>
                    <p class="product-price">${formattedPrice}</p>
                    <div class="product-buttons">
                        <a href="${map.link}" class="btn btn-secondary">Details</a>
                        <a href="https://gumroad.com/craftlab/demo" class="btn btn-primary">Buy Now</a>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

function loadDatapacks() {
    const datapacks = [
        { id: 1, title: "Advanced Crafting", priceUSD: 3.99, image: "images/products/datapack1.jpg", link: "products/datapack1.html" },
        { id: 2, title: "Randomized Mobs", priceUSD: 4.99, image: "images/products/datapack2.jpg", link: "products/datapack2.html" }
    ];

    const container = document.getElementById('datapacks-grid');
    if (container) {
        datapacks.forEach(datapack => {
            const convertedPrice = convertPrice(datapack.priceUSD, userCurrency);
            const formattedPrice = formatPrice(convertedPrice, userCurrency);

            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${datapack.image}" alt="${datapack.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${datapack.title}</h3>
                    <p class="product-price">${formattedPrice}</p>
                    <div class="product-buttons">
                        <a href="${datapack.link}" class="btn btn-secondary">Details</a>
                        <a href="https://gumroad.com/craftlab/demo" class="btn btn-primary">Buy Now</a>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

function loadModels() {
    const models = [
        { id: 1, title: "Medieval Armor Set", priceUSD: 4.99, image: "images/products/model1.jpg", link: "products/model1.html" },
        { id: 2, title: "Iron Sword 3D", priceUSD: 2.99, image: "images/products/model2.jpg", link: "products/model2.html" }
    ];

    const container = document.getElementById('models-grid');
    if (container) {
        models.forEach(model => {
            const convertedPrice = convertPrice(model.priceUSD, userCurrency);
            const formattedPrice = formatPrice(convertedPrice, userCurrency);

            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${model.image}" alt="${model.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${model.title}</h3>
                    <p class="product-price">${formattedPrice}</p>
                    <div class="product-buttons">
                        <a href="${model.link}" class="btn btn-secondary">Details</a>
                        <a href="https://gumroad.com/craftlab/demo" class="btn btn-primary">Buy Now</a>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

function loadResources() {
    const resources = [
        { id: 1, title: "Luminous Shaders", priceUSD: 5.99, image: "images/products/resourcepack1.jpg", link: "products/resourcepack1.html" },
        { id: 2, title: "Dark Textures", priceUSD: 4.99, image: "images/products/resourcepack2.jpg", link: "products/resourcepack2.html" }
    ];

    const container = document.getElementById('resources-grid');
    if (container) {
        resources.forEach(resource => {
            const convertedPrice = convertPrice(resource.priceUSD, userCurrency);
            const formattedPrice = formatPrice(convertedPrice, userCurrency);

            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${resource.image}" alt="${resource.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${resource.title}</h3>
                    <p class="product-price">${formattedPrice}</p>
                    <div class="product-buttons">
                        <a href="${resource.link}" class="btn btn-secondary">Details</a>
                        <a href="https://gumroad.com/craftlab/demo" class="btn btn-primary">Buy Now</a>
                    </div>
                </div>
            `;
            container.appendChild(productCard);
        });
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    // Initialize currency based on cookies or language detection
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const savedCurrency = getCookie('preferredCurrency');
    if (savedCurrency && currencyOptions.find(opt => opt.code === savedCurrency)) {
        userCurrency = savedCurrency;
    } else {
        // Only detect from language if no saved preference
        userCurrency = detectUserCurrency();
    }

    console.log('User currency set to:', userCurrency);
    await fetchExchangeRates();

    // Create currency selector
    createCurrencySelector();

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu li a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Handle dropdown menu for desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (window.innerWidth > 768) {
            // Desktop: hover to show/hide
            dropdown.addEventListener('mouseenter', () => {
                menu.classList.add('show');
            });
            dropdown.addEventListener('mouseleave', () => {
                menu.classList.remove('show');
            });
        } else {
            // Mobile: click to toggle
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                menu.classList.toggle('show');
            });
        }
    });

    // Load featured products
    loadFeaturedProducts();

    // Handle 404 page - redirect to 404.html for non-existent pages
    // This would typically be handled by server configuration, but for local development:
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT') {
            // If a resource fails to load, don't redirect
            return;
        }
    });

    // Load page-specific products if they exist
    const pages = ['combos', 'maps', 'datapacks', 'models', 'resources'];
    pages.forEach(page => {
        const container = document.getElementById(`${page}-grid`);
        if (container) {
            if (page === 'combos') {
                loadCombos();
            } else if (page === 'maps') {
                loadMaps();
            } else if (page === 'datapacks') {
                loadDatapacks();
            } else if (page === 'models') {
                loadModels();
            } else if (page === 'resources') {
                loadResources();
            }
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Check if the email is not the contact email
            if (email.toLowerCase() === 'craftlab.feedback@gmail.com') {
                alert('Please use a different email address for sending the message.');
                return;
            };
        }
    );
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero-background');
        if (hero) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0px, ${rate}px, 0px)`;
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe product cards for animation
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });

    // Initialize image carousel on product detail pages
    initializeImageCarousel();

    // Initialize lightbox modal
    initializeLightbox();

    // Update prices on product detail pages after currency initialization
    updateProductPrices();
});

// Image carousel functionality
function initializeImageCarousel() {
    const carouselContainers = document.querySelectorAll('.image-carousel');

    carouselContainers.forEach(container => {
        const images = container.querySelectorAll('.carousel-image');
        const indicators = container.querySelectorAll('.indicator');

        if (images.length === 0) return;

        let currentIndex = 0;
        let autoSlideInterval;

        // Set initial active image and indicator
        updateCarousel();

        // Auto slide every 5 seconds
        startAutoSlide();

        // Click on image to open lightbox
        images.forEach((img, index) => {
            img.addEventListener('click', () => {
                openLightbox(img.src, index);
            });
        });

        // Click on indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetAutoSlide();
            });
        });

        // Pause auto slide on hover
        container.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        container.addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        function updateCarousel() {
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 15000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }
    });
}

// Lightbox modal functionality
function initializeLightbox() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <span class="close">&times;</span>
        <img class="modal-content" id="lightbox-image">
    `;
    document.body.appendChild(modal);

    const modalImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close');

    // Close modal when clicking the close button
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside the image
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Close modal on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

function openLightbox(src, index) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-image');

    modal.style.display = 'block';
    modalImg.src = src;
}

// Update product prices based on currency selection
function updateProductPrices() {
    const priceElements = document.querySelectorAll('.product-price[data-price-usd]');

    priceElements.forEach(element => {
        const priceUSD = parseFloat(element.getAttribute('data-price-usd'));
        const convertedPrice = convertPrice(priceUSD, userCurrency);
        const formattedPrice = formatPrice(convertedPrice, userCurrency);
        element.innerHTML = formattedPrice;
    });
}

// Initialize price updates on product detail pages
document.addEventListener('DOMContentLoaded', function() {
    // Update prices on product detail pages
    updateProductPrices();
});

// Function to load featured products
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    // Clear existing content to prevent duplication
    featuredContainer.innerHTML = '';

    // Sample product data - in a real implementation, this would come from an API or external files
    const featuredProducts = [
        {
            id: 1,
            title: "Medieval Armor Set",
            priceUSD: 4.99,
            image: "images/products/model1.jpg",
            category: "models",
            link: "products/model1.html"
        },
        {
            id: 2,
            title: "Sky Island Survival",
            priceUSD: 6.99,
            image: "images/products/map1.jpg",
            category: "maps",
            link: "products/map1.html"
        },
        {
            id: 3,
            title: "Advanced Crafting",
            priceUSD: 3.99,
            image: "images/products/datapack1.jpg",
            category: "datapacks",
            link: "products/datapack1.html"
        },
        {
            id: 4,
            title: "Luminous Shaders",
            priceUSD: 5.99,
            image: "images/products/resourcepack1.jpg",
            category: "resources",
            link: "products/resourcepack1.html"
        }
    ];

    // Generate product cards
    featuredProducts.forEach(product => {
        const convertedPrice = convertPrice(product.priceUSD, userCurrency);
        const formattedPrice = formatPrice(convertedPrice, userCurrency);

        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">${formattedPrice}</p>
                <div class="product-buttons">
                    <a href="${product.link}" class="btn btn-secondary">Details</a>
                    <a href="https://gumroad.com/craftlab/demo" class="btn btn-primary">Buy Now</a>
                </div>
            </div>
        `;

        featuredContainer.appendChild(productCard);
    });
}

function sendMail() {
    let parms = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        subject : document.getElementById("subject").value,
        message : document.getElementById("message").value
    };

    // 1. Mail do Ciebie
    emailjs.send("service_f8igwie", "template_vcoxspa", parms);

    // 2. Autoreply do użytkownika
    emailjs.send("service_f8igwie", "template_wevr398", parms) .then(alert("Email sent successfully!"));
}
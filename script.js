// Hero Image Hover Effect
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            heroImage.style.transform = 'scale(1.05)';
        });
        
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'scale(1)';
        });
    }
});

// Smooth scroll for explore button
document.addEventListener('DOMContentLoaded', () => {
    const exploreBtn = document.querySelector('.explore-btn');
    const productsSection = document.querySelector('.products-section');
    
    if (exploreBtn && productsSection) {
        exploreBtn.addEventListener('click', () => {
            productsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Subtle parallax effect for hero image
document.addEventListener('DOMContentLoaded', () => {
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            heroImage.style.transform = `translateY(${parallax}px)`;
        });
    }
});

// Quick View Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('Quick View script loaded');
    
    // Check if buttons exist
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    console.log('Found quick view buttons:', quickViewBtns.length);
    
    // Create modal HTML
    const modalHTML = `
        <div id="quickViewModal" class="quick-view-modal">
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-body">
                    <div class="modal-image">
                        <img id="modalProductImage" src="" alt="">
                    </div>
                    <div class="modal-details">
                        <h2 id="modalProductName"></h2>
                        <p id="modalProductCategory" class="modal-category"></p>
                        <div class="modal-description">
                            <p>Discover the elegance and sophistication of this exquisite piece. Crafted with attention to detail and premium materials, this item embodies the luxury and style that Frenchkiss Boutique is known for.</p>
                        </div>
                        <div class="modal-actions">
                            <button class="add-to-cart-btn">Add to Cart</button>
                            <button class="add-to-wishlist-btn">
                                <i class="far fa-heart"></i> Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Function to show modal
    function showModal(productImage, productName, productCategory) {
        console.log('Showing modal for:', productName);
        document.getElementById('modalProductImage').src = productImage;
        document.getElementById('modalProductImage').alt = productName;
        document.getElementById('modalProductName').textContent = productName;
        document.getElementById('modalProductCategory').textContent = productCategory;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Add event listeners to quick view buttons using event delegation
    document.addEventListener('click', (e) => {
        // Check if the clicked element is a quick view button
        if (e.target.classList.contains('quick-view-btn')) {
            console.log('Quick view button clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = e.target.closest('.product-card, .bridal-card, .new-card');
            if (productCard) {
                const productImage = productCard.querySelector('img');
                const productName = productCard.querySelector('h3').textContent;
                const productCategory = productCard.querySelector('.product-category, .bridal-category, .new-category').textContent;
                
                console.log('Product details:', { productName, productCategory, imageSrc: productImage.src });
                showModal(productImage.src, productName, productCategory);
            }
        }
    });
    
    // Also add mouse event listeners to ensure buttons are clickable when visible
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('quick-view-btn')) {
            e.target.style.pointerEvents = 'auto';
        }
    });
    
    // Close modal functionality
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});

// Newsletter Popup Functionality
document.addEventListener('DOMContentLoaded', () => {
    console.log('Newsletter popup script loaded');
    const newsletterModal = document.getElementById('newsletterModal');
    const newsletterClose = document.querySelector('.newsletter-close');
    const newsletterOverlay = document.querySelector('.newsletter-modal .modal-overlay');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    console.log('Newsletter modal element:', newsletterModal);
    console.log('Newsletter subscribed status:', localStorage.getItem('newsletterSubscribed'));
    
    // Show newsletter popup after 2 seconds (reduced for testing)
    setTimeout(() => {
        console.log('Timeout triggered, checking subscription status');
        // Check if user has already subscribed (localStorage)
        if (!localStorage.getItem('newsletterSubscribed')) {
            console.log('Showing newsletter popup');
            newsletterModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        } else {
            console.log('User already subscribed, not showing popup');
        }
    }, 2000);
    
    // Close newsletter modal
    function closeNewsletterModal() {
        newsletterModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    newsletterClose.addEventListener('click', closeNewsletterModal);
    newsletterOverlay.addEventListener('click', closeNewsletterModal);
    
    // Close newsletter modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && newsletterModal.classList.contains('show')) {
            closeNewsletterModal();
        }
    });
    
    // Handle newsletter form submission
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            // Show cute success message
            const successMessage = document.createElement('div');
            successMessage.className = 'newsletter-success';
            successMessage.innerHTML = `
                <div class="success-content">
                    <i class="fas fa-heart"></i>
                    <h3>Welcome to the Frenchkiss Family!</h3>
                    <p>You're now part of our exclusive VIP circle. Get ready for amazing surprises! ✨</p>
                </div>
            `;
            
            // Replace the form with success message
            newsletterForm.parentNode.replaceChild(successMessage, newsletterForm);
            
            // Mark as subscribed to prevent showing popup again
            localStorage.setItem('newsletterSubscribed', 'true');
            
            // Close the modal after 3 seconds
            setTimeout(() => {
                closeNewsletterModal();
            }, 3000);
        }
    });
    
    // Test function to show popup immediately (for testing)
    window.showNewsletterPopup = function() {
        console.log('Manually showing newsletter popup');
        newsletterModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };
    
    // Test function to clear subscription status (for testing)
    window.clearNewsletterStatus = function() {
        localStorage.removeItem('newsletterSubscribed');
        console.log('Newsletter subscription status cleared');
    };
});

// Wishlist Functionality
document.addEventListener('DOMContentLoaded', () => {
    const wishlistModal = document.getElementById('wishlistModal');
    const wishlistClose = document.querySelector('.wishlist-close');
    const wishlistOverlay = document.querySelector('.wishlist-modal .modal-overlay');
    const wishlistItems = document.getElementById('wishlistItems');
    const continueShoppingBtn = document.querySelector('.continue-shopping-btn');
    
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Initialize wishlist
    function initWishlist() {
        updateWishlistDisplay();
        updateWishlistButtons();
    }
    
    // Update wishlist display
    function updateWishlistDisplay() {
        if (wishlist.length === 0) {
            wishlistItems.innerHTML = `
                <div class="empty-wishlist">
                    <i class="far fa-heart"></i>
                    <h3>Your wishlist is empty</h3>
                    <p>Start adding items you love to your wishlist</p>
                </div>
            `;
        } else {
            wishlistItems.innerHTML = wishlist.map((item, index) => `
                <div class="wishlist-item">
                    <div class="wishlist-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="wishlist-item-details">
                        <h4>${item.name}</h4>
                        <p>${item.category}</p>
                    </div>
                    <div class="wishlist-item-actions">
                        <button class="wishlist-quick-view-btn" onclick="showQuickView('${item.image}', '${item.name}', '${item.category}')">
                            Quick View
                        </button>
                        <button class="wishlist-remove-btn" onclick="removeFromWishlist(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Update wishlist buttons on product cards
    function updateWishlistButtons() {
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            const productCard = btn.closest('.product-card, .bridal-card');
            const productName = productCard.querySelector('h3').textContent;
            const isInWishlist = wishlist.some(item => item.name === productName);
            
            if (isInWishlist) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="far fa-heart"></i>';
            }
        });
    }
    
    // Add to wishlist
    function addToWishlist(productImage, productName, productCategory) {
        const existingItem = wishlist.find(item => item.name === productName);
        
        if (!existingItem) {
            wishlist.push({
                image: productImage,
                name: productName,
                category: productCategory
            });
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistDisplay();
            updateWishlistButtons();
            
            // Show success message
            showNotification('Added to wishlist!', 'success');
        } else {
            showNotification('Already in wishlist!', 'info');
        }
    }
    
    // Remove from wishlist
    function removeFromWishlist(index) {
        wishlist.splice(index, 1);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistDisplay();
        updateWishlistButtons();
        showNotification('Removed from wishlist', 'info');
    }
    
    // Show wishlist modal
    function showWishlistModal() {
        wishlistModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        updateWishlistDisplay();
    }
    
    // Close wishlist modal
    function closeWishlistModal() {
        wishlistModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'info' ? '#2196F3' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Event listeners
    wishlistClose.addEventListener('click', closeWishlistModal);
    wishlistOverlay.addEventListener('click', closeWishlistModal);
    continueShoppingBtn.addEventListener('click', closeWishlistModal);
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && wishlistModal.classList.contains('show')) {
            closeWishlistModal();
        }
    });
    
    // Wishlist button clicks
    document.addEventListener('click', (e) => {
        if (e.target.closest('.wishlist-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = e.target.closest('.product-card, .bridal-card, .new-card');
            const productImage = productCard.querySelector('img').src;
            const productName = productCard.querySelector('h3').textContent;
            const productCategory = productCard.querySelector('.product-category, .bridal-category, .new-category').textContent;
            
            const isInWishlist = wishlist.some(item => item.name === productName);
            
            if (isInWishlist) {
                const index = wishlist.findIndex(item => item.name === productName);
                removeFromWishlist(index);
            } else {
                addToWishlist(productImage, productName, productCategory);
            }
        }
    });
    
    // Cart icon click to show wishlist
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            showWishlistModal();
        });
    }
    
    // Global functions
    window.showWishlistModal = showWishlistModal;
    window.removeFromWishlist = removeFromWishlist;
    window.showQuickView = function(image, name, category) {
        closeWishlistModal();
        // Trigger quick view modal
        const quickViewModal = document.getElementById('quickViewModal');
        if (quickViewModal) {
            document.getElementById('modalProductImage').src = image;
            document.getElementById('modalProductImage').alt = name;
            document.getElementById('modalProductName').textContent = name;
            document.getElementById('modalProductCategory').textContent = category;
            quickViewModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Initialize wishlist
    initWishlist();
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Carousel Functionality
class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.items = container.querySelectorAll('.carousel-item');
        this.prevBtn = container.querySelector('.carousel-btn.prev');
        this.nextBtn = container.querySelector('.carousel-btn.next');
        this.currentIndex = 0;
        this.itemWidth = 280; // Width of each carousel item
        this.visibleItems = Math.floor(container.offsetWidth / this.itemWidth);
        
        this.init();
    }
    
    init() {
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.prev());
            this.nextBtn.addEventListener('click', () => this.next());
        }
        
        // Auto-play carousel
        this.autoPlay = setInterval(() => this.next(), 5000);
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => clearInterval(this.autoPlay));
        this.container.addEventListener('mouseleave', () => {
            this.autoPlay = setInterval(() => this.next(), 5000);
        });
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % (this.items.length - this.visibleItems + 1);
        this.updatePosition();
    }
    
    prev() {
        this.currentIndex = this.currentIndex === 0 ? this.items.length - this.visibleItems : this.currentIndex - 1;
        this.updatePosition();
    }
    
    updatePosition() {
        const translateX = -this.currentIndex * (this.itemWidth + 32); // 32px gap
        this.track.style.transform = `translateX(${translateX}px)`;
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.new-arrivals-carousel');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
});

// Product Image Gallery
class ProductGallery {
    constructor() {
        this.mainImage = document.getElementById('mainImage');
        this.thumbnails = document.querySelectorAll('.thumbnail');
        this.init();
    }
    
    init() {
        this.thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                this.updateMainImage(thumbnail.src);
                this.updateActiveThumbnail(thumbnail);
            });
        });
    }
    
    updateMainImage(src) {
        if (this.mainImage) {
            this.mainImage.src = src;
        }
    }
    
    updateActiveThumbnail(activeThumbnail) {
        this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
        activeThumbnail.classList.add('active');
    }
}

// Initialize product gallery
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('mainImage')) {
        new ProductGallery();
    }
});

// Color Swatch Selection
document.addEventListener('DOMContentLoaded', () => {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
        });
    });
});

// Cart Functionality
class ShoppingCart {
    constructor() {
        this.cart = [];
        this.cartCount = document.querySelector('.cart-count');
        this.init();
    }
    
    init() {
        this.updateCartDisplay();
        
        // Add event listeners to all "Add to Cart" buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-btn') || 
                e.target.closest('.add-to-cart-btn')) {
                e.preventDefault();
                this.addToCart(e.target);
            }
        });
    }
    
    addToCart(button) {
        const productName = this.getProductName(button);
        const productColor = this.getSelectedColor();
        const productSize = this.getSelectedSize();
        
        const item = {
            id: Date.now(),
            name: productName,
            color: productColor,
            size: productSize,
            quantity: 1
        };
        
        this.cart.push(item);
        this.updateCartDisplay();
        this.showAddToCartMessage(productName);
    }
    
    getProductName(button) {
        // Try to find product name from various contexts
        const productTitle = document.querySelector('h1');
        if (productTitle) return productTitle.textContent;
        
        const itemInfo = button.closest('.carousel-item, .suggestion-item, .related-item');
        if (itemInfo) {
            const nameElement = itemInfo.querySelector('h4');
            if (nameElement) return nameElement.textContent;
        }
        
        return 'Product';
    }
    
    getSelectedColor() {
        const activeColor = document.querySelector('.color-swatch.active');
        return activeColor ? activeColor.dataset.color : 'Default';
    }
    
    getSelectedSize() {
        const sizeSelect = document.getElementById('sizeSelect');
        return sizeSelect ? sizeSelect.value || 'One Size' : 'One Size';
    }
    
    updateCartDisplay() {
        if (this.cartCount) {
            this.cartCount.textContent = this.cart.length;
        }
    }
    
    showAddToCartMessage(productName) {
        // Create a temporary notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${productName} added to cart!</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-rose);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize shopping cart
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
});

// Wishlist Functionality
document.addEventListener('DOMContentLoaded', () => {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const icon = button.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                button.style.color = '#e74c3c';
                this.showWishlistMessage('Added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                button.style.color = '';
                this.showWishlistMessage('Removed from wishlist!');
            }
        });
    });
});

// Wishlist notification
function showWishlistMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-heart"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Newsletter Form
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                showNewsletterMessage('Thank you for subscribing!');
                newsletterForm.reset();
            }
        });
    }
});

// Newsletter notification
function showNewsletterMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'newsletter-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-envelope"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-rose);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Image Zoom Functionality
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('mainImage');
    const zoomOverlay = document.querySelector('.zoom-overlay');
    
    if (mainImage && zoomOverlay) {
        zoomOverlay.addEventListener('click', () => {
            openImageZoom(mainImage.src);
        });
    }
});

function openImageZoom(imageSrc) {
    const zoomModal = document.createElement('div');
    zoomModal.className = 'image-zoom-modal';
    zoomModal.innerHTML = `
        <div class="zoom-content">
            <span class="zoom-close">&times;</span>
            <img src="${imageSrc}" alt="Zoomed Image">
        </div>
    `;
    
    zoomModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const zoomContent = zoomModal.querySelector('.zoom-content');
    zoomContent.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
    `;
    
    const zoomImage = zoomModal.querySelector('img');
    zoomImage.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
    `;
    
    const closeBtn = zoomModal.querySelector('.zoom-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10001;
    `;
    
    document.body.appendChild(zoomModal);
    
    setTimeout(() => {
        zoomModal.style.opacity = '1';
    }, 100);
    
    closeBtn.addEventListener('click', () => {
        zoomModal.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(zoomModal);
        }, 300);
    });
    
    zoomModal.addEventListener('click', (e) => {
        if (e.target === zoomModal) {
            zoomModal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(zoomModal);
            }, 300);
        }
    });
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Add CSS for mobile menu
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: white;
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0,0,0,0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`;
document.head.appendChild(style);

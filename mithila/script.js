// 1. Initialize Icons
lucide.createIcons();

// 2. Set Current Year
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// 3. Navbar Logic
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelectorAll('.nav-link');
const logoText = document.querySelector('.nav-text');
const logoIcon = document.querySelector('.nav-icon');

// Scroll Effect
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            // Scrolled State
            navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-md', 'py-3');
            navbar.classList.remove('bg-transparent', 'py-5', 'text-white');
            navbar.classList.add('text-gray-800');

            if (logoText) {
                logoText.classList.remove('text-white');
                logoText.classList.add('text-rose-950');
            }
            if (logoIcon) {
                logoIcon.classList.remove('border-amber-500');
                logoIcon.classList.add('border-rose-900');
            }
            if (menuIcon) {
                menuIcon.classList.remove('text-white');
                menuIcon.classList.add('text-gray-800');
            }

            navLinks.forEach(link => {
                link.classList.remove('text-gray-200');
                link.classList.add('text-gray-800');
            });
        } else {
            // Top State
            navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-md', 'py-3', 'text-gray-800');
            navbar.classList.add('bg-transparent', 'py-5', 'text-white');

            if (logoText) {
                logoText.classList.add('text-white');
                logoText.classList.remove('text-rose-950');
            }
            if (logoIcon) {
                logoIcon.classList.add('border-amber-500');
                logoIcon.classList.remove('border-rose-900');
            }
            if (menuIcon) {
                menuIcon.classList.add('text-white');
                menuIcon.classList.remove('text-gray-800');
            }

            navLinks.forEach(link => {
                link.classList.add('text-gray-200');
                link.classList.remove('text-gray-800');
            });
        }
    });
}

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });
}

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        menuIcon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    });
});

// ==========================================
// 4. UNIFIED FILTER & LOAD MORE LOGIC (FIXED)
// ==========================================

// Variables
let visibleCount = 6;
let currentFilter = 'All';
const itemsPerLoad = 6;

const filterBtns = document.querySelectorAll('.filter-btn');
const products = document.querySelectorAll('.product-item');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadMoreContainer = document.getElementById('load-more-container');
const visibleCountSpan = document.getElementById('visible-count');
const totalCountSpan = document.getElementById('total-count');

// Main function to update UI based on Filter + Pagination
function updateProductVisibility() {
    let activeProductsCount = 0;
    let currentlyVisibleCount = 0;

    products.forEach(product => {
        const category = product.getAttribute('data-category');

        // 1. Check if product matches current filter
        const matchesFilter = (currentFilter === 'All' || category === currentFilter);

        if (matchesFilter) {
            product.classList.remove('category-hidden'); // Show mostly

            // 2. Check if product is within the visible limit
            if (activeProductsCount < visibleCount) {
                product.classList.remove('load-more-hidden', 'hidden');
                product.classList.add('visible');
                currentlyVisibleCount++;
            } else {
                product.classList.add('load-more-hidden', 'hidden');
                product.classList.remove('visible');
            }
            activeProductsCount++;
        } else {
            // Hidden by category
            product.classList.add('category-hidden', 'hidden');
            product.classList.remove('visible');
        }
    });

    // 3. Update Counters
    if (totalCountSpan) totalCountSpan.textContent = activeProductsCount;
    if (visibleCountSpan) visibleCountSpan.textContent = currentlyVisibleCount;

    // 4. Hide/Show Load More Button
    if (visibleCount >= activeProductsCount) {
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    } else {
        if (loadMoreContainer) loadMoreContainer.style.display = 'block';
    }
}

// Initialize on Load
updateProductVisibility();

// Event Listener: Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update Button Styles
        filterBtns.forEach(b => {
            b.classList.remove('bg-rose-950', 'text-white', 'shadow-lg');
            b.classList.add('bg-stone-100', 'text-gray-600');
        });
        btn.classList.remove('bg-stone-100', 'text-gray-600');
        btn.classList.add('bg-rose-950', 'text-white', 'shadow-lg');

        // Update Logic
        currentFilter = btn.getAttribute('data-filter');
        visibleCount = 6; // Reset count when filter changes
        updateProductVisibility();
    });
});

// Event Listener: Load More
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        visibleCount += itemsPerLoad;
        updateProductVisibility();
    });
}

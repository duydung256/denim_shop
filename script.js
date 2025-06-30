 
        document.addEventListener('DOMContentLoaded', function () {
            const accordionHeaders = document.querySelectorAll('.accordion-header');
            const cartIcon = document.getElementById('cartIcon');
            const cartDropdown = document.getElementById('cartDropdown');
            const cartEmpty = document.getElementById('cartEmpty');
            const cartContent = document.getElementById('cartContent');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const cartCount = document.getElementById('cartCount');
            let isCartOpen = false;
            let cart = [];
            function showToast(message) {
                const existingToast = document.querySelector('.toast-notification');
                if (existingToast) {
                    existingToast.remove();
                }
                const toast = document.createElement('div');
                toast.className = 'toast-notification';
                toast.innerHTML = `
<i class="ri-checkbox-circle-line"></i>
<span>${message}</span>
`;
                document.body.appendChild(toast);
                setTimeout(() => {
                    toast.classList.add('show');
                }, 100);
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        toast.remove();
                    }, 300);
                }, 3000);
            }
            function addToCart(button) {
                const productCard = button.closest('.bg-white');
                const productName = productCard.querySelector('h3').textContent;
                const productPrice = parseFloat(productCard.querySelector('.text-xl').textContent.replace('$', ''));
                const productImage = productCard.querySelector('img').src;
                const existingItem = cart.find(item => item.name === productName);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: Date.now(),
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    });
                }
                updateCart();
                showToast('Item added to your bag');
            }
            document.querySelectorAll('[class*="Add To Bag"]').forEach(button => {
                button.addEventListener('click', function () {
                    addToCart(this);
                });
            });
            function updateCart() {
                const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
                if (cart.length === 0) {
                    cartEmpty.classList.remove('hidden');
                    cartContent.classList.add('hidden');
                    cartCount.classList.add('hidden');
                } else {
                    cartEmpty.classList.add('hidden');
                    cartContent.classList.remove('hidden');
                    cartCount.classList.remove('hidden');
                    cartCount.textContent = totalQuantity;
                    cartItems.innerHTML = cart.map(item => `
<div class="p-4 border-b border-gray-100 flex gap-4">
<img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded">
<div class="flex-1">
<h4 class="font-medium text-sm mb-1">${item.name}</h4>
<p class="text-gray-600 text-sm mb-2">$${item.price.toFixed(2)}</p>
<div class="flex items-center gap-2">
<button class="w-6 h-6 flex items-center justify-center border border-gray-200 rounded" onclick="updateQuantity(${item.id}, -1)">-</button>
<span class="text-sm">${item.quantity}</span>
<button class="w-6 h-6 flex items-center justify-center border border-gray-200 rounded" onclick="updateQuantity(${item.id}, 1)">+</button>
</div>
</div>
<button class="text-gray-400 hover:text-gray-600" onclick="removeItem(${item.id})">
<i class="ri-close-line"></i>
</button>
</div>
`).join('');
                    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    cartTotal.textContent = `$${total.toFixed(2)}`;
                }
            }
            cartIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                isCartOpen = !isCartOpen;
                if (isCartOpen) {
                    cartDropdown.classList.remove('hidden');
                } else {
                    cartDropdown.classList.add('hidden');
                }
            });
            document.addEventListener('click', (e) => {
                if (!cartIcon.contains(e.target) && isCartOpen) {
                    cartDropdown.classList.add('hidden');
                    isCartOpen = false;
                }
            });
            window.updateQuantity = (id, change) => {
                const item = cart.find(item => item.id === id);
                if (item) {
                    item.quantity = Math.max(1, item.quantity + change);
                    updateCart();
                }
            };
            window.removeItem = (id) => {
                cart = cart.filter(item => item.id !== id);
                updateCart();
            };
            updateCart();
            accordionHeaders.forEach(header => {
                header.addEventListener('click', function () {
                    const content = this.nextElementSibling;
                    const icon = this.querySelector('.accordion-icon');
                    content.classList.toggle('active');
                    if (content.classList.contains('active')) {
                        icon.classList.remove('ri-arrow-down-s-line');
                        icon.classList.add('ri-arrow-up-s-line');
                    } else {
                        icon.classList.remove('ri-arrow-up-s-line');
                        icon.classList.add('ri-arrow-down-s-line');
                    }
                });
            });
        });
            document.addEventListener('DOMContentLoaded', function () {
            const scrollContainer = document.getElementById('scrollContainer');
            const scrollIndicator = document.getElementById('scrollIndicator');
            function updateScrollIndicator() {
                const totalScrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                const scrollPercentage = (scrollContainer.scrollLeft / totalScrollWidth) * 100;
                const maxScroll = 100 - ((scrollContainer.clientWidth / scrollContainer.scrollWidth) * 100);
                const indicatorWidth = (scrollContainer.clientWidth / scrollContainer.scrollWidth) * 100;
                scrollIndicator.style.width = `${indicatorWidth}%`;
                scrollIndicator.style.left = `${Math.min(scrollPercentage, maxScroll)}%`;
            }
            scrollContainer.addEventListener('scroll', updateScrollIndicator);
            updateScrollIndicator();
        });
        document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
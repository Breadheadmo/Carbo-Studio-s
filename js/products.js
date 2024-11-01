const API_URL = 'http://localhost:3333/api';

async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`, {
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayProducts(products) {
    const productContainer = document.querySelector('.isotope-grid');
    if (!productContainer) return;

    productContainer.innerHTML = products.map(product => `
        <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.category.toLowerCase()}">
            <div class="block2">
                <div class="block2-pic hov-img0">
                    <img src="${product.image}" alt="${product.name}">
                    <a href="#" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                       data-id="${product.id}"
                       data-sku="${product.sku}"
                       data-stock="${product.stock}"
                       data-description="${product.description}">
                        Quick View
                    </a>
                </div>

                <div class="block2-txt flex-w flex-t p-t-14">
                    <div class="block2-txt-child1 flex-col-l">
                        <a href="product-detail.html?id=${product.id}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                            ${product.name}
                        </a>
                        <span class="stext-105 cl3">
                            $${product.price}
                        </span>
                        <span class="stext-105 cl3">
                            SKU: ${product.sku}
                        </span>
                        <span class="stext-105 cl3">
                            Stock: ${product.stock}
                        </span>
                    </div>

                    <div class="block2-txt-child2 flex-r p-t-3">
                        <a href="#" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2">
                            <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                            <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Update quick view modal when clicked
    const quickViewButtons = document.querySelectorAll('.js-show-modal1');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const product = {
                id: this.dataset.id,
                name: this.closest('.block2').querySelector('.js-name-b2').textContent.trim(),
                sku: this.dataset.sku,
                price: this.closest('.block2').querySelector('.cl3').textContent.trim().substring(1),
                stock: this.dataset.stock,
                description: this.dataset.description,
                image: this.closest('.block2-pic').querySelector('img').src
            };
            updateQuickViewModal(product);
        });
    });
}

function updateQuickViewModal(product) {
    const modal = document.querySelector('.js-modal1');
    if (!modal) return;

    modal.querySelector('.js-modal1-product-image').src = product.image;
    modal.querySelector('.js-modal1-product-name').textContent = product.name;
    modal.querySelector('.js-modal1-product-price').textContent = `$${product.price}`;
    modal.querySelector('.js-modal1-product-description').textContent = product.description;
    modal.querySelector('.js-modal1-product-sku').textContent = `SKU: ${product.sku}`;
    modal.querySelector('.js-modal1-product-stock').textContent = `Stock: ${product.stock}`;
}

document.addEventListener('DOMContentLoaded', fetchProducts);

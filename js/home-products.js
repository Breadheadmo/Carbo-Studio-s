document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'http://localhost:3333/api/products';
    const productGrid = document.getElementById('product-grid');

    async function fetchProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error fetching products');
            const products = await response.json();
            renderProducts(products);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function renderProducts(products) {
        // Only show first 8 products on home page
        const featuredProducts = products.slice(0, 8);
        
        productGrid.innerHTML = '';
        featuredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = `col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item ${product.category}`;
            productElement.innerHTML = `
                <div class="block2">
                    <div class="block2-pic hov-img0">
                        <img src="${product.image_url || 'https://via.placeholder.com/300'}" alt="${product.name}">
                        <a href="product-detail.html?id=${product.id}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04">
                            Quick View
                        </a>
                    </div>
                    <div class="block2-txt flex-w flex-t p-t-14">
                        <div class="block2-txt-child1 flex-col-l">
                            <a href="product-detail.html?id=${product.id}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                ${product.name}
                            </a>
                            <span class="stext-105 cl3">$${product.price}</span>
                        </div>
                    </div>
                </div>
            `;
            productGrid.appendChild(productElement);
        });
    }

    // Initial load of products
    fetchProducts();
});

document.addEventListener('DOMContentLoaded', function() {
    const addProductBtn = document.getElementById('add-product-btn');
    const importProductsBtn = document.getElementById('import-products-btn');
    const exportProductsBtn = document.getElementById('export-products-btn');
    const productModal = document.getElementById('product-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const productForm = document.getElementById('product-form');
    const productsList = document.getElementById('products-list');
    const modalTitle = document.getElementById('modal-title');

    let products = [];

    // Open modal when Add New Product button is clicked
    addProductBtn.onclick = function() {
        modalTitle.textContent = 'Add New Product';
        productForm.reset();
        productModal.style.display = 'block';
    }

    // Close modal when X is clicked
    closeModal.onclick = function() {
        productModal.style.display = 'none';
    }

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == productModal) {
            productModal.style.display = 'none';
        }
    }

    // Handle form submission
    productForm.onsubmit = function(e) {
        e.preventDefault();
        const productId = document.getElementById('product-id').value;
        const productName = document.getElementById('product-name').value;
        const productSKU = document.getElementById('product-sku').value;
        const productPrice = document.getElementById('product-price').value;
        const productCategory = document.getElementById('product-category').value;
        const productStock = document.getElementById('product-stock').value;
        const productImage = document.getElementById('product-image').files[0];
        const productDescription = document.getElementById('product-description').value;

        if (productId) {
            // Update existing product
            updateProduct(productId, productName, productSKU, productPrice, productCategory, productStock, productImage, productDescription);
        } else {
            // Add new product
            addProduct(productName, productSKU, productPrice, productCategory, productStock, productImage, productDescription);
        }

        productModal.style.display = 'none';
        renderProducts();
    }

    function addProduct(name, sku, price, category, stock, image, description) {
        const newProduct = {
            id: Date.now(),
            name,
            sku,
            price,
            category,
            stock,
            image: image ? URL.createObjectURL(image) : 'placeholder-image-url.jpg',
            description
        };
        products.push(newProduct);
    }

    function updateProduct(id, name, sku, price, category, stock, image, description) {
        const index = products.findIndex(p => p.id == id);
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                sku,
                price,
                category,
                stock,
                image: image ? URL.createObjectURL(image) : products[index].image,
                description
            };
        }
    }

    function deleteProduct(id) {
        products = products.filter(p => p.id != id);
        renderProducts();
    }

    function renderProducts() {
        productsList.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
                <td>${product.name}</td>
                <td>${product.sku}</td>
                <td>$${product.price}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${product.id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${product.id}">Delete</button>
                </td>
            `;
            productsList.appendChild(row);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.onclick = function() {
                const productId = this.getAttribute('data-id');
                editProduct(productId);
            }
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.onclick = function() {
                const productId = this.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this product?')) {
                    deleteProduct(productId);
                }
            }
        });
    }

    function editProduct(id) {
        const product = products.find(p => p.id == id);
        if (product) {
            modalTitle.textContent = 'Edit Product';
            document.getElementById('product-id').value = product.id;
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-sku').value = product.sku;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-stock').value = product.stock;
            document.getElementById('product-description').value = product.description;
            productModal.style.display = 'block';
        }
    }

    // Import Products (placeholder function)
    importProductsBtn.onclick = function() {
        alert('Import functionality to be implemented');
    }

    // Export Products (placeholder function)
    exportProductsBtn.onclick = function() {
        alert('Export functionality to be implemented');
    }

    // Initial render
    renderProducts();
});

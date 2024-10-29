document.addEventListener('DOMContentLoaded', function() {
    const addProductBtn = document.getElementById('add-product-btn');
    const importProductsBtn = document.getElementById('import-products-btn');
    const exportProductsBtn = document.getElementById('export-products-btn');
    const productModal = document.getElementById('product-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const productForm = document.getElementById('product-form');
    const productsList = document.getElementById('products-list');
    const modalTitle = document.getElementById('modal-title');
    const API_URL = 'http://localhost:3333/api/products'; // base URL for products API

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
    productForm.onsubmit = async function(e) {
        e.preventDefault();
        const productId = document.getElementById('product-id').value;
        const productData = {
            name: document.getElementById('product-name').value.trim(),
            sku: document.getElementById('product-sku').value.trim(),
            price: parseFloat(document.getElementById('product-price').value),
            category: document.getElementById('product-category').value.trim(),
            stock: parseInt(document.getElementById('product-stock').value),
            description: document.getElementById('product-description').value.trim(),
            image_url: document.getElementById('product-image').value.trim() || null
        };

        if (productId) {
            await updateProduct(productId, productData);
        } else {
            await addProduct(productData);
        }

        productModal.style.display = 'none';
        fetchProducts();
    }

    async function addProduct(data) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error adding product');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message); // Show error message to user
            throw error;
        }
    }

    async function updateProduct(id, data) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error updating product');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            alert(error.message); // Show error message to user
            throw error;
        }
    }

    async function deleteProduct(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error deleting product');
            fetchProducts();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function fetchProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error fetching products');
            products = await response.json();
            renderProducts();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function renderProducts() {
        productsList.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${product.image_url || 'https://via.placeholder.com/50'}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/50'"></td>
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
            document.getElementById('product-image').value = product.image_url || '';
            productModal.style.display = 'block';
        }
    }

    importProductsBtn.onclick = function() {
        alert('Import functionality to be implemented');
    }

    exportProductsBtn.onclick = function() {
        alert('Export functionality to be implemented');
    }

    fetchProducts();
});

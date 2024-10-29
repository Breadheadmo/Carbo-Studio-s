document.addEventListener('DOMContentLoaded', function() {
    const addToBagButton = document.querySelector('.add-to-bag');
    const wishlistButton = document.querySelector('.wishlist');
    const sizeSelect = document.getElementById('size-select');

    addToBagButton.addEventListener('click', function() {
        const selectedSize = sizeSelect.value;
        if (selectedSize) {
            alert(`Added size ${selectedSize} to bag!`);
        } else {
            alert('Please select a size first.');
        }
    });

    wishlistButton.addEventListener('click', function() {
        alert('Added to wishlist!');
    });

    // Add horizontal scrolling for product lists
    const productLists = document.querySelectorAll('.product-list');
    productLists.forEach(list => {
        let isDown = false;
        let startX;
        let scrollLeft;

        list.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - list.offsetLeft;
            scrollLeft = list.scrollLeft;
        });

        list.addEventListener('mouseleave', () => {
            isDown = false;
        });

        list.addEventListener('mouseup', () => {
            isDown = false;
        });

        list.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - list.offsetLeft;
            const walk = (x - startX) * 2;
            list.scrollLeft = scrollLeft - walk;
        });
    });

    // Add wishlist functionality
    const wishlistIcons = document.querySelectorAll('.wishlist-icon');
    wishlistIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.textContent = this.textContent === '❤️' ? '🖤' : '❤️';
        });
    });
});

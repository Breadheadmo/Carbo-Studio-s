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
});

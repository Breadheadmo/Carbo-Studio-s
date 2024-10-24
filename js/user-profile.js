document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('profile-form');
    const deleteButton = document.getElementById('delete-account');
    const profilePictureInput = document.getElementById('profile-picture');
    const profilePicturePreview = document.getElementById('profile-picture-preview');

    // Load user data (replace with actual API call)
    function loadUserData() {
        // Simulated user data
        const userData = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            bio: 'Web developer and designer',
            birthdate: '1990-01-01',
            location: 'New York, USA'
        };

        // Populate form fields
        for (const [key, value] of Object.entries(userData)) {
            const field = document.getElementById(key);
            if (field) {
                field.value = value;
            }
        }
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Simulated API call to update user data
        console.log('Updating user profile:', Object.fromEntries(formData));
        alert('Profile updated successfully!');
    });

    // Handle account deletion
    deleteButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Simulated API call to delete account
            console.log('Deleting user account');
            alert('Account deleted successfully!');
        }
    });

    // Handle profile picture preview
    profilePictureInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePicturePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Load initial user data
    loadUserData();
});

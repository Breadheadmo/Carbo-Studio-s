const API_URL = 'http://localhost:3333/api';

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');

    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const formData = {
                email: document.getElementById('email').value,
                password: password,
                fullName: document.getElementById('fullName').value
            };

            try {
                const response = await fetch(`${API_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                let errorData;
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else {
                    errorData = { message: 'Server error occurred' };
                }

                if (!response.ok) {
                    throw new Error(errorData.message || 'Registration failed');
                }

                // Store the token in localStorage
                localStorage.setItem('authToken', errorData.token);
                
                // Redirect to home page
                window.location.href = 'index.html';
                
            } catch (error) {
                console.error('Error:', error);
                alert(error.message);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            };

            try {
                const response = await fetch(`${API_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                let errorData;
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    errorData = await response.json();
                } else {
                    errorData = { message: 'Server error occurred' };
                }

                if (!response.ok) {
                    throw new Error(errorData.message || 'Login failed');
                }

                // Store the token in localStorage
                localStorage.setItem('authToken', errorData.token);
                
                // Redirect to home page
                window.location.href = 'index.html';
                
            } catch (error) {
                console.error('Error:', error);
                alert(error.message);
            }
        });
    }
});

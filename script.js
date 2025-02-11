const passwordInput = document.querySelector('.password-input');
const copyBtn = document.querySelector('.copy-btn');
const slider = document.querySelector('.slider');
const lengthDisplay = document.querySelector('.length-display');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const clipboardAlert = document.querySelector('.clipboard-alert');
const optionsAlert = document.querySelector('.options-alert');

function generatePassword() {
    const length = parseInt(slider.value);
    const numbers = '0123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const punctuation = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (document.getElementById('numbers').checked) chars += numbers;
    if (document.getElementById('letters').checked) chars += lowercase;
    if (document.getElementById('mixed-case').checked) chars += uppercase;
    if (document.getElementById('punctuation').checked) chars += punctuation;

    if (!chars) {
        passwordInput.value = '';
        optionsAlert.style.display = 'block';
        setTimeout(() => {
            optionsAlert.style.display = 'none';
        }, 3000);
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    passwordInput.value = password;
}

slider.addEventListener('input', () => {
    lengthDisplay.textContent = slider.value;
    generatePassword();
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', generatePassword);
});

copyBtn.addEventListener('click', () => {
    if (passwordInput.value) {
        navigator.clipboard.writeText(passwordInput.value);
        clipboardAlert.style.display = 'block';
        setTimeout(() => {
            clipboardAlert.style.display = 'none';
        }, 3000);
    }
});

// Generate initial password
generatePassword();
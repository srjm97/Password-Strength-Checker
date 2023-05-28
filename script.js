function isPasswordStrong(password) {
  const lengthRegex = /.{12,}/;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const criteriaMessages = {
    length: 'At least 12 characters',
    uppercase: 'Uppercase letters',
    lowercase: 'Lowercase letters',
    digit: 'Numbers',
    specialChar: 'Special characters'
  };

  const lengthCheck = lengthRegex.test(password);
  const uppercaseCheck = uppercaseRegex.test(password);
  const lowercaseCheck = lowercaseRegex.test(password);
  const digitCheck = digitRegex.test(password);
  const specialCharCheck = specialCharRegex.test(password);

  let strength = 'weak';
  const criteriaList = document.getElementById('criteria-list');
  const strengthBar = document.getElementById('strength-bar');
  const strengthLabel = document.getElementById('strength-label');

  criteriaList.innerHTML = '';

  if (lengthCheck && uppercaseCheck && lowercaseCheck && digitCheck && specialCharCheck) {
    strength = 'strong';
  } else if (lengthCheck || uppercaseCheck || lowercaseCheck || digitCheck || specialCharCheck) {
    strength = 'moderate';
  }

  Object.keys(criteriaMessages).forEach((criteria) => {
    const criteriaItem = document.createElement('div');
    criteriaItem.textContent = criteriaMessages[criteria];
    criteriaItem.classList.add(password.match(eval(criteria + 'Regex')) ? 'pass' : 'fail');
    criteriaList.appendChild(criteriaItem);
  });

  const progressPercentage = Object.values({ lengthCheck, uppercaseCheck, lowercaseCheck, digitCheck, specialCharCheck }).filter(check => check).length * 20;
  strengthBar.style.width = progressPercentage + '%';
  strengthBar.classList.remove('weak', 'moderate', 'strong');
  strengthBar.classList.add(strength);

  strengthLabel.textContent = strength.toUpperCase();
  strengthLabel.classList.remove('weak', 'moderate', 'strong');
  strengthLabel.classList.add(strength);

  return strength;
}

function checkPassword(passwordInput) {
  const password = passwordInput.value;
  const errorMessage = document.getElementById('error-message');
  const strengthBar = document.getElementById('strength-bar');
  const strengthLabel = document.getElementById('strength-label');

  errorMessage.textContent = '';

  strengthBar.style.width = '0%';
  strengthBar.classList.remove('weak', 'moderate', 'strong');
  strengthLabel.textContent = '';

  if (password.length === 0) {
    return;
  }

  isPasswordStrong(password);
}

function togglePasswordVisibility() {
  const passwordInput = document.getElementById('password-input');
  const passwordToggle = document.getElementById('password-toggle');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    passwordToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
  } else {
    passwordInput.type = 'password';
    passwordToggle.innerHTML = '<i class="fas fa-eye"></i>';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const passwordInput = document.getElementById('password-input');
  passwordInput.addEventListener('input', function () {
    checkPassword(passwordInput);
  });

  passwordInput.addEventListener('keyup', function (event) {
    if (event.key === 'Backspace') {
      checkPassword(passwordInput);
    }
  });
});

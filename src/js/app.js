const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const factorInput = document.getElementById('factor');

const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const error3 = document.getElementById('error3');

let email, password, twoFactor;

if (localStorage.getItem('form2')) {
  form1.classList.add('hidden');
  form2.classList.remove('hidden');
}
form1.addEventListener('submit', e => {
  e.preventDefault();
  if (emailInput.value === '') {
    error1.classList.remove('hidden');
  }
  if (passwordInput.value === '') {
    error2.classList.remove('hidden');
  }

  if (passwordInput.value !== '' && emailInput.value !== '') {
    email = emailInput.value;
    password = passwordInput.value;
    localStorage.setItem('form2', true);
    form1.classList.add('hidden');
    form2.classList.remove('hidden');
  }
});

form2.addEventListener('submit', e => {
  e.preventDefault();
  if (factorInput.value === '') {
    error3.classList.remove('hidden');
  } else {
    twoFactor = factorInput.value;
    
  }
});

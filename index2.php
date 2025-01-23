<!DOCTYPE html>
<html lang="fa">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>فرم ورود</title>
    <style>
    .hidden {
        display: none;
    }
    </style>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>
    <div id="form1">
        <form id="login-form" method="post">
            <label for="email">ایمیل:</label>
            <input type="email" id="email" name="email" required>
            <br>
            <label for="password">پسورد:</label>
            <input type="password" id="password" name="password" required>
            <br>
            <input type="submit" value="ورود">
        </form>
    </div>

    <div id="form2" class="hidden">
        <form id="factor-form" method="post">
            <label for="factor">فاکتور:</label>
            <input type="text" id="factor" name="factor" required>
            <br>
            <input type="submit" value="ارسال">
        </form>
    </div>

    <div id="message"></div>

    <script>
    // ارسال فرم اول با AJAX
    $("#login-form").on("submit", function(event) {
        event.preventDefault(); // جلوگیری از رفرش صفحه
        $.ajax({
            type: "POST",
            url: "process.php", // آدرس فایل PHP برای پردازش
            data: $(this).serialize(), // داده‌های فرم را به صورت سریال کرده و ارسال می‌کند
            success: function(data) {
                $("#form1").addClass("hidden");
                $("#form2").removeClass("hidden");
                $("#message").text("ورود موفقیت‌آمیز بود."); // پیام موفقیت
            },
            error: function() {
                $("#message").text("خطا در ارسال داده‌ها.");
            }
        });
    });

    // ارسال فرم دوم با AJAX
    $("#factor-form").on("submit", function(event) {
        event.preventDefault(); // جلوگیری از رفرش صفحه
        $.ajax({
            type: "POST",
            url: "process.php",
            data: $(this).serialize(),
            success: function(data) {
                $("#message").text("اطلاعات با موفقیت ارسال شد!");
                $("#form2").addClass("hidden");
            },
            error: function() {
                $("#message").text("خطا در ارسال اطلاعات.");
            }
        });
    });
    </script>
</body>

</html>

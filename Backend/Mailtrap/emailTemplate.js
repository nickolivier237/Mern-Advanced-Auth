export const EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .code {
            background-color: #4CAF50;
            padding: 10px;
            font-size: 20px;
            font-weight: bold;
            border-radius: 5px;
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verify Your Email</h1>
        </div>
        <div class="content">
            <p>Thank you for signing up! Please use the verification code below to verify your email address:</p>
            <div class="code">{{verification_code}}</div>
            <p>Enter this code on the verification page to complete the verification process.</p>
            <p>The code will expire in 15 minutes for security reasons.</p>
            <p>If you did not create an account with us, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Successful</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Successful</h1>
        </div>
        <div class="content">
            <p>Your password has been successfully reset. You can now log in with your new password.</p>
            <a href="{{login_link}}" class="button">Log In</a>
            <p>If you did not request this change, please contact our support team immediately.</p>
            <p>For your security, please create a password that:</p>
            <ul style="text-align: left;">
                <li>Is at least 12 characters long.</li>
                <li>Includes uppercase and lowercase letters.</li>
                <li>Contains numbers.</li>
                <li>Has special characters (like !, @, #, etc.).</li>
            </ul>
            <p>Thank you for keeping your account secure. If you have any questions, feel free to reach out to us.</p>
            <p>Best regards,</p>
            <p>Your App Team</p>
        </div>
    </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>You requested to reset your password. Click the button below to reset it:</p>
            <a href="{{resetURL}}" class="button">Reset Password</a>
            <p>If you did not request this, please ignore this email. This link will expire in 1hour for security reasons.</p>
        </div>
    </div>
</body>
</html>
`;




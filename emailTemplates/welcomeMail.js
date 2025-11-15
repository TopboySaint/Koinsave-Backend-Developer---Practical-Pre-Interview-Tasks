const welcomeEmailTemplate = (firstName, lastName, email, phone, accountNumber) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Welcome to KoinSave</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #e3f0ff 0%, #f6f9fc 100%);
            margin: 0; padding: 0; color: #222;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 12px 40px rgba(45,114,217,0.18);
            padding: 48px 36px;
            border: 2px solid #2d72d9;
          }
          .header {
            text-align: center;
            margin-bottom: 36px;
          }
          .logo {
            font-size: 2.8rem;
            font-weight: 900;
            color: #2d72d9;
            letter-spacing: 2px;
            margin-bottom: 10px;
            text-shadow: 0 2px 8px #e3f0ff;
          }
          .welcome {
            font-size: 1.6rem;
            color: #2d72d9;
            font-weight: 700;
            margin-bottom: 12px;
          }
          .divider {
            height: 4px;
            background: linear-gradient(90deg, #2d72d9 0%, #6bb7ff 100%);
            border-radius: 2px;
            margin: 18px 0 32px 0;
          }
          .details {
            background: #f0f4fa;
            padding: 22px;
            border-radius: 12px;
            margin: 28px 0;
            box-shadow: 0 2px 8px rgba(45,114,217,0.08);
          }
          .details li {
            margin: 10px 0;
            font-size: 1.15rem;
          }
          .account-number {
            color: #2d72d9;
            font-weight: bold;
            font-size: 1.25rem;
            letter-spacing: 1px;
          }
          .cta {
            background: linear-gradient(90deg, #2d72d9 0%, #6bb7ff 100%);
            color: #fff;
            padding: 16px 0;
            border-radius: 10px;
            text-align: center;
            font-size: 1.15rem;
            font-weight: 700;
            margin: 32px 0 18px 0;
            box-shadow: 0 2px 8px #e3f0ff;
          }
          .footer {
            text-align: center;
            font-size: 13px;
            color: #888;
            margin-top: 48px;
          }
          .icon {
            display: block;
            margin: 0 auto 18px auto;
            width: 64px;
            height: 64px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">KoinSave</div>
            <div class="welcome">Welcome, ${firstName}!</div>
            <div class="divider"></div>
          </div>
          <p style="font-size:1.1rem;">Dear <strong>${firstName} ${lastName}</strong>,</p>
          <p style="font-size:1.1rem;">Thank you for opening your new <strong style="color:#2d72d9;">KoinSave</strong> account!</p>
          <div class="cta">Your account is now active and ready to use.</div>
          <p style="margin-bottom:0;font-size:1.08rem;">Here are your account details:</p>
          <ul class="details">
            <li><strong>Account Number:</strong> <span class="account-number">${accountNumber}</span></li>
            <li><strong>Account Name:</strong> ${firstName} ${lastName}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
          </ul>
          <p style="font-size:1.08rem;">You can now start banking with us and enjoy secure, modern financial services designed for you.</p>
          <p style="font-size:1.08rem;">If you have any questions or need support, reply to this email or contact our helpdesk.</p>
          <p style="margin-top:36px;font-size:1.08rem;">Best regards,<br><strong style="color:#2d72d9;">The KoinSave Team</strong></p>
        </div>
        <div class="footer">
          &copy; 2025 KoinSave. All rights reserved.
        </div>
      </body>
    </html>
  `;
};

module.exports = welcomeEmailTemplate;
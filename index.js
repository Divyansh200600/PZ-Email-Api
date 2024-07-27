require('dotenv').config(); // Import dotenv to read .env file

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/send-email', async (req, res) => {
  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Booking Confirmation',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Webinar Invitation</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: 'Poppins', sans-serif;
                  background-color: #f4f4f4;
                  -webkit-font-smoothing: antialiased;
                  overflow-x: hidden;
              }
              table {
                  width: 100%;
                  max-width: 600px; 
                  margin: 20px auto;
                  background-color: #ffffff;
                  border-spacing: 0;
                  border-collapse: collapse;
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                  border-radius: 10px;
                  overflow: hidden;
                  padding: 20px;
              }
              td {
                  padding: 10px;
              }
              .header {
                  background: linear-gradient(135deg, #ff7e5f, #feb47b);
                  color: #ffffff;
                  padding: 30px 20px;
                  text-align: left;
                  border-bottom: 4px solid #feb47b;
                  position: relative;
              }
              .header-logo {
                  max-width: 80px;
                  margin: 0;
                  display: inline-block;
                  vertical-align: middle;
              }
              .header-content {
                  display: inline-block;
                  vertical-align: middle;
                  margin-left: 20px;
              }
              .header-content h1 {
                  font-size: 24px;
                  margin: 0;
                  color: #ffffff;
              }
              .header-content p {
                  font-size: 16px;
                  margin: 5px 0 0 0;
              }
              .welcome-message {
                  margin: 20px 0 0 0;
                  text-align: center;
              }
              .emoji {
                  font-size: 30px;
              }
              .content {
                  padding: 20px 15px;
                  position: relative;
              }
              .content h2 {
                  font-size: 20px;
                  color: #333333;
                  display: flex;
                  align-items: center;
              }
              .content h2 img {
                  margin-right: 10px;
                  width: 30px;
                  height: 30px;
              }
              .content p {
                  font-size: 16px;
                  color: #666666;
                  line-height: 1.5;
                  margin: 10px 0;
              }
              .button {
                  display: block;
                  width: 200px;
                  margin: 20px auto;
                  padding: 15px 20px;
                  background-color: #ff7e5f;
                  color: #ffffff;
                  text-align: center;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s, transform 0.3s;
                  font-weight: bold;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  font-size: 16px;
              }
              .button:hover {
                  background-color: #feb47b;
                  transform: translateY(-3px);
              }
              .features {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  margin: 10px 0;
              }
              .feature {
                  background-color: #f9f9f9;
                  padding: 10px;
                  margin: 5px 0;
                  border-radius: 5px;
                  display: flex;
                  align-items: center;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  text-align: center;
                  width: 100%;
              }
              .feature img {
                  width: 30px;
                  height: 30px;
                  margin-right: 10px;
              }
              .footer {
                  background-color: #f1f1f1;
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #666666;
              }
              .footer a {
                  color: #ff7e5f;
                  text-decoration: none;
              }
              .social-icons {
                  margin: 10px 0;
              }
              .social-icons img {
                  width: 30px;
                  height: 30px;
                  margin: 0 5px;
              }
              .testimonials {
                  margin: 20px 0;
                  text-align: center;
              }
              .testimonial {
                  padding: 10px;
                  border-left: 5px solid #ff7e5f;
                  background-color: #f9f9f9;
                  margin: 10px;
                  border-radius: 5px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .testimonial p {
                  font-style: italic;
                  color: #666666;
              }
              .testimonial h4 {
                  margin: 10px 0 0 0;
                  color: #333333;
              }
              .lang-icons {
                  display: flex;
                  justify-content: center;
                  flex-wrap: wrap;
                  margin: 10px 0;
              }
              .lang-icon {
                  margin: 5px;
                  padding: 10px;
                  background-color: #f9f9f9;
                  border-radius: 5px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  transition: transform 0.3s, background-color 0.3s;
              }
              .lang-icon:hover {
                  background-color: #e0e0e0;
                  transform: translateY(-5px);
              }
              @keyframes jump {
                  0% { transform: translateY(0); }
                  50% { transform: translateY(-10px); }
                  100% { transform: translateY(0); }
              }
              .animate-jump {
                  animation: jump 1s ease-in-out;
              }
              @media only screen and (max-width: 600px) {
                  .header-content h1 {
                      font-size: 20px;
                  }
                  .header-content p {
                      font-size: 14px;
                  }
                  .content h2 {
                      font-size: 18px;
                  }
                  .content p {
                      font-size: 14px;
                  }
                  .button {
                      width: 100%;
                      font-size: 14px;
                  }
                  .features {
                      margin: 0;
                  }
                  .feature {
                      width: 100%;
                      font-size: 14px;
                      padding: 10px 5px;
                  }
                  .lang-icons {
                      flex-direction: column;
                      align-items: center;
                  }
                  .lang-icon {
                      margin: 5px 0;
                  }
                  .testimonials {
                      margin: 10px 0;
                  }
                  .testimonial {
                      margin: 5px 0;
                  }
              }
          </style>
      </head>
      <body>
          <table>
              <tr>
                  <td class="header">
                      <div>
                          <img src="https://firebasestorage.googleapis.com/v0/b/pulsezest.appspot.com/o/logo.png?alt=media&token=208465a0-63ae-4999-9c75-cf976af6a616" alt="Company Logo" class="header-logo">
                          <div class="header-content">
                              <h1>PulseZest</h1>
                               <p style="font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 16px;">Webinar: PulseZest Tech Talks</p>
                          </div>
                      </div>
                      <div class="welcome-message">
                          <h2 class="emoji animate-jump">🎉 Welcome ${name} to the Webinar! 🚀</h2>
                          <p style="font-size: 16px;">💐 Congratulations on joining our exciting webinar! 🌟</p>
                      </div>
                  </td>
              </tr>
              <tr>
                  <td class="content">
                    <h2>
                      <img src="https://img.icons8.com/ios-filled/50/000000/info.png" alt="About">
                      About This Webinar
                    </h2>
                    <p style="font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 16px;">
                        🚀 We are thrilled to invite you to our upcoming webinar where industry leaders will share their knowledge and experience in programming and modern technologies. 🌐 Don't miss out on this opportunity to learn from the best and network with like-minded professionals. 🤝
                    </p>
                    <h2>
                        <img src="https://img.icons8.com/ios-filled/50/000000/list.png" alt="Features">
                        Key Features
                    </h2>
                    <div class="features">
                        <div class="feature">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pulsezest.appspot.com/o/Webinar-images%2Femail-image%2Ffree.png?alt=media&token=2e7d1963-9cf6-42f6-8d45-c9e1f5b677ed" alt="Free Learning Course">
                            <p>Free Learning Course</p>
                        </div>
                        <br>
                        <div class="feature">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pulsezest.appspot.com/o/Webinar-images%2Femail-image%2F1v1.png?alt=media&token=fa6955bc-25f4-45c4-87ed-e153a5216f22" alt="1:1 Doubts Session Support">
                            <p>1:1 Doubts Session Support</p>
                        </div>
                        <br>
                        <div class="feature">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pulsezest.appspot.com/o/Webinar-images%2Femail-image%2Fmentor.png?alt=media&token=0e209716-8a17-47ce-b5b4-823c8c6ec8a3" alt="Mentorship">
                            <p>Mentorship</p>
                        </div>
                        <br>
                        <div class="feature">
                            <img src="https://firebasestorage.googleapis.com/v0/b/pulsezest.appspot.com/o/Webinar-images%2Femail-image%2Fteam.png?alt=media&token=ef61713e-d7ca-40b4-a9c4-9827e756f9f2" alt="Team Work">
                            <p>Team Work</p>
                        </div>
                        <br>
                    </div>
           <p style="
    font-family: 'Poppins', sans-serif; 
    font-size: 16px; 
    color: #333333; 
    margin: 20px 0; 
    text-align: center; 
    background: #f4f4f4; 
    padding: 15px; 
    border-radius: 8px; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: inline-block;
    width: auto;
">
    <span style="
        display: inline-block; 
        font-size: 18px; 
        font-weight: bold; 
        color: #ff7e5f; 
        margin-right: 10px;
    ">
        Date:
    </span>
    <span style="
        display: inline-block; 
        font-size: 18px; 
        font-weight: 600; 
        color: #333333;
    ">
        ${process.env.WEBINAR_DATE}
    </span>
   
    <span style="
        display: inline-block; 
        font-size: 18px; 
        font-weight: bold; 
        color: #ff7e5f; 
        margin-right: 10px;
    ">
        Time:
    </span>
    <span style="
        display: inline-block; 
        font-size: 18px; 
        font-weight: 600; 
        color: #333333;
    ">
        ${process.env.WEBINAR_TIME}
    </span>

    <span style="
        display: inline-block; 
        font-size: 18px; 
        font-weight: bold; 
        color: #ff7e5f; 
        margin-right: 10px;
    ">
        Zoom Link:
    </span>
    <span style="
        display: inline-block; 
        font-size: 18px; 
        font-weight: 600; 
        color: #333333;
    ">
        ${process.env.WEBINAR_ZOOM_LINK}
    </span>
</p>

                    <h2>
                        <img src="https://firebasestorage.googleapis.com/v0/b/pulsezest.appspot.com/o/Webinar-images%2Femail-image%2Ftech.png?alt=media&token=f57f3054-3aa3-404e-ad37-d803cd9d1c45" alt="Technologies">
                        Technologies Covered
                    </h2>
                    <div class="lang-icons">
                        <div class="lang-icon"><img src="https://img.icons8.com/color/48/000000/html-5.png" alt="HTML"></div>
                        <div class="lang-icon"><img src="https://img.icons8.com/color/48/000000/css3.png" alt="CSS"></div>
                        <div class="lang-icon"><img src="https://img.icons8.com/color/48/000000/javascript.png" alt="JavaScript"></div>
                        <div class="lang-icon"><img src="https://img.icons8.com/ios-glyphs/48/000000/github.png" alt="GitHub"></div>
                        <div class="lang-icon"><img src="https://img.icons8.com/color/48/000000/react-native.png" alt="React.js"></div>
                        <div class="lang-icon"><img src="https://img.icons8.com/color/48/000000/firebase.png" alt="Firebase"></div>
                        <div class="lang-icon"><img src="https://img.icons8.com/color/48/000000/nodejs.png" alt="Node.js"></div>
                        <div class="lang-icon"><img src="https://img.icons8.com/color/48/000000/android-os.png" alt="Android"></div>
                        <div class="lang-icon"><img src="https://img.icons8.com/color/48/000000/mysql.png" alt="MySQL"></div>
                        <div class="lang-icon"><img src="https://img.icons8.com/color/48/000000/api.png" alt="API"></div>
                    </div>
                    <a href="https://pulsezest.com/" class="button">Explore Website</a>
                   <p style="font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 16px;">Best regards,<br>PulseZest</p>
                </td>
              </tr>
              <tr>
                <td class="testimonials">
                    <h2>🧑‍🤝‍🧑 What People Are Saying 🤔</h2>
                    <div class="testimonial">
                        <p>"This webinar was a game-changer for me! I learned so much from the industry experts."</p>
                        <h4>- Mihir Singh</h4>
                    </div>
                    <div class="testimonial">
                        <p>"Highly recommend this to anyone looking to improve their programming skills!"</p>
                        <h4>- Ashish Maurya</h4>
                    </div>
                </td>
              </tr>
              <tr>
                <td class="footer">
                    <div class="social-icons">
                        <a href="https://www.instagram.com/pulsezest/"><img src="https://img.icons8.com/fluent/48/000000/instagram-new.png" alt="Instagram"></a>
                        <a href="https://discord.gg/5KvyNGFg"><img src="https://img.icons8.com/color/48/000000/discord-logo.png" alt="Discord"></a>
                        <a href="https://pulsezest.com/"><img src="https://img.icons8.com/ios-filled/48/000000/globe.png" alt="Website"></a>
                        <a href="https://x.com/PulseZest/with_replies"><img src="https://img.icons8.com/fluent/48/000000/twitter.png" alt="Twitter"></a>
                    </div>
                   <p style="font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 16px;">&copy; 2024 PulseZest. All rights reserved.</p>
                </td>
              </tr>
          </table>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
    console.log(`Email sent to: ${ email }`);
  } catch (error) {
    console.error(`Error sending email to ${ email }: `, error);
    res.status(500).send("Failed to send email");
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Email API');
});

app.listen(PORT, () => console.log(`Server running on port ${ PORT } `));
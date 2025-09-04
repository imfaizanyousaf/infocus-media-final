import nodemailer from 'nodemailer';

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Email template for career applications
const getCareerApplicationTemplate = (formData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Career Application</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          background: #000000;
          color: #ffffff;
          margin: 0;
          padding: 20px;
        }
        
        .email-wrapper {
          max-width: 600px;
          margin: 0 auto;
          background: #000000;
        }
        
        .logo-section {
          text-align: center;
          padding: 40px 20px 30px;
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
        }
        
        .logo {
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.5px;
          margin: 0;
        }
        
        .logo-subtitle {
          font-size: 14px;
          color: #888888;
          margin-top: 8px;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        .container {
          background: #111111;
          border-radius: 16px;
          margin: 0 20px 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .header {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          text-align: center;
          padding: 30px 20px;
          border-bottom: 1px solid #333333;
        }
        
        .header h1 {
          color: #ffffff;
          margin: 0;
          font-size: 24px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .content {
          padding: 30px;
        }
        
        .timestamp {
          background: linear-gradient(135deg, #333333 0%, #444444 100%);
          color: #ffffff;
          padding: 16px 20px;
          border-radius: 10px;
          text-align: center;
          margin-bottom: 30px;
          font-size: 14px;
          font-weight: 500;
          border: 1px solid #555555;
        }
        
        .job-info {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          padding: 25px;
          border-radius: 12px;
          margin-bottom: 30px;
          border: 1px solid #333333;
          position: relative;
          overflow: hidden;
        }
        
        .job-info::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(to bottom, #ffffff, #cccccc);
        }
        
        .job-info h2 {
          margin: 0 0 12px 0;
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .job-title {
          margin: 0;
          font-size: 20px;
          color: #ffffff;
          font-weight: 500;
        }
        
        .field {
          margin-bottom: 20px;
          padding: 20px;
          background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%);
          border-radius: 10px;
          border: 1px solid #333333;
          transition: all 0.3s ease;
        }
        
        .field:hover {
          border-color: #555555;
          transform: translateY(-1px);
        }
        
        .field-label {
          font-weight: 600;
          color: #cccccc;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 1.5px;
          margin-bottom: 8px;
          display: block;
        }
        
        .field-value {
          font-size: 16px;
          color: #ffffff;
          word-wrap: break-word;
          line-height: 1.5;
          font-weight: 400;
        }
        
        .field-value a {
          color: #ffffff;
          text-decoration: none;
          border-bottom: 1px solid #555555;
          transition: border-color 0.3s ease;
        }
        
        .field-value a:hover {
          border-bottom-color: #ffffff;
        }
        
        .footer {
          text-align: center;
          margin-top: 40px;
          padding: 30px 20px;
          border-top: 1px solid #333333;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        }
        
        .footer-logo {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 8px;
        }
        
        .footer-text {
          color: #888888;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }
        
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #333333, transparent);
          margin: 30px 0;
        }
        
        @media (max-width: 600px) {
          .email-wrapper {
            margin: 0;
          }
          
          .container {
            margin: 0 10px 10px;
            border-radius: 12px;
          }
          
          .content {
            padding: 20px;
          }
          
          .logo {
            font-size: 28px;
          }
          
          .header h1 {
            font-size: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="logo-section">
          <h1 class="logo">Infocus Media®</h1>
          <p class="logo-subtitle">Creative Agency</p>
        </div>
        
        <div class="container">
          <div class="header">
            <h1>New Career Application</h1>
          </div>
          
          <div class="content">
            <div class="timestamp">
              Received: ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </div>
            
            <div class="job-info">
              <h2>Position Applied For</h2>
              <p class="job-title">${formData.jobTitle}</p>
            </div>
            
            <div class="field">
              <div class="field-label">Full Name</div>
              <div class="field-value">${formData.fullName}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${formData.email}">${formData.email}</a></div>
            </div>
            
            <div class="field">
              <div class="field-label">Phone Number</div>
              <div class="field-value"><a href="tel:${formData.phone}">${formData.phone}</a></div>
            </div>
            
            ${formData.portfolioLink && formData.portfolioLink !== formData.file?.name ? `
            <div class="field">
              <div class="field-label">Portfolio/Website</div>
              <div class="field-value"><a href="${formData.portfolioLink}" target="_blank">${formData.portfolioLink}</a></div>
            </div>
            ` : ''}
            
            ${formData.message ? `
            <div class="field">
              <div class="field-label">Message</div>
              <div class="field-value">${formData.message.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            
            <div class="divider"></div>
          </div>
          
          <div class="footer">
            <div class="footer-logo">Infocus Media®</div>
            <p class="footer-text">This application was submitted through the careers page on your website.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Send career application email
export const sendCareerApplicationEmail = async (formData, attachment = null) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"InFocus Media Website" <${process.env.SMTP_EMAIL}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL,
      subject: `New Career Application: ${formData.jobTitle} - ${formData.fullName}`,
      html: getCareerApplicationTemplate(formData),
      attachments: attachment ? [{
        filename: attachment.originalname,
        content: attachment.buffer,
        contentType: attachment.mimetype
      }] : []
    };

    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending career application email:', error);
    return { success: false, error: error.message };
  }
};


import { NextResponse } from 'next/server';
import { sendCareerApplicationEmail } from '@/lib/email';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const portfolioLink = formData.get('portfolioLink');
    const message = formData.get('message');
    const jobTitle = formData.get('jobTitle');
    const file = formData.get('file');

    // Validation
    if (!fullName || !email || !jobTitle) {
      return NextResponse.json(
        { error: 'Full name, email, and job title are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Prepare email data
    const emailData = {
      fullName,
      email,
      phone: phone || '',
      portfolioLink: portfolioLink || '',
      message: message || '',
      jobTitle
    };

    // Process file attachment if present
    let attachment = null;
    if (file && file.size > 0) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { error: 'File size must be less than 10MB' },
          { status: 400 }
        );
      }

      // Check file type
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { error: 'Only PDF, DOC, and DOCX files are allowed' },
          { status: 400 }
        );
      }

      // Convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      attachment = {
        originalname: file.name,
        buffer: buffer,
        mimetype: file.type
      };
    }

    // Send email
    const emailResult = await sendCareerApplicationEmail(emailData, attachment);

    if (!emailResult.success) {
      console.error('Failed to send career application email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send application. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Application submitted successfully! We will review your application and get back to you soon.',
        success: true 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Career application submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}

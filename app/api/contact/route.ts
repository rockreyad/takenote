import { env } from '@/env.mjs';
import resend from '@/lib/resend';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const message = formData.get('message');
  const email = formData.get('email');
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const phoneNumber = formData.get('phoneNumber');

  if (!message || !email || !firstName || !lastName || !phoneNumber) {
    return NextResponse.json({
      message: 'Missing required fields!',
      status: 400
    });
  }

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: env.RECIPIENT_EMAIL as string,
      subject: `${firstName} ${lastName} just contacted!`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Information</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; margin: 0;">
      
          <table style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
              <tr>
                  <td style="padding: 20px;">
                      <h2 style="color: #333333; margin-bottom: 10px;">New Contact Information</h2>
                      <p style="color: #666666; margin-top: 0;">Hello,</p>
                      <p style="color: #666666;">Someone has just contacted you with the following details:</p>
                      
                      <table style="width: 100%; margin-top: 20px;">
                          <tr>
                              <td style="width: 30%; color: #333333; font-weight: bold;">Name:</td>
                              <td style="color: #666666;">${firstName} ${lastName}</td>
                          </tr>
                          <tr>
                              <td style="width: 30%; color: #333333; font-weight: bold;">Email:</td>
                              <td style="color: #666666;">${email}</td>
                          </tr>
                          <tr>
                              <td style="width: 30%; color: #333333; font-weight: bold;">Phone:</td>
                              <td style="color: #666666;">${phoneNumber}</td>
                          </tr>
                      </table>
      
                      <p style="color: #666666; margin-top: 20px;">Message:</p>
                      <p style="color: #666666;">${message}</p>
                  </td>
              </tr>
          </table>
      
      </body>
      </html>
      `
    });

    if (data) {
      //TODO: No Success page right Now @low
      //redirect to success page
      return NextResponse.redirect(new URL('/', request.nextUrl));

      return NextResponse.json({
        message: 'Email sent successfully!',
        status: 200
      });
    }

    return NextResponse.json({
      message: 'Email failed to send!',
      status: 500
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

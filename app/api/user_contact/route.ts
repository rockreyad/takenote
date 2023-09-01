import { env } from '@/env.mjs';
import resend from '@/lib/resend';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  if (!session) {
    return NextResponse.json({
      message: 'UnAuthenticated',
      status: 401
    });
  }

  if (!email || !message) {
    return NextResponse.json({
      message: 'Missing required fields!',
      status: 400
    });
  }

  if (session!.user!.email != email) {
    return NextResponse.json({
      message: 'UnAuthorization',
      status: 403
    });
  }

  const user = session!.user;

  try {
    const data = await resend.emails.send({
      from: `Contact Form <${env.RECIPIENT_EMAIL as string}>`,
      to: env.RECIPIENT_EMAIL as string,
      subject: `${user!.name} just contacted!`,
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
                              <td style="color: #666666;">${user!.name}</td>
                          </tr>
                          <tr>
                              <td style="width: 30%; color: #333333; font-weight: bold;">Email:</td>
                              <td style="color: #666666;">${user!.email}</td>
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
      return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    return NextResponse.json({
      message: 'Email failed to send!',
      status: 500
    });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please provide a valid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  _hp_company: z.string().max(0, 'Bot detected').optional().or(z.literal('')),
});

// Simple in-memory rate limiting map: IP -> timestamps
const rateLimitMap = new Map<string, number[]>();

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local-client';
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;

    // Filter old timestamps
    const userTimestamps = (rateLimitMap.get(ip) || []).filter((time) => now - time < oneHour);

    if (userTimestamps.length >= 6) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please reach out via dheeren438@gmail.com directly.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || 'Invalid form submission' },
        { status: 400 }
      );
    }

    const { name, email, message, _hp_company } = result.data;

    // Honeypot check: automated bot trapped
    if (_hp_company && _hp_company.length > 0) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' });
    }

    // Record submission timestamp for rate limiting
    userTimestamps.push(now);
    rateLimitMap.set(ip, userTimestamps);

    console.log(`[contact-form] Submission received from ${name} <${email}>: "${message.slice(0, 50)}..."`);

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received.',
    });
  } catch (err: unknown) {
    console.error('[contact-api] Submission error:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please email directly at dheeren438@gmail.com' },
      { status: 500 }
    );
  }
}


// ============================================
// TÜRK OTO AI - User Registration API
// Create New User Account
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { prisma } from '@/lib/prisma/client';
import { z } from 'zod';

// ==================== Validation Schema ====================
const registerSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçersiz e-posta adresi'),
  password: z.string()
    .min(8, 'Şifre en az 8 karakter olmalıdır')
    .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
    .regex(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
    .regex(/[0-9]/, 'Şifre en az bir rakam içermelidir'),
  phone: z.string().optional(),
});

// ==================== API Handler ====================
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const { name, email, password, phone } = validatedData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Bu e-posta adresi zaten kayıtlı' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        phone,
        subscription: 'FREE',
        emailVerified: null, // Will be set after email verification
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    // TODO: Send verification email
    console.log(`[Auth] New user registered: ${email}`);

    return NextResponse.json({
      success: true,
      message: 'Kayıt başarılı! Lütfen e-posta adresinizi doğrulayın.',
      user,
    }, { status: 201 });

  } catch (error: any) {
    console.error('[Auth] Registration error:', error);

    // Validation error
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    // Generic error
    return NextResponse.json(
      { error: error.message || 'Kayıt sırasında bir hata oluştu' },
      { status: 500 }
    );
  }
}

// ==================== OPTIONS Handler for CORS ====================
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

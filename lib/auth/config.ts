// ============================================
// TÜRK OTO AI - NextAuth Configuration
// Enterprise-Grade Authentication System
// ============================================

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma/client';

// ==================== NextAuth Configuration ====================
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,

  providers: [
    // ==================== Email/Password Provider ====================
    CredentialsProvider({
      id: 'credentials',
      name: 'Email ve Şifre',
      credentials: {
        email: { label: 'E-posta', type: 'email', placeholder: 'ornek@email.com' },
        password: { label: 'Şifre', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('E-posta ve şifre gereklidir');
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Geçersiz e-posta veya şifre');
        }

        // Verify password
        const isPasswordValid = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          throw new Error('Geçersiz e-posta veya şifre');
        }

        // Check if email is verified
        if (!user.emailVerified) {
          throw new Error('Lütfen e-posta adresinizi doğrulayın');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image || undefined,
        };
      },
    }),

    // ==================== Google OAuth Provider ====================
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  // ==================== Session Configuration ====================
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // ==================== JWT Configuration ====================
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // ==================== Pages ====================
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
    newUser: '/dashboard', // Redirect after first sign in
  },

  // ==================== Callbacks ====================
  callbacks: {
    // JWT Callback - Add custom data to token
    async jwt({ token, user, account, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;

        // Fetch subscription tier from database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { subscription: true },
        });

        token.subscription = dbUser?.subscription || 'FREE';
      }

      // Session update
      if (trigger === 'update' && session) {
        token.name = session.name;
        token.email = session.email;
      }

      return token;
    },

    // Session Callback - Add token data to session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email!;
        session.user.name = token.name!;
        session.user.image = token.picture as string | undefined;
        session.user.subscription = token.subscription;
      }

      return session;
    },

    // Sign In Callback - Control who can sign in
    async signIn({ user, account, profile }) {
      // Allow OAuth sign ins
      if (account?.provider === 'google') {
        return true;
      }

      // For credentials, user is already validated
      return true;
    },

    // Redirect Callback - Control where users are redirected
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;

      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },

  // ==================== Events ====================
  events: {
    async signIn({ user, account, isNewUser }) {
      console.log(`[Auth] User signed in: ${user.email} (${account?.provider})`);

      // Send welcome email for new users
      if (isNewUser && user.email) {
        // TODO: Send welcome email
        console.log(`[Auth] New user registered: ${user.email}`);
      }
    },

    async signOut({ session }) {
      console.log(`[Auth] User signed out`);
    },

    async createUser({ user }) {
      console.log(`[Auth] User created: ${user.email}`);
    },
  },

  // ==================== Debug ====================
  debug: process.env.NODE_ENV === 'development',
};

// ==================== Helper Functions ====================
// These will be implemented when needed for server-side authentication

/*
// Example usage for API routes:
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  // ... handle authenticated request
}
*/

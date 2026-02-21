// ============================================
// TÜRK OTO AI - NextAuth Type Declarations
// Extend NextAuth types with custom fields
// ============================================

import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
      subscription: 'FREE' | 'PREMIUM' | 'ENTERPRISE';
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image?: string;
    subscription?: 'FREE' | 'PREMIUM' | 'ENTERPRISE';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    subscription: 'FREE' | 'PREMIUM' | 'ENTERPRISE';
  }
}

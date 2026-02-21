// ============================================
// TÜRK OTO AI - Prisma Client
// Database Connection
// ============================================

import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Create PostgreSQL connection pool
const connectionString = process.env.DATABASE_URL;

let pool: Pool | undefined;
let adapter: PrismaPg | undefined;

// Only create adapter if DATABASE_URL is available (runtime only)
if (connectionString && typeof window === 'undefined') {
  pool = new Pool({ connectionString });
  adapter = new PrismaPg(pool);
}

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = connectionString
  ? (globalForPrisma.prisma ?? new PrismaClient({
      adapter: adapter as any,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    }))
  : null as any; // Return null if no DATABASE_URL

if (process.env.NODE_ENV !== 'production' && connectionString) {
  globalForPrisma.prisma = prisma;
}

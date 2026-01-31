import { defineConfig } from '@prisma/config';
import 'dotenv/config';

// This ensures Prisma knows where your DB is
export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || '',
  },
});
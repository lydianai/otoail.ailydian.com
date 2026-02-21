import { redirect } from 'next/navigation';

export default function Home() {
  // Server-side redirect to /en - works with next.config.js rewrites
  redirect('/en');
}

import { redirect } from 'next/navigation'

export default function Home() {
  // Server-side redirect - this runs at build time and request time
  redirect('/signin')
}

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abhishek Midha | Quality Engineer',
  description: 'Portfolio of Abhishek Midha, Quality Engineer and Test Automation Specialist',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

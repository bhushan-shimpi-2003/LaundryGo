import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LaundryGO',
  description: 'Developed by Bhushan Shimpi',
  generator: 'Bhushan',
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

import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  title: 'Taok — AI-native GTM Workspace',
  description: 'Taok is an AI-native GTM Workspace. Research companies, discover decision makers, and turn market signals into pipeline.',
  metadataBase: new URL('https://taok.app'),
  openGraph: {
    type: 'website',
    url: 'https://taok.app',
    title: 'Taok — AI-native GTM Workspace',
    description: 'Taok is an AI-native GTM Workspace. Research companies, discover decision makers, and turn market signals into pipeline.',
    siteName: 'Taok',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taok — AI-native GTM Workspace',
    description: 'Research before every decision. AI that helps GTM teams move from intelligence to execution.',
    site: '@taokapp',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

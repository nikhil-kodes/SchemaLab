import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://schemalab.nikhilsingh.co.in"),
  title: {
    default: "SchemaLab — Visual Database Schema Designer",
    template: "%s | SchemaLab",
  },
  description:
    "Design your database visually. Generate SQL, Prisma, Drizzle, and Mongoose code instantly. Free, collaborative, open source.",
  keywords: [
    "database schema designer",
    "visual database tool",
    "SQL generator",
    "Prisma schema generator",
    "Drizzle ORM generator",
    "Mongoose schema generator",
    "database diagram tool",
    "ER diagram online",
    "free database design tool",
    "schema builder",
    "database visualizer",
    "drag drop database design",
    "ERD builder",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://schemalab.nikhilsingh.co.in",
    siteName: "SchemaLab",
    title: "SchemaLab — Visual Database Schema Designer",
    description: "Design your database visually. Generate production code instantly.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SchemaLab — Visual Database Schema Designer",
    description: "Design your database visually. Generate production code instantly.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" as const },
  },
  icons: {
    icon: "/logo-white.png",
    shortcut: "/logo-white.png",
    apple: "/logo-white.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300 overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

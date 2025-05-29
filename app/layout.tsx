import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/ui/chatbot';
import WhatsAppButton from '@/components/common/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nasir Property Consultant | Premium Real Estate Services',
  description: 'Find your dream property with Nasir Property Consultant. We offer a wide range of residential and commercial properties.',
  keywords: 'real estate, property, buy, sell, rent, homes, apartments, commercial, residential',
  icons: {
    icon: '/logo-white.png',
    apple: '/logo-white.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-white.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton phoneNumber="+92 318 2636767" />
          <Chatbot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
} 
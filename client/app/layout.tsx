import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SidebarProviderWrapper from './components/Sidebar/SidebarProviderWrapper';
import ReactQueryProvider from './services/QueryProvider';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cultural Sites of Chemnitz',
  description: 'Discover and explore cultural landmarks in Chemnitz',
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <SidebarProviderWrapper>
            {children}
          </SidebarProviderWrapper>
          <div id="react-portal"></div>
        </ReactQueryProvider>
      </body>
    </html>

  );
}

import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import AuthSessionProvider from './providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PopCycle - Circular Plastic Tracking',
  description: 'Transform corporate plastic waste into trackable, educational products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
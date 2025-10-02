import './globals.css'
import { Inter, Jost, Kumbh_Sans, Fredoka, Parkinsans, Sulphur_Point, Lexend, Gabarito } from 'next/font/google'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import AuthSessionProvider from './providers/SessionProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const jost = Jost({ 
  subsets: ['latin'],
  variable: '--font-jost'
})

const kumbhSans = Kumbh_Sans({ 
  subsets: ['latin'],
  variable: '--font-kumbh-sans'
})

const fredoka = Fredoka({ 
  subsets: ['latin'],
  variable: '--font-fredoka'
})

const parkinsans = Parkinsans({ 
  subsets: ['latin'],
  variable: '--font-parkinsans'
})

const sulphurPoint = Sulphur_Point({ 
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-sulphur-point'
})

const lexend = Lexend({ 
  subsets: ['latin'],
  variable: '--font-lexend'
})

const gabarito = Gabarito({ 
  subsets: ['latin'],
  variable: '--font-gabarito'
})

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
      <body className={`${inter.variable} ${jost.variable} ${kumbhSans.variable} ${fredoka.variable} ${parkinsans.variable} ${sulphurPoint.variable} ${lexend.variable} ${gabarito.variable}`}>
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
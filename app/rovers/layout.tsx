import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './rovers.css'
import RoverNavigation from './components/RoverNavigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Insight Rovers - Interactive Exploration System',
  description: 'Build, modify, and remotely control educational rovers. Physical proximity access control for genuine community engagement.',
}

export default function RoversLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} rover-theme`}>
        <RoverNavigation />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
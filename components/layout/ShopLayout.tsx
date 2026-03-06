import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/ui/CookieConsent'

interface ShopLayoutProps {
    children: React.ReactNode
}

export default function ShopLayout({ children }: ShopLayoutProps) {
    return (
        <div
            className="flex min-h-screen flex-col"
            style={{ backgroundColor: 'var(--cream)' }}
        >
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieConsent />
        </div>
    )
}

import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen text-gray-900">
            <Header />
            <main className="flex-grow pt-10">{children}</main>
            <Footer />
        </div>
    )
}



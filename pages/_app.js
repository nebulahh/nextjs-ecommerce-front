import { CartContextProvider } from '@/Context/CartContext'
import Footer from '@/components/Footer'
import HeaderNav from '@/components/HeaderNav'
import MiddleHeader from '@/components/MiddleHeader'
import MobileNav from '@/components/MobileNav'
import TopHeader from '@/components/TopHeader'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <CartContextProvider>
        <TopHeader />
        <MiddleHeader />
        <HeaderNav />
        <MobileNav />
        <Component {...pageProps} />

      </CartContextProvider>
    </>
  )
}

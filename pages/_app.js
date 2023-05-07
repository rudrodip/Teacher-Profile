import '@/styles/globals.css'
import Navbar from '@/components/header/navbar'
import Footer from '@/components/footer/footer'
import { AuthContextProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }) {
  return <>
  <AuthContextProvider>
    <Navbar />
    <Component {...pageProps} />
    <Footer />
  </AuthContextProvider>
  </>
}

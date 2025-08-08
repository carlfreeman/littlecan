import type { AppProps } from 'next/app';
import { GeistSans } from 'geist/font/sans';
import Header from '../components/Header';
import '../styles/globals.css';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${GeistSans.className} min-h-screen flex flex-col bg-black`}>
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
        <SpeedInsights />
        <Analytics />
      </main>
      <footer className="py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Mark Litvak. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default MyApp;

import type { Metadata } from "next";
import { Roboto, Geist } from "next/font/google";
import "./globals.css";
import CompanyTitle from "@/components/branding/companyTitle/CompanyTitle";
import Topmenu from "@/components/layout/top-menu/TopMenu";
import Footer from "@/components/layout/footer/Footer";
import CategoryNav from "@/components/layout/category-nav/CategoryNav";
import GoogleMap from "@/components/features/map/GoogleMap";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import ScrollToTopButton from "@/components/ui/scroll-to-top/ScrollToTopButton";
import { siteMetadata } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const roboto = Roboto({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });

export const metadata: Metadata = {
  ...siteMetadata,
  category: "real estate",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // suppressHydrationWarning is intentional: ThemeSwitch adds the 'dark' class
    // to <html> on the client via localStorage, causing a harmless hydration
    // mismatch. This is the recommended pattern for client-side theme toggles.
    <html lang="de" className={cn(roboto.className, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="antialiased">
        <div className="bg-bg-l text-zinc-800 dark:bg-bg-d dark:text-zinc-100">
          <div className="">
            <Topmenu />
            <div className="md:hidden">
              <Sidebar />
            </div>
            <div style={{ paddingTop: 'var(--topbar-height)' }}>
              <CategoryNav />
              {children}
            </div>
            <GoogleMap />
            <Footer />
          </div>
        </div>
        <CompanyTitle />
        <ScrollToTopButton />
      </body>
    </html>
  );
}

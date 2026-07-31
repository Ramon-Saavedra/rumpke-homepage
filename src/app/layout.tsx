import type { Metadata } from "next";
import { Suspense } from "react";
import { Roboto, Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import CompanyTitle from "@/components/branding/companyTitle/CompanyTitle";
import Topmenu from "@/components/layout/top-menu/TopMenu";
import Footer from "@/components/layout/footer/Footer";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import PageShell from "@/components/layout/page-shell/PageShell";
import ScrollToTopButton from "@/components/ui/scroll-to-top/ScrollToTopButton";
import RouteTransitionOverlay from "@/components/layout/route-transition/RouteTransitionOverlay";
import { siteMetadata } from "@/lib/site-metadata";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import { THEME_INIT_SCRIPT } from "@/context/theme-storage";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  ...siteMetadata,
  category: "real estate",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="de"
      className={cn(
        roboto.className,
        "font-sans",
        geist.variable,
        cormorant.variable,
      )}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="antialiased">
        <Providers>
          <div className="bg-bg-l text-zinc-800 dark:bg-bg-d dark:text-foreground">
            <div>
              <Topmenu />
              <div className="lg:hidden">
                <Sidebar />
              </div>
              <PageShell>{children}</PageShell>
              <Footer />
            </div>
          </div>
          <CompanyTitle />
          <ScrollToTopButton />
          <Suspense fallback={null}>
            <RouteTransitionOverlay />
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/layout/Providers";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Header transparent />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </Providers>
  );
}

import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/scroll-top";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
      <ScrollToTop />
    </>
  );
}

import Footer from "@/components/Footer";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/utils/ThemeProvider";

export const metadata = {
  title: "Mutual Fund Platform",
  description: "Analyze & invest in mutual funds",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 transition-colors">
        
          <Navbar />
          {children}
          <Footer />
        
      </body>
    </html>
    </ThemeProvider>
  );
}

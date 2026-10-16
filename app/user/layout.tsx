import Navigation from "./components/Navigation";
import "@/app/globals.css";
import Footer from "./components/Footer";
import { DeveloperProvider } from "@/app/components/conntext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <DeveloperProvider>{children}</DeveloperProvider>
        <Footer />
      </body>
    </html>
  );
}

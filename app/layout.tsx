
import type { Metadata } from "next";
import { DeveloperProvider } from "./components/conntext";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow | Admin Panel",
  description: "Manage developers and tasks with TaskFlow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <DeveloperProvider>
          {children}
        </DeveloperProvider>
      </body>
    </html>
  );
}

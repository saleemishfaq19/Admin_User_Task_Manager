import type { ReactNode } from "react";
import Navigation from "@/app/admin/components/Navigation";
import { DeveloperProvider } from "@/app/components/conntext";

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <DeveloperProvider>
      <div className="flex min-h-screen flex-col bg-slate-950">
        <Navigation />
        <main className="flex-1">{children}</main>
      </div>
    </DeveloperProvider>
  );
}

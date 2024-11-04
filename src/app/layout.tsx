import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/lib/storeProvider";
import Sidebar from "@/ui/components/Sidebar";
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "NextJS BoilerPlate",
  description: "Plutus NextJS BoilerPlate for new NextJS projects",
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={cn(
            "w-screen h-fit grid grid-rows-[80px_1fr] gap-4 p-4 relative md:h-screen md:grid-rows-1 md:grid-cols-[340px_1fr]",
            manrope.className
          )}
        >
          <Sidebar />
          <div className="overflow-y-auto rounded-xl">{children}</div>
        </body>
      </html>
    </StoreProvider>
  );
}

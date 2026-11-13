import type { Metadata } from "next";
import "./globals.css";
import PrimeSSRProvider from "./prime-ssr-provider";
import { ThemeProvider } from "./theme-provider";

export const metadata: Metadata = {
   title: "Clarence Golez - Portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className="min-h-full flex flex-col">
            <ThemeProvider>
               <PrimeSSRProvider>{children}</PrimeSSRProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}

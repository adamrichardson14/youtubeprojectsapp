import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import Toaster from "@/components/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}

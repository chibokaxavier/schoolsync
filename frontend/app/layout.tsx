import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthGate } from "@/components/AuthGate";
import { Toaster } from "sonner";

const jamjuree = Bai_Jamjuree({
  variable: "--font-jamjuree",
  weight: ["400", "500", "600", "700", "200", "300"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SchoolSync",
  description: "Comprehensive School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jamjuree.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <AuthGate>
              {children}
            </AuthGate>
            <Toaster position="top-center" richColors />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

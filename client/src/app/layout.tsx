import type { Metadata } from "next";
import { Sintony, Poppins } from "next/font/google";
import "./globals.css";

const sintony = Sintony({ weight: "400", subsets: ["latin"] });
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sintony.className} ${poppins.className}`}>{children}</body>
    </html>
  );
}

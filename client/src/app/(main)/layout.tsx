import type { Metadata } from "next";
import { SideBar } from "../_components";
import { Sintony, Poppins } from "next/font/google";
import "../globals.css";

const sintony = Sintony({ weight: ["400"], subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eduva",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sintony.className} ${poppins.className} flex`}>
        <div className="w-64 h-screen"><SideBar /></div>
        <div className="flex-1 h-screen px-4 py-8">{children}</div>
      </body>
    </html>
  );
}

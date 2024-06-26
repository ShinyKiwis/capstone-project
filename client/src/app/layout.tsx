import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "./globals.css";
import "@mantine/tiptap/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import PageTitleProvider from "./providers/PageTitleProvider";
import { Notifications } from "@mantine/notifications";
import AuthProvider from "./providers/AuthProvider";
import { GeneralDataProvider } from "./providers/GeneralDataProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eduva",
  description: "An application for outcome-based evaluation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={inter.className}>
        <MantineProvider defaultColorScheme="light">
          <GeneralDataProvider>
            <AuthProvider>
              <ModalsProvider>
                <Notifications />
                <PageTitleProvider>{children}</PageTitleProvider>
              </ModalsProvider>
            </AuthProvider>
          </GeneralDataProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

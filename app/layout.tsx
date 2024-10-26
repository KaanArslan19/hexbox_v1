import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import "@rainbow-me/rainbowkit/styles.css";
import App from "./App";

export const metadata: Metadata = {
  title: "Hexbox",
  description: "Fund Your Campaign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

import AuthSession from "./components/AuthSession";
import Wallet from "./components/Wallet";

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
    <AuthSession>
      <Wallet>
        <html lang="en">
          <body>{children}</body>
        </html>
      </Wallet>
    </AuthSession>
  );
}

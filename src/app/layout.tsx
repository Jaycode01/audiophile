import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Audiophile - Online store for audio equipment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

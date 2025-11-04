import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/cartContext";
import CartModal from "@/components/common/cart_modal";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";

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
      <body>
        <ConvexClientProvider>
          <CartProvider>
            <CartModal />
            {children}
          </CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}

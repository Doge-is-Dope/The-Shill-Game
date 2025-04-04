import type { Metadata } from "next";
import Provider from "./provider";
import "./globals.css";
import "pixel-retroui/dist/index.css";

export const metadata: Metadata = {
  title: "AI Agent Game",
  description: "AI Agent Game 🎮",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-minecraft`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

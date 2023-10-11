import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Odyssey",
  description: "An interactive text adventure game.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

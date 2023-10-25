import "./globals.css";
import { Metadata } from "next";
import { Bitter } from "@next/font/google";

const bitter = Bitter({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin-ext"],
});

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
      <head>
        <link rel="icon" href="/icon.png" />
      </head>

      <body className={bitter.className}>{children}</body>
    </html>
  );
}

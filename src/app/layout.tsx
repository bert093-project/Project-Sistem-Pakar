import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Sistem Pakar",
  description: "Sistem Pakar Diagnosa Kerusakan Laptop/PC menggunakan Certainty Factor Berbasis Web",
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

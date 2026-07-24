import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Viviane Journey",
  description: "An invitation to step into another world.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

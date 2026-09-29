import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Musapur High School | মুছাপুর উচ্চ বিদ্যালয়",
  description: "Official portal of Musapur High School, EIIN 107335, Noakhali.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://musapurhighschool.edu.bd"),
  title: "মুছাপুর উচ্চ বিদ্যালয় | Musapur High School (EIIN: 107335, Estd: 1972)",
  description:
    "মুছাপুর উচ্চ বিদ্যালয়ের অফিশিয়াল ওয়েব পোর্টাল। নোয়াখালী, কুমিল্লা শিক্ষা বোর্ড অনুমোদিত, EIIN: 107335, বিদ্যালয় কোড: 5124। স্থাপিত: 1972।",
  keywords: [
    "Musapur High School",
    "মুছাপুর উচ্চ বিদ্যালয়",
    "EIIN 107335",
    "Noakhali School",
    "Companiganj High School",
    "Comilla Board School",
    "SSC 2026 Admission",
  ],
  authors: [{ name: "Musapur High School Administration" }],
  icons: {
    icon: "/mhs-logo.svg",
    apple: "/mhs-logo.svg",
  },
  openGraph: {
    title: "মুছাপুর উচ্চ বিদ্যালয় | Musapur High School (EIIN: 107335)",
    description:
      "অফিশিয়াল পোর্টাল: ভর্তি তথ্য, ফলাফল, নোটিশ বোর্ড ও ঐতিহাসিক ফটোগ্যালারি।",
    url: "https://musapurhighschool.edu.bd",
    siteName: "Musapur High School",
    images: [
      {
        url: "/gallery/02-academic-building-front.svg",
        width: 800,
        height: 500,
        alt: "Musapur High School Main Campus Building",
      },
    ],
    locale: "bn_BD",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}

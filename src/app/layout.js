import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: "First — Portfolio",
  description:
    "Patawee Kimhia — Full-stack and game developer portfolio. Unity games, web apps, and competition projects.",
  openGraph: {
    title: "First — Portfolio | Patawee Kimhia",
    description:
      "Full-stack & game developer building Unity games and web applications.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/mine3.jpg",
        width: 1200,
        height: 630,
        alt: "First — Patawee Kimhia portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "First — Portfolio | Patawee Kimhia",
    description:
      "Full-stack & game developer building Unity games and web applications.",
    images: ["/mine3.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

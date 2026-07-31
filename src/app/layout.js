import {
  Fragment_Mono,
  Instrument_Sans,
  Instrument_Serif,
  Inter,
  Noto_Serif_Balinese,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

// Nivora uses Fragment Mono for micro-labels and Noto Serif Balinese for the
// oversized project names in its hover list.
const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const notoSerifBalinese = Noto_Serif_Balinese({
  variable: "--font-noto-serif-balinese",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
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
      className={`${inter.variable} ${instrumentSans.variable} ${instrumentSerif.variable} ${fragmentMono.variable} ${notoSerifBalinese.variable} h-full antialiased dark`}
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

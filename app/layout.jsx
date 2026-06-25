import { Archivo, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://thermalr.com"),
  title: "ThermalR — Sustainable Mobility, Engineered",
  description:
    "ThermalR Industries (PVT) Ltd develops sustainable energy and transportation — electric motorbikes, e-bicycles and PowerBox systems. Cost-efficient, eco-friendly and convenient mobility.",
  keywords: [
    "ThermalR",
    "electric vehicles",
    "e-motorbike",
    "e-bicycle",
    "PowerBox",
    "sustainable mobility",
    "EV Sri Lanka",
  ],
  openGraph: {
    title: "ThermalR — Sustainable Mobility, Engineered",
    description:
      "Pioneering electric vehicles and integrated transportation systems for a cleaner future.",
    type: "website",
  },
  icons: { icon: "/logo.png" },
};

export const viewport = {
  themeColor: "#060608",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${manrope.variable} ${spaceMono.variable}`}
    >
      <body className="grain bg-ink text-cream antialiased">{children}</body>
    </html>
  );
}

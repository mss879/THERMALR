"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import MarqueeBand from "@/components/sections/MarqueeBand";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import WhyChoose from "@/components/sections/WhyChoose";
import VisionMission from "@/components/sections/VisionMission";
import CostBars from "@/components/sections/CostBars";
import Team from "@/components/sections/Team";
import CSR from "@/components/sections/CSR";
import Journal from "@/components/sections/Journal";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <About />
        <Products />
        <FeatureShowcase />
        <WhyChoose />
        <VisionMission />
        <CostBars />
        <Team />
        <CSR />
        <Journal />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

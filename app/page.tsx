import { Metadata } from "next"
import { Navbar } from "@/components/marketing/Navbar"
import { HeroSection } from "@/components/marketing/HeroSection"
import { HowItWorks } from "@/components/marketing/HowItWorks"
import { FeaturesBento } from "@/components/marketing/FeaturesBento"
import { FeatureRows } from "@/components/marketing/FeatureRows"
import { Testimonials } from "@/components/marketing/Testimonials"
import { PricingSection } from "@/components/marketing/PricingSection"
import { FinalCTA } from "@/components/marketing/FinalCTA"
import { Footer } from "@/components/marketing/Footer"
import { SchemaLabJsonLd } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: "SchemaLab — Visual Database Schema Designer | Free",
}

export default function LandingPage() {
  return (
    <div className="page-bg min-h-screen flex flex-col overflow-x-hidden">
      <SchemaLabJsonLd />
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <HeroSection />
        <div className="w-full max-w-7xl mx-auto">
          <div className="mx-auto w-4/5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <HowItWorks />
        <div className="w-full max-w-7xl mx-auto">
          <div className="mx-auto w-4/5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <FeaturesBento />
        <FeatureRows />
        <div className="w-full max-w-7xl mx-auto">
          <div className="mx-auto w-4/5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <Testimonials />
        <div className="w-full max-w-7xl mx-auto">
          <div className="mx-auto w-4/5 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

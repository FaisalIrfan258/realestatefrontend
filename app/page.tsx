import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import PropertyCarousel from "@/components/property/property-carousel";
import ContactForm from "@/components/contact/contact-form";
import { getProperties } from "@/lib/api";
import HeroSection from "@/components/sections/hero-section";
import FeaturesSection from "@/components/sections/features-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import StatsSection from "@/components/sections/stats-section";
import AboutSection from "@/components/sections/about-section";
import CTASection from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: 'Nasir Property Consultant | Find Your Dream Property',
  description: 'Find your dream property with Nasir Property Consultant. We offer premium real estate services for residential and commercial properties.',
};

export default async function Home() {
  const propertiesData = await getProperties();
  const featuredProperties = propertiesData?.properties?.slice(0, 6) || [];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Properties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties that offer exceptional value and features
            </p>
          </div>

          <PropertyCarousel properties={featuredProperties} />

          <div className="text-center mt-10">
            <Button asChild size="lg">
              <Link href="/properties">View All Properties</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Get In Touch</h2>
              <p className="text-muted-foreground">
                Have questions about a property or need assistance? Contact us today!
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
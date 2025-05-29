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
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Get In Touch</h2>
            <p className="text-muted-foreground">
              Have questions about a property or need assistance? Contact us today!
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
              <ContactForm />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Visit Our Office</h2>
              <p className="text-muted-foreground mb-6 md:mb-8">
                We'd love to meet you in person to discuss your real estate needs. Our office is conveniently located in the heart of the city.
              </p>
              <div className="rounded-lg overflow-hidden shadow-lg h-[300px] md:h-[400px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.687208555019!2d67.0733218!3d24.840368299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33dbad9ea1c75%3A0xda0ffa97cc367018!2sNasir%20Property%20Consultant!5e0!3m2!1sen!2s!4v1747983643518!5m2!1sen!2s" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
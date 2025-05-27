import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, Award, Building, UserCheck, MapPin, Clock } from "lucide-react";
import "../styles/timeline.css";

export const metadata: Metadata = {
  title: 'About Us | Nasir Property Consultant',
  description: 'Learn about Nasir Property Consultant, our mission, values, and dedicated team of real estate professionals.',
};

export default function AboutPage() {
 

  const milestones = [
    {
      year: "2015",
      title: "Company Founded",
      description: "Nasir Property Consultant was established with a focus on residential properties.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      year: "2020",
      title: "Expansion to Commercial",
      description: "Extended services to include commercial properties and investment consulting.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    },
    {
      year: "2025",
      title: "Digital Transformation",
      description: "Launched our online platform to better serve clients with virtual property tours.",
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80"
    },
    
  ];

  const values = [
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: "Client-Centered",
      description: "We put our clients first, listening to their needs and working tirelessly to exceed expectations."
    },
    {
      icon: <Award className="h-10 w-10 text-primary" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our service, from property selection to transaction completion."
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Expertise",
      description: "Our team of professionals brings deep market knowledge and industry expertise to every client interaction."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Integrity",
      description: "We operate with honesty and transparency, building trust and long-lasting relationships with our clients."
    }
  ];

  return (
    <div className="pt-24 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20  dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Nasir Property Consultant</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Your trusted partner in finding the perfect property. We've been helping clients achieve their real estate goals since 2008.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/properties">
                    View Properties
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
                  alt="Nasir Property Consultant Office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Nasir Property Consultant was founded in 2015 by Nasir Ahmed, a visionary real estate professional with a passion for helping people find their ideal properties. What started as a small consultancy has grown into a trusted name in the real estate industry.
            </p>
            <p className="text-muted-foreground">
              Our journey has been defined by a commitment to excellence, integrity, and personalized service. Over the years, we've helped thousands of clients—from first-time homebuyers to seasoned investors—navigate the complex real estate market and find properties that meet their unique needs and aspirations.
            </p>
          </div>

          {/* Timeline */}
          <div className="hidden md:block relative max-w-6xl mx-auto mt-20">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary" />
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="timeline-item timeline-item-desktop relative flex items-center mb-24 last:mb-0"
              >
                <div className="flex w-full items-center">
                  {/* Left side */}
                  <div className="w-1/2 pr-12">
                    <div className="text-right">
                      <span className="inline-block bg-primary text-white text-sm py-1 px-3 rounded-full mb-2">{milestone.year}</span>
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground mb-4">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900 shadow-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  
                  {/* Right side */}
                  <div className="w-1/2 pl-12">
                    <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden relative max-w-md mx-auto mt-12">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-primary" />
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className="timeline-item timeline-item-mobile relative pl-16 mb-12 last:mb-0"
              >
                <div className="absolute left-[13px] w-3 h-3 bg-primary rounded-full" />
                <div className="absolute left-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg mb-4">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="inline-block bg-primary text-white text-sm py-1 px-3 rounded-full mb-2">{milestone.year}</span>
                <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                <p className="text-muted-foreground">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and define our approach to real estate consulting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Office</h2>
              <p className="text-muted-foreground mb-6">
                We'd love to meet you in person to discuss your real estate needs. Our main office is conveniently located in the heart of the city.
              </p>
              
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Nasir Property Consultant</p>
                    <p className="text-muted-foreground">Plot no. 149, street 04, sector C, Akhtar colony Karachi</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="h-7 w-7 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Nasir Property Consultant</p>
                    <p className="text-muted-foreground">Plot no. 05, street No. 02, sector B, main double road Akhtar colony DHA phase 1 Karachi near Nadra mega center.</p>
                  </div>
                </div>  
              
              
              <Button asChild size="lg">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
                alt="Nasir Property Consultant Office"
                width={800}
                height={450}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Perfect Property?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Our team of experts is ready to help you navigate the real estate market and find the perfect property.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" variant="outline" className="border-black text-black hover:text-primary dark:bg-white dark:text-black dark:hover:bg-gray-100">
              <Link href="/properties">
                Browse Properties
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-100">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AboutSection = () => {
  const benefits = [
    "Premium property listings",
    "Expert market knowledge",
    "Personalized service",
    "Transparent pricing",
    "Dedicated support",
    "Hassle-free transactions"
  ];

  return (
    <section className="py-20 overflow-hidden dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                alt="Nasir Property Consultants"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary text-white dark:text-black p-6 rounded-lg shadow-lg">
              <p className="text-3xl font-bold">15+</p>
              <p className="text-sm uppercase tracking-wider">Years Experience</p>
            </div>
          </div>

          {/* Content Column */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About <span className="text-primary">Nasir Property</span> Consultant
            </h2>
            
            <p className="text-muted-foreground mb-6 dark:text-white">
              Founded with a vision to transform the real estate experience, Nasir Property Consultant has been a trusted name in the industry for over 15 years. We specialize in helping our clients find their dream properties and make sound investment decisions.
            </p>
            
            <p className="text-muted-foreground mb-8 dark:text-white">
              Our team of experienced professionals is dedicated to providing personalized service, market insights, and seamless transactions. We understand that property decisions are significant life choices, and we're committed to guiding you every step of the way.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg">
              <Link href="/about">
                Learn More About Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
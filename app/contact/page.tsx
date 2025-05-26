import { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "@/components/contact/contact-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger  } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: 'Contact Us | Nasir Property Consultant',
  description: 'Get in touch with Nasir Property Consultant. We are here to help you with all your real estate needs.',
};

export default function ContactPage() {
  const faqItems = [
    {
      question: "What areas do you serve?",
      answer: "We provide real estate services across major metropolitan areas and surrounding suburbs. Our team has extensive knowledge of local markets and can assist you no matter where you're looking to buy, sell, or rent property."
    },
    {
      question: "How do I schedule a property viewing?",
      answer: "You can schedule a property viewing by contacting us through our website, giving us a call, or sending an email. Our team will coordinate with you to find a convenient time for the viewing and provide you with all the necessary details."
    },
    {
      question: "What documents do I need when buying a property?",
      answer: "When buying a property, you'll typically need identification documents, proof of income, bank statements, and documentation of your assets and liabilities. Our team will guide you through the specific requirements based on your situation and the property you're interested in."
    },
    {
      question: "Do you offer virtual property tours?",
      answer: "Yes, we offer virtual property tours for clients who are unable to visit properties in person. Our virtual tours provide a comprehensive view of the property, allowing you to make informed decisions from anywhere in the world."
    }
  ];

  return (
    <div className="min-h-screen pt-24 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Contact Us</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help you with all your real estate needs.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <ContactInfoCard 
              icon={<MapPin className="h-6 w-6 md:h-8 md:w-8 text-primary" />}
              title="Our Location"
              content={<>Plot no. 149, street 04, sector C, Akhtar colony Karachi</>}
            />
            <ContactInfoCard 
              icon={<Phone className="h-6 w-6 md:h-8 md:w-8 text-primary" />}
              title="Phone"
              content={<>+92 318 2636767</>}
            />
            <ContactInfoCard 
              icon={<Mail className="h-6 w-6 md:h-8 md:w-8 text-primary" />}
              title="Email"
              content={<>contact@nasirproperty-<br />-consultant.com</>}
            />
            <ContactInfoCard 
              icon={<Clock className="h-6 w-6 md:h-8 md:w-8 text-primary" />}
              title="Office Hours"
              content={<>Mon-Sat: 9am - 6pm<br />Sun: Closed</>}
            />
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-6 md:mb-8">
                Fill out the form below and our team will get back to you as soon as possible. We're looking forward to hearing from you!
              </p>
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

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to commonly asked questions about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6">
              <Accordion type="single" collapsible>
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

function ContactInfoCard({ icon, title, content }: ContactInfoCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="mx-auto mb-4 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-primary/10 rounded-full">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{title}</h3>
      <p className="text-muted-foreground text-sm md:text-base">{content}</p>
    </div>
  );
}
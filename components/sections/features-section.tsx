import { HomeIcon, Building, Search, Clock, Shield, HeartHandshake } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <HomeIcon className="h-10 w-10 text-primary" />,
      title: "Wide Property Selection",
      description: "Access to a diverse portfolio of residential and commercial properties to suit every need and budget."
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      title: "Premium Locations",
      description: "Carefully curated properties in prime locations with excellent amenities and investment potential."
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Expert Market Analysis",
      description: "In-depth market insights and property valuations to help you make informed decisions."
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Efficient Process",
      description: "Streamlined buying, selling, and renting process designed to save you time and reduce stress."
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Trusted Transactions",
      description: "Secure and transparent transactions with complete documentation and legal assistance."
    },
    {
      icon: <HeartHandshake className="h-10 w-10 text-primary" />,
      title: "Personalized Service",
      description: "Dedicated property consultants who understand your needs and provide tailored solutions."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto dark:text-white">
            Discover the advantages of working with Nasir Property Consultant and how we ensure an exceptional property experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground dark:text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
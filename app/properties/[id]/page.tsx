import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ContactForm from "@/components/contact/contact-form";
import { getPropertyById, getProperties } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Bed, Bath, Square as SquareFoot, MapPin, Home, Calendar, Share2, Heart } from "lucide-react";
import PropertyGallery from "@/components/property/property-gallery";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const propertiesData = await getProperties();
  
  if (!propertiesData || !propertiesData.properties) {
    return [];
  }
  
  return propertiesData.properties.map((property) => ({
    id: property._id,
  }));
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const propertyData = await getPropertyById(params.id);
  const property = propertyData?.property;

  if (!property) {
    return {
      title: 'Property Not Found | Nasir Property Consultant',
      description: 'The requested property could not be found.',
    };
  }

  return {
    title: `${property.title} | Nasir Property Consultant`,
    description: property.description,
  };
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const propertyData = await getPropertyById(params.id);
  const property = propertyData?.property;

  if (!property) {
    notFound();
  }

  const {
    title,
    description,
    price,
    location,
    category,
    bedrooms,
    bathrooms,
    area,
    amenities,
    images,
    videos,
    createdAt
  } = property;

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const defaultImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80";
  const propertyImages = images && images.length > 0 ? images : [defaultImage];

  return (
    <div className="pt-24">
      {/* Property Title Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link href="/properties" className="text-primary hover:underline">Properties</Link>
                <span>/</span>
                <span className="text-muted-foreground">{category}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{location}</span>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-2">
              <div className="text-3xl font-bold text-primary">{formatCurrency(price)}</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Heart className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Gallery */}
              <PropertyGallery images={propertyImages} videos={videos || []} />

              {/* Property Features */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <FeatureCard icon={<Home className="h-5 w-5 text-primary" />} title="Type" value={category} />
                <FeatureCard icon={<Bed className="h-5 w-5 text-primary" />} title="Bedrooms" value={bedrooms.toString()} />
                <FeatureCard icon={<Bath className="h-5 w-5 text-primary" />} title="Bathrooms" value={bathrooms.toString()} />
                <FeatureCard icon={<SquareFoot className="h-5 w-5 text-primary" />} title="Area" value={area} />
              </div>

              {/* Property Description */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground whitespace-pre-line">{description}</p>
              </div>

              {/* Property Details */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Property Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DetailItem label="Property ID" value={params.id.substring(0, 8)} />
                  <DetailItem label="Property Type" value={category} />
                  <DetailItem label="Bedrooms" value={bedrooms.toString()} />
                  <DetailItem label="Bathrooms" value={bathrooms.toString()} />
                  <DetailItem label="Area" value={area} />
                  <DetailItem label="Location" value={location} />
                  <DetailItem label="Listed Date" value={formattedDate} />
                </div>
              </div>

              {/* Amenities */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-primary rounded-full" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                  {/* This would be replaced with an actual map component or embed */}
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-muted-foreground">Map will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Form */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Interested in this property?</h3>
                <p className="text-muted-foreground mb-6">
                  Fill out the form below and our agent will get back to you as soon as possible.
                </p>
                <ContactForm propertyName={title} />
              </Card>

              {/* Agent Information */}
              <Card className="p-6 mt-6">
                <h3 className="text-xl font-bold mb-4">Property Agent</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden relative">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
                      alt="Agent"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">Nasir Ahmed</h4>
                    <p className="text-sm text-muted-foreground">Senior Property Consultant</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span> +92 318 2636767
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span> nasir@nasirpropertyconsultant.com
                  </p>
                </div>
                <Button className="w-full mt-4">Contact Agent</Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Similar Properties</h2>
          <p className="text-center text-muted-foreground mb-6">
            Explore other properties that might interest you
          </p>
          <div className="flex justify-center mt-6">
            <Button asChild size="lg">
              <Link href="/properties">
                View All Properties
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function FeatureCard({ icon, title, value }: FeatureCardProps) {
  return (
    <Card className="p-4 flex flex-col items-center text-center">
      <div className="mb-2">{icon}</div>
      <span className="text-sm text-muted-foreground">{title}</span>
      <span className="font-semibold">{value}</span>
    </Card>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="flex justify-between p-3 border-b border-gray-200 dark:border-gray-700">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
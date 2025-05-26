import { Metadata } from "next";
import PropertyCard from "@/components/property/property-card";
import PropertyFilter from "@/components/property/property-filter";
import { Button } from "@/components/ui/button";
import { getProperties } from "@/lib/api";
import { Building } from "lucide-react";

export const metadata: Metadata = {
  title: 'Properties | Nasir Property Consultant',
  description: 'Explore our extensive collection of residential and commercial properties. Find your dream property with Nasir Property Consultant.',
};

interface PropertiesPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    category?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    amenities?: string;
  };
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  // Parse and validate search params
  const page = parseInt(searchParams.page || "1");
  const limit = parseInt(searchParams.limit || "9");
  
  // Fetch properties with filters
  const propertiesData = await getProperties({
    page,
    limit,
    category: searchParams.category || "",
    location: searchParams.location || "",
    minPrice: searchParams.minPrice || "",
    maxPrice: searchParams.maxPrice || "",
    bedrooms: searchParams.bedrooms || "",
    bathrooms: searchParams.bathrooms || "",
    amenities: searchParams.amenities || "",
  });

  const properties = propertiesData?.properties || [];
  const totalPages = propertiesData?.totalPages || 1;
  const currentPage = propertiesData?.currentPage || 1;

  return (
    <div className="pt-24 dark:bg-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Explore Our Properties</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Find your dream property from our extensive collection of residential and commercial listings
          </p>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <PropertyFilter searchParams={searchParams} />
            </div>

            {/* Properties Grid */}
            <div className="lg:col-span-3">
              {properties.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="mt-12 flex justify-center">
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? "default" : "outline"}
                          size="sm"
                          asChild
                        >
                          <a
                            href={`/properties?page=${pageNum}${
                              searchParams.category ? `&category=${searchParams.category}` : ""
                            }${searchParams.location ? `&location=${searchParams.location}` : ""}${
                              searchParams.minPrice ? `&minPrice=${searchParams.minPrice}` : ""
                            }${searchParams.maxPrice ? `&maxPrice=${searchParams.maxPrice}` : ""}${
                              searchParams.bedrooms ? `&bedrooms=${searchParams.bedrooms}` : ""
                            }${
                              searchParams.bathrooms ? `&bathrooms=${searchParams.bathrooms}` : ""
                            }${
                              searchParams.amenities ? `&amenities=${searchParams.amenities}` : ""
                            }`}
                          >
                            {pageNum}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
                  <Building className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Properties Found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any properties matching your criteria. Please try adjusting your filters.
                  </p>
                  <Button asChild>
                    <a href="/properties">Clear All Filters</a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
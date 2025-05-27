import type { Metadata } from "next"
import PropertyCard from "@/components/property/property-card"
import PropertyFilter from "@/components/property/property-filter"
import { Button } from "@/components/ui/button"
import { getProperties } from "@/lib/api"
import { Building } from "lucide-react"

export const metadata: Metadata = {
  title: "Properties | Nasir Property Consultant",
  description:
    "Explore our extensive collection of residential and commercial properties. Find your dream property with Nasir Property Consultant.",
}

type SearchParams = {
  page?: string
  limit?: string
  category?: string
  location?: string
  minPrice?: string
  maxPrice?: string
  bedrooms?: string
  bathrooms?: string
  amenities?: string
}

interface PropertiesPageProps {
  searchParams: Promise<SearchParams>
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams

  // Parse search parameters with defaults
  const page = Number.parseInt(resolvedSearchParams.page || "1", 10)
  const limit = Number.parseInt(resolvedSearchParams.limit || "9", 10)
  const category = resolvedSearchParams.category || ""
  const location = resolvedSearchParams.location || ""
  const minPrice = resolvedSearchParams.minPrice || ""
  const maxPrice = resolvedSearchParams.maxPrice || ""
  const bedrooms = resolvedSearchParams.bedrooms || ""
  const bathrooms = resolvedSearchParams.bathrooms || ""
  const amenities = resolvedSearchParams.amenities || ""

  try {
    // Fetch properties with filters
    const propertiesData = await getProperties({
      page,
      limit,
      category,
      location,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      amenities,
    })

    const properties = propertiesData?.properties || []
    const totalPages = propertiesData?.totalPages || 1
    const currentPage = propertiesData?.currentPage || 1

    // Helper function to build pagination URL
    const buildPaginationUrl = (pageNum: number) => {
      const params = new URLSearchParams()
      params.set("page", pageNum.toString())

      if (category) params.set("category", category)
      if (location) params.set("location", location)
      if (minPrice) params.set("minPrice", minPrice)
      if (maxPrice) params.set("maxPrice", maxPrice)
      if (bedrooms) params.set("bedrooms", bedrooms)
      if (bathrooms) params.set("bathrooms", bathrooms)
      if (amenities) params.set("amenities", amenities)

      return `/properties?${params.toString()}`
    }

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
                <PropertyFilter searchParams={resolvedSearchParams} />
              </div>

              {/* Properties Grid */}
              <div className="lg:col-span-3">
                {properties.length > 0 ? (
                  <>
                    <div className="mb-6">
                      <p className="text-muted-foreground">
                        Showing {properties.length} of {propertiesData?.total || 0} properties
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="mt-12 flex justify-center">
                        <div className="flex gap-2">
                          {/* Previous button */}
                          {currentPage > 1 && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={buildPaginationUrl(currentPage - 1)}>Previous</a>
                            </Button>
                          )}

                          {/* Page numbers */}
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <Button
                              key={pageNum}
                              variant={pageNum === currentPage ? "default" : "outline"}
                              size="sm"
                              asChild
                            >
                              <a href={buildPaginationUrl(pageNum)}>{pageNum}</a>
                            </Button>
                          ))}

                          {/* Next button */}
                          {currentPage < totalPages && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={buildPaginationUrl(currentPage + 1)}>Next</a>
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
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
    )
  } catch (error) {
    console.error("Error fetching properties:", error)

    return (
      <div className="pt-24 dark:bg-gray-800">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
              <Building className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
              <p className="text-muted-foreground mb-6">
                We're having trouble loading the properties. Please try again later.
              </p>
              <Button asChild>
                <a href="/properties">Refresh Page</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

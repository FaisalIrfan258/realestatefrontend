import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square as SquareFoot, MapPin } from "lucide-react";
import { Property } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const {
    _id,
    title,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    images,
    category
  } = property;

  const defaultImage = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80";
  const propertyImage = images && images.length > 0 ? images[0] : defaultImage;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]">
      {/* Property Category Tag */}
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            {category}
          </span>
        </div>
        
        {/* Property Image */}
        <Link href={`/properties/${_id}`}>
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={propertyImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </Link>
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatCurrency(price)}
            </span>
          </div>
        </div>
        
        <Link href={`/properties/${_id}`} className="hover:text-primary transition-colors">
          <h3 className="text-lg font-semibold mb-3 line-clamp-1">{title}</h3>
        </Link>
        
        <div className="flex items-center mb-4 text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm line-clamp-1">{location}</span>
        </div>

        {/* Property Features */}
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center text-muted-foreground">
            <Bed className="h-4 w-4 mr-1" />
            <span className="text-sm">{bedrooms} Beds</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Bath className="h-4 w-4 mr-1" />
            <span className="text-sm">{bathrooms} Baths</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <SquareFoot className="h-4 w-4 mr-1" />
            <span className="text-sm">{area}</span>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-6">
          <Button asChild className="w-full">
            <Link href={`/properties/${_id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
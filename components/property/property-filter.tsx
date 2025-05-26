"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Check, X } from "lucide-react";

interface PropertyFilterProps {
  searchParams: {
    category?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    amenities?: string;
  };
}

export default function PropertyFilter({ searchParams }: PropertyFilterProps) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: searchParams.category || "all",
    location: searchParams.location || "all",
    minPrice: searchParams.minPrice || "",
    maxPrice: searchParams.maxPrice || "",
    bedrooms: searchParams.bedrooms || "any",
    bathrooms: searchParams.bathrooms || "any",
    amenities: searchParams.amenities?.split(",") || [],
  });

  const [priceRange, setPriceRange] = useState<number[]>([
    parseInt(searchParams.minPrice || "0"),
    parseInt(searchParams.maxPrice || "1000000"),
  ]);

  const amenitiesList = [
    "Swimming Pool", 
    "Gym", 
    "Parking", 
    "Security", 
    "Garden", 
    "Elevator", 
    "Balcony",
    "Air Conditioning",
    "Furnished"
  ];

  const categoryOptions = [
    "All Categories",
    "Apartment",
    "House",
    "Villa",
    "Commercial",
    "Land",
  ];

  const locationOptions = [
    "All Locations",
    "Downtown",
    "Suburban",
    "Beachfront",
    "Mountain View",
    "Countryside",
  ];

  const handleAmenityToggle = (amenity: string) => {
    setFilters((prev) => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity];
      
      return {
        ...prev,
        amenities: newAmenities,
      };
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    setFilters((prev) => ({
      ...prev,
      minPrice: values[0].toString(),
      maxPrice: values[1].toString(),
    }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.category && filters.category !== "all") {
      params.set("category", filters.category);
    }
    
    if (filters.location && filters.location !== "all") {
      params.set("location", filters.location);
    }
    
    if (filters.minPrice) {
      params.set("minPrice", filters.minPrice);
    }
    
    if (filters.maxPrice) {
      params.set("maxPrice", filters.maxPrice);
    }
    
    if (filters.bedrooms && filters.bedrooms !== "any") {
      params.set("bedrooms", filters.bedrooms);
    }
    
    if (filters.bathrooms && filters.bathrooms !== "any") {
      params.set("bathrooms", filters.bathrooms);
    }
    
    if (filters.amenities.length > 0) {
      params.set("amenities", filters.amenities.join(","));
    }
    
    router.push(`/properties?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      location: "all",
      minPrice: "",
      maxPrice: "",
      bedrooms: "any",
      bathrooms: "any",
      amenities: [],
    });
    setPriceRange([0, 1000000]);
    router.push("/properties");
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filter Properties</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetFilters}
          className="text-muted-foreground hover:text-foreground dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <X className="h-4 w-4 mr-1" /> Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select
            value={filters.category}
            onValueChange={(value) => setFilters({ ...filters, category: value })}
          >
            <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
              {categoryOptions.map((category) => (
                <SelectItem key={category} value={category === "All Categories" ? "all" : category} className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Location</label>
          <Select
            value={filters.location}
            onValueChange={(value) => setFilters({ ...filters, location: value })}
          >
            <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
              {locationOptions.map((location) => (
                <SelectItem key={location} value={location === "All Locations" ? "all" : location} className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <div className="pt-4 pb-2 px-1">
            <Slider
              min={0}
              max={1000000}
              step={10000}
              value={priceRange}
              onValueChange={handlePriceRangeChange}
              className="mb-6 bg-gray-100 dark:bg-gray-800"

            />
          </div>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-xs text-muted-foreground mb-1">Min Price</label>
              <Input
                type="number"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                placeholder="Min"
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs text-muted-foreground mb-1">Max Price</label>
              <Input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                placeholder="Max"
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Bedrooms</label>
          <Select
            value={filters.bedrooms}
            onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
          >
            <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
              <SelectItem value="any" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">Any</SelectItem>
              <SelectItem value="1" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">1+</SelectItem>
              <SelectItem value="2" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">2+</SelectItem>
              <SelectItem value="3" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">3+</SelectItem>
              <SelectItem value="4" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">4+</SelectItem>
              <SelectItem value="5" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Bathrooms Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Bathrooms</label>
          <Select
            value={filters.bathrooms}
            onValueChange={(value) => setFilters({ ...filters, bathrooms: value })}
          >
            <SelectTrigger className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800 dark:text-white dark:border-gray-700">
              <SelectItem value="any" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">Any</SelectItem>
              <SelectItem value="1" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">1+</SelectItem>
              <SelectItem value="2" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">2+</SelectItem>
              <SelectItem value="3" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">3+</SelectItem>
              <SelectItem value="4" className="dark:bg-gray-800 dark:text-white dark:border-gray-700">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Amenities Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Amenities</label>
          <div className="grid grid-cols-1 gap-2">
            {amenitiesList.map((amenity) => (
              <div
                key={amenity}
                className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleAmenityToggle(amenity)}
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                  filters.amenities.includes(amenity) 
                    ? "bg-primary border-primary text-primary-foreground" 
                    : "border-gray-300 dark:border-gray-600"
                }`}>
                  {filters.amenities.includes(amenity) && <Check className="h-3 w-3" />}
                </div>
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
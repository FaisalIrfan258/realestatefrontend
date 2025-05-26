// Type definitions for API responses
export type Property = {
  _id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  videos: string[];
  createdAt: string;
  updatedAt: string;
};

export type PropertiesResponse = {
  success: boolean;
  count: number;
  total: number;
  totalPages: number;
  currentPage: number;
  properties: Property[];
};

export type PropertyResponse = {
  success: boolean;
  property: Property;
};

export type ContactFormData = {
  propertyName?: string;
  name: string;
  phone: string;
  message: string;
};

// API base URL - Using empty string for Next.js API routes
const API_BASE_URL = "https://6nh44dlchh.execute-api.us-east-1.amazonaws.com";

// Fetch all properties with optional filters
export async function getProperties(filters?: Record<string, string | number>) {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString() ? `?${queryParams.toString()}` : "";
    const response = await fetch(`${API_BASE_URL}/api/properties${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Revalidate data every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }

    const data: PropertiesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return null;
  }
}

// Fetch single property by ID
export async function getPropertyById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/properties/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Revalidate data every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }

    const data: PropertyResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

// Submit contact form
export async function submitContactForm(formData: ContactFormData) {
  // Mock implementation for testing purposes
  console.log("Form submitted:", formData);
  
  // Simulate API call with a delay
  return new Promise<{success: boolean, message: string}>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Form submitted successfully",
      });
    }, 500);
  });
}
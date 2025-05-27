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

export type ChatbotMessage = {
  message: string;
  sessionId?: string;
};

export type ChatbotResponse = {
  success: boolean;
  sessionId: string;
  message: string;
};

export type ChatHistoryResponse = {
  success: boolean;
  history: {
    user: string;
    bot: string;
    timestamp: string;
  }[];
};

// API base URL - Using empty string for Next.js API routes
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


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
  try {
    console.log("Submitting form data:", formData);
    
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log("API response status:", response.status);
    
    // Parse the JSON response
    const data = await response.json();
    console.log("API response data:", data);
    
    // Return the exact response from the API
    return data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: "Failed to submit form",
    };
  }
}

// Send message to chatbot
export async function sendChatbotMessage(messageData: ChatbotMessage) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chatbot/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error("Failed to send message to chatbot");
    }

    const data: ChatbotResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message to chatbot:", error);
    return {
      success: false,
      sessionId: "",
      message: "Failed to connect to chatbot service",
    };
  }
}

// Get chatbot conversation history
export async function getChatbotHistory(sessionId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chatbot/history/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch chatbot history");
    }

    const data: ChatHistoryResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching chatbot history:", error);
    return {
      success: false,
      history: [],
    };
  }
}

// Clear chatbot conversation history
export async function clearChatbotHistory(sessionId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chatbot/history/${sessionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to clear chatbot history");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error clearing chatbot history:", error);
    return {
      success: false,
      message: "Failed to clear chat history",
    };
  }
}
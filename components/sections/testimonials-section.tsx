import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ayesha Khan",
      position: "Homeowner",
      rating: 5,
      quote: "Nasir Property Consultant helped us find our perfect home. They understood what we wanted and made the process very easy. We are very happy with their service."
    },
    {
      id: 2,
      name: "Imran Ahmed",
      position: "Property Investor",
      rating: 5,
      quote: "As an investor, I trust Nasir Property for their market knowledge. They helped me buy several good properties. I recommend them to everyone looking to invest."
    },
    {
      id: 3,
      name: "Fatima Malik",
      position: "First-time Buyer",
      rating: 5,
      quote: "I was nervous about buying my first home. Nasir Property team explained everything clearly and helped me through each step. Now I have my own home thanks to them."
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience working with Nasir Property Consultant
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400 dark:text-amber-300 dark:fill-amber-300" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
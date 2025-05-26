const StatsSection = () => {
  const stats = [
    { value: "500+", label: "Properties Sold" },
    { value: "1,200+", label: "Happy Clients" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" }
  ];

  return (
    <section className="py-16 bg-primary text-white  dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <p className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</p>
              <p className="text-lg opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
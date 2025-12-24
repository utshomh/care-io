import { Baby, PersonStanding, Stethoscope } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Baby Care",
    icon: <Baby size={32} />,
    desc: "Expert babysitters for infants and toddlers.",
  },
  {
    id: 2,
    title: "Elderly Service",
    icon: <PersonStanding size={32} />,
    desc: "Compassionate assistance for senior citizens.",
  },
  {
    id: 3,
    title: "Sick People Service",
    icon: <Stethoscope size={32} />,
    desc: "Specialized nursing and medical support at home.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-base-200 rounded-xl py-16">
      <div className="px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Our Specialized Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className="card bg-base-100 border-t-4 border-primary"
            >
              <div className="card-body items-center text-center">
                <div className="p-4 bg-primary/10 rounded-full text-primary mb-2">
                  {s.icon}
                </div>
                <h3 className="card-title">{s.title}</h3>
                <p>{s.desc}</p>
                <div className="card-actions mt-4">
                  <button className="btn btn-primary">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

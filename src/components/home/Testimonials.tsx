import { Star, Users, Briefcase, Award } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-base-100">
      {/* Metrics Header */}
      <div className="stats grid grid-cols-1 lg:grid-cols-3 bg-primary text-primary-content">
        <div className="stat place-items-center">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-title text-primary-content/70">
            Happy Families
          </div>
          <div className="stat-value text-white">2,500+</div>
        </div>
        <div className="stat place-items-center border-x-secondary/20">
          <div className="stat-icon">
            <Briefcase />
          </div>
          <div className="stat-title text-primary-content/70">Caregivers</div>
          <div className="stat-value text-white">450+</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-icon">
            <Award />
          </div>
          <div className="stat-title text-primary-content/70">Rating</div>
          <div className="stat-value text-white">4.9/5</div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-2">
              <Image
                width={200}
                height={200}
                src="https://i.pravatar.cc/100?img=1"
                alt="user"
              />
            </div>
          </div>
          <div className="chat-bubble chat-bubble-primary">
            &quot;The babysitter we found through Care.IO was amazing. She was
            punctual and my kids loved her!&quot;
          </div>
          <div className="chat-footer opacity-50 flex gap-1 mt-1 text-xs">
            John Doe <Star size={12} className="fill-warning text-warning" />{" "}
            5.0
          </div>
        </div>

        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-2">
              <Image
                width={200}
                height={200}
                src="https://i.pravatar.cc/100?img=2"
                alt="user"
              />
            </div>
          </div>
          <div className="chat-bubble chat-bubble-primary text-white">
            &quot;Finding a nurse for my father was so stressful until I found
            this platform. Highly recommended.&quot;
          </div>
          <div className="chat-footer opacity-50 flex gap-1 mt-1 text-xs">
            Jane Doe <Star size={12} className="fill-warning text-warning" />{" "}
            5.0
          </div>
        </div>
      </div>
    </section>
  );
}

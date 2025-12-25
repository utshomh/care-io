import { Star, Users, Briefcase, Award } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-base-100 space-y-6">
      {/* Metrics Header */}
      <div className="stats grid grid-cols-1 lg:grid-cols-3 bg-primary text-white">
        <div className="stat place-items-center">
          <div className="stat-icon">
            <Users />
          </div>
          <div className="stat-title text-white/90 text-base">
            Happy Families
          </div>
          <div className="stat-value">2,500+</div>
        </div>
        <div className="stat place-items-center border-x-secondary/20">
          <div className="stat-icon">
            <Briefcase />
          </div>
          <div className="stat-title text-white/90 text-base">Caregivers</div>
          <div className="stat-value">450+</div>
        </div>
        <div className="stat place-items-center">
          <div className="stat-icon">
            <Award />
          </div>
          <div className="stat-title text-white/90 text-base">Rating</div>
          <div className="stat-value">4.9/5</div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="chat chat-start space-y-1">
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
          <div className="chat-bubble chat-bubble-primary text-white">
            &quot;The babysitter we found through Care.IO was amazing. She was
            punctual and my kids loved her!&quot;
          </div>
          <div className="chat-footer opacity-50 flex items-center gap-1 text-xs">
            John Doe <Star className="w-3 h-3 fill-warning text-warning" /> 5.0
          </div>
        </div>

        <div className="chat chat-end space-y-1">
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
          <div className="chat-footer opacity-50 flex items-center gap-1 text-xs">
            Jane Doe <Star className="w-3 h-3 fill-warning text-warning" /> 5.0
          </div>
        </div>
      </div>
    </section>
  );
}

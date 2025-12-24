import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";
import Page from "@/components/layout/Page";

export default function Home() {
  return (
    <Page className="space-y-12">
      <Hero />
      <About />
      <Services />
      <Testimonials />
    </Page>
  );
}

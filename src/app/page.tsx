import Nav from "@/components/ui/Nav";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Showcase from "@/components/sections/Showcase";
import Previews from "@/components/sections/Previews";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <main>
      <Preloader />
      <Nav />
      <Hero />
      <Manifesto />
      <Showcase />
      <Previews />
      <Footer />
    </main>
  );
}

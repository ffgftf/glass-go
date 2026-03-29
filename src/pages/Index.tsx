import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeLinks from "@/components/HomeLinks";
import OurStory from "@/components/OurStory";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HomeLinks />
      <OurStory />
      <Footer />
    </div>
  );
};

export default Index;

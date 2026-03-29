import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeLinks from "@/components/HomeLinks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <HomeLinks />
      <Footer />
    </div>
  );
};

export default Index;

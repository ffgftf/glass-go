import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Tarifs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};

export default Tarifs;

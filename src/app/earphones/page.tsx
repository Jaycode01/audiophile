import About from "@/components/common/about";
import Category from "@/components/common/category";
import CategoryHero from "@/components/common/category_hero";
import ProductShowcase from "@/components/common/showcase";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

function Earphones() {
  return (
    <>
      <Navbar />
      <CategoryHero category_name="Earphones" />
      <ProductShowcase
        label="New Product"
        desktop_image="/assets/earphones/yx1.png"
        title="YX1 WIRELESS EARPHONES"
        description="Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature."
        reverse={false}
      />
      <Category />
      <About />
      <Footer />
    </>
  );
}

export default Earphones;

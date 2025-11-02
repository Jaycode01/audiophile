import About from "@/components/common/about";
import Category from "@/components/common/category";
import CategoryHero from "@/components/common/category_hero";
import ProductShowcase from "@/components/common/showcase";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

function Speakers() {
  return (
    <>
      <Navbar />
      <CategoryHero category_name="Speakers" />
      <ProductShowcase
        desktop_image="/assets/speakers/zx9.png"
        title="ZX9 SPEAKER"
        label="New Product"
        description="Upgrade your sound system with the all new ZX9 active speaker. It’s a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups."
        reverse={false}
      />
      <ProductShowcase
        desktop_image="/assets/speakers/zx7.png"
        title="ZX7 SPEAKER"
        description="Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use."
        reverse={true}
      />
      <Category />
      <About />
      <Footer />
    </>
  );
}

export default Speakers;

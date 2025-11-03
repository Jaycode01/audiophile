import About from "@/components/common/about";
import Category from "@/components/common/category";
import CategoryHero from "@/components/common/category_hero";
import ProductShowcase from "@/components/common/showcase";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { products } from "@/data/products";

function Earphones() {
  const earphones = products.filter((p) => p.category === "earphones");

  return (
    <>
      <Navbar />
      <CategoryHero category_name="Earphones" />
      {earphones.map((product, index) => (
        <ProductShowcase
          key={product.id}
          id={product.slug}
          desktop_image={product.image}
          label={product.isNew ? "NEW PRODUCT" : undefined}
          title={product.name}
          description={product.description}
          reverse={index % 2 !== 0}
        />
      ))}
      <Category />
      <About />
      <Footer />
    </>
  );
}

export default Earphones;

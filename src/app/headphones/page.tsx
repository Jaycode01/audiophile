import Navbar from "@/components/layout/navbar";
import CategoryHero from "../../components/common/category_hero";
import ProductShowcase from "../../components/common/showcase";
import Category from "@/components/common/category";
import About from "@/components/common/about";
import Footer from "@/components/layout/footer";
import { products } from "@/data/products";

function Headphones() {
  const headphones = products.filter((p) => p.category === "headphones");
  return (
    <>
      <Navbar />
      <CategoryHero category_name="Headphones" />
      {headphones.map((product, index) => (
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

export default Headphones;

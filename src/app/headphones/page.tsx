import Navbar from "@/components/layout/navbar";
import HPHero from "./hero";
import ProductShowcase from "./showcase";
import Category from "@/components/common/category";
import About from "@/components/common/about";
import Footer from "@/components/layout/footer";

function Headphones() {
  return (
    <>
      <Navbar />
      <HPHero />
      <ProductShowcase
        desktop_image="/assets/headphones/xx99-mark2.png"
        tablet_image="/assets/headphones/xx99-mark2-tablet.png"
        title="XX99 Mark II Headphones"
        label="New Product"
        description="The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound."
        reverse={false}
      />
      <ProductShowcase
        desktop_image="/assets/headphones/xx99-mark1.png"
        tablet_image="/assets/headphones/xx99-mark1-tablet.png"
        title="XX99 Mark I Headphones"
        label="New Product"
        description="As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go."
        reverse={true}
      />
      <ProductShowcase
        desktop_image="/assets/headphones/xx59.png"
        tablet_image="/assets/headphones/xx59-tablet.png"
        title="XXX59 Headphones"
        label="New Product"
        description="Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move."
        reverse={false}
      />
      <Category />
      <About />
      <Footer />
    </>
  );
}

export default Headphones;

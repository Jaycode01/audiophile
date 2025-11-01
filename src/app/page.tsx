import About from "@/components/common/about";
import Category from "@/components/common/category";
import Hero from "@/components/common/hero";
import Yx1earphone from "@/components/common/yx1earphone";
import Zx7speaker from "@/components/common/zx7speaker";
import Zx9Speaker from "@/components/common/zx9speaker";
import Navbar from "@/components/layout/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Category />
      <Zx9Speaker />
      <Zx7speaker />
      <Yx1earphone />
      <About />
    </>
  );
}

export default App;

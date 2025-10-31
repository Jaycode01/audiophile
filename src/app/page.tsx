import Category from "@/components/common/category";
import Hero from "@/components/common/hero";
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
    </>
  );
}

export default App;

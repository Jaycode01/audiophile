import "./category_hero.css";

type Prop = {
  category_name: string;
};

const CategoryHero = ({ category_name }: Prop) => {
  return (
    <section className="headphones_hero_wrapper">
      <div className="headphones_hero">
        <h1>{category_name}</h1>
      </div>
    </section>
  );
};

export default CategoryHero;

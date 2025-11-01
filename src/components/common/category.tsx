import "./category.css";

const Category = () => {
  return (
    <section className="product_categories_wrapper">
      <div className="product_categories">
        <div className="category">
          <img src="/assets/headphone.png" alt="headphone" className="visual" />
          <h2 className="name">Headphones</h2>
          <button type="button">
            <span>Shop</span>{" "}
            <img src="/assets/chevron_right.svg" alt="right chevron" />
          </button>
        </div>
        <div className="category">
          <img src="/assets/speaker.png" alt="headphone" className="visual" />
          <h2 className="name">Speakers</h2>
          <button type="button">
            <span>Shop</span>{" "}
            <img src="/assets/chevron_right.svg" alt="right chevron" />
          </button>
        </div>
        <div className="category">
          <img src="/assets/earphone.png" alt="headphone" className="visual" />
          <h2 className="name">Earphones</h2>
          <button type="button">
            <span>Shop</span>{" "}
            <img src="/assets/chevron_right.svg" alt="right chevron" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Category;

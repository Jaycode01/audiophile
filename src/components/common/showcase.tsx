import "./showcase.css";

type ProductProps = {
  desktop_image: string;
  tablet_image?: string;
  title: string;
  label?: string;
  description: string;
  reverse?: boolean;
};

const ProductShowcase = ({
  desktop_image,
  tablet_image,
  title,
  label,
  description,
  reverse,
}: ProductProps) => {
  return (
    <section className="showcase_wrapper">
      <div className={`showcase ${reverse ? "reverse" : ""}`}>
        <div className="image_wrapper">
          <img src={desktop_image} alt={title} className="desktop_image" />
          {tablet_image && (
            <img src={tablet_image} alt={title} className="tablet_image" />
          )}
        </div>
        <div className="content">
          {label && <p className="label">{label}</p>}
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>
          <button type="button">See Product</button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

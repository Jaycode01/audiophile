import Link from "next/link";
import "./showcase.css";

type ProductProps = {
  id: string;
  desktop_image: string;
  tablet_image?: string;
  title: string;
  label?: string;
  description: string;
  reverse?: boolean;
};

const ProductShowcase = ({
  id,
  title,
  label,
  reverse,
  description,
  desktop_image,
  tablet_image,
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
          <Link href={`products/${id}`}>
            <button type="button">See Product</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;

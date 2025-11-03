// components/ProductDetailsClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cartContext";
import type { Products } from "@/data/products";
import "./product_details.css";
import Navbar from "../layout/navbar";

type Props = {
  product: Products;
  relatedProducts: Products[];
};

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    });
    openCart();
  };

  const getDisplayName = (productName: string, productCategory: string) => {
    const categoryRegex = new RegExp(productCategory + "s?", "gi");
    return productName.replace(categoryRegex, "").trim();
  };

  return (
    <>
      <Navbar />
      <main className="product_details_page">
        <div className="container">
          <Link href={`/${product.category}`} className="go_back">
            Go Back
          </Link>
        </div>

        <section className="product_hero">
          <div className="container">
            <div className="hero_content">
              <div className="image_container">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product_info">
                {product.isNew && (
                  <span className="new_badge">NEW PRODUCT</span>
                )}
                <h1 className="product_name">{product.name}</h1>
                <p className="product_description">{product.description}</p>
                <p className="product_price">
                  $ {product.price.toLocaleString()}
                </p>

                <div className="add_to_cart_section">
                  <div className="quantity_selector">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                  <button onClick={handleAddToCart} className="add_to_cart_btn">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="features_section">
          <div className="container">
            <div className="features_content">
              <div className="features">
                <h2>Features</h2>
                <p>{product.features}</p>
              </div>

              <div className="in_the_box">
                <h2>In the Box</h2>
                <ul>
                  {product.inBox.map((item, index) => (
                    <li key={index}>
                      <span className="quantity">{item.quantity}x</span>
                      <span className="item_name">{item.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery_section">
          <div className="container">
            <div className="gallery_grid">
              <img
                src={product.gallery.first}
                alt={`${product.name} gallery 1`}
              />
              <img
                src={product.gallery.second}
                alt={`${product.name} gallery 2`}
              />
              <img
                src={product.gallery.third}
                alt={`${product.name} gallery 3`}
              />
            </div>
          </div>
        </section>

        <section className="related_products">
          <div className="container">
            <h2 className="section_title">You May Also Like</h2>
            <div className="related_grid">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="related_card">
                  <div className="related_image">
                    <img src={relatedProduct.image} alt={relatedProduct.name} />
                  </div>
                  <h3 className="related_name">
                    {relatedProduct.category === product.category
                      ? getDisplayName(relatedProduct.name, product.category)
                      : relatedProduct.name}
                  </h3>
                  <Link href={`/products/${relatedProduct.slug}`}>
                    <button className="see_product_btn">See Product</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

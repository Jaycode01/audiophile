// app/products/[id]/page.tsx (Server Component - NO "use client")

import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailsClient from "@/components/common/product_details_client";

type ProductProps = {
  params: Promise<{
    id: string;
  }>;
};

async function ProductDetails({ params }: ProductProps) {
  const { id } = await params;
  const product = products.find((p) => p.slug === id);

  if (!product) {
    notFound();
  }

  // Get related products
  const relatedProducts = products.filter((p) => p.slug !== product.slug);

  // Pass data to Client Component
  return (
    <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
  );
}

export default ProductDetails;

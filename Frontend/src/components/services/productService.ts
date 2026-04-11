// src/components/services/productService.ts
import { productApi, categoryApi } from "../../api";

export interface FrontendProduct {
  id: string;
  backendId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  stockQuantity: number;
  specs: string[];
  tag?: string;
  tagColor?: string;
}

function transformProduct(backendProduct: any): FrontendProduct {
  const specs = [
    `${backendProduct.stockQuantity}+ units available`,
    'Premium quality',
    'Eco-friendly',
    'ISO certified'
  ];

  let tag: string | undefined;
  let tagColor: string = 'bg-[#b5e42a] text-[#0d3d36]';
  
  if (backendProduct.stockQuantity < 10) {
    tag = 'LOW STOCK';
    tagColor = 'bg-orange-500 text-white';
  } else if (backendProduct.productRating >= 4.5) {
    tag = 'BESTSELLER';
    tagColor = 'bg-[#b5e42a] text-[#0d3d36]';
  }

  return {
    id: backendProduct._id,
    backendId: backendProduct._id,
    name: backendProduct.productName,
    description: backendProduct.description,
    price: backendProduct.price,
    image: backendProduct.productImage || '/product-placeholder.jpg',
    category: backendProduct.category?.name || 'Uncategorized',
    rating: backendProduct.productRating || 4.0,
    stockQuantity: backendProduct.stockQuantity,
    specs: specs,
    tag: tag,
    tagColor: tagColor,
  };
}

export async function fetchProducts(): Promise<FrontendProduct[]> {
  try {
    const products = await productApi.getAll();
    return products.map(transformProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const categories = await categoryApi.getAll();
    return categories.map((cat: any) => cat.name);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<FrontendProduct | null> {
  try {
    const product = await productApi.getById(id);
    return transformProduct(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
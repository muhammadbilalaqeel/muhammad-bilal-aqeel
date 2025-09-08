// types/cart.types.ts

export type Variant = {
  color: string;
  size: string;
  image?: string;
  _id: string;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  discountPercentage?: number;
  faqs: any[];
  loyaltyPoints?: number;
  onSale?: boolean;
  reviews: any[];
  stock?: number;
  type?: string;
  variants?: Variant[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
  variant: Variant;
  _id: string;
};

export type Cart = {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export interface CartResponse {
  success: boolean;
  message: string;
  cart: Cart | { items: CartItem[] }; // When empty, items can be empty array
}

export interface AddToCartRequest {
  product: string;
  quantity: number;
  color: string;
  size: string;
  image?: string;
}

export interface VariantRequest {
  productId: string;
  color: string;
  size: string;
}

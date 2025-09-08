// types/order.types.ts
export interface Category {
  _id: string;
  name: string;
}

export interface ProductVariant {
  color: string;
  images: string[];
  sizes: string[];
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  variants: ProductVariant[];
  onSale: boolean;
  discountPercentage: number;
  price: number;
  stock: number;
  type: "money" | "loyalty_points" | "hybrid";
  category: Category;
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
  role: "user" | "admin" | "superadmin";
  isVerified: boolean;
  otp?: string;
  otpExpiry?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderProduct {
  product: Product;
  variant: string;
  size: string;
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}

export interface PaymentInfo {
  method: string;
  status: string;
  transactionId?: string;
  paidAt?: string;
}

export interface Order {
  _id: string;
  user: User;
  products: OrderProduct[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentInfo?: PaymentInfo;
  status: string; // pending, confirmed, shipped, delivered, cancelled
  createdAt: string;
  updatedAt: string;
}

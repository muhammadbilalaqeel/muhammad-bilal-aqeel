import { Auction } from "@/app/Components/Profile/BidCard";

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  mobileNumber: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}




export interface Address {
  country?: string;
  city?: string;
  address1?: string;
  address2?: string;
  landLineNumber?: string;
  poBox?: string;
}

export interface TrafficFile {
  informationType?: string;
  trafficFileNumber?: string;
  plateNumber?: string;
  plateState?: string;
  plateCode?: string;
  driverLicenseNumber?: string;
  issueCity?: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  username?: string;
  mobileNumber?: string;
  avatarUrl?: string;

  nationality?: string;
  idType?: string;
  idNumber?: string;

  address?: Address;
  trafficFile?: TrafficFile;

  roles: string[];
  status: "active" | "suspended";

  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;

  acceptedTermsAt?: string;
  acceptedTermsVersion?: string;

  myCars?: Auction[];
  bids?: string[];
  wishlist?: string[];

  createdAt?: string;
  updatedAt?: string;
}

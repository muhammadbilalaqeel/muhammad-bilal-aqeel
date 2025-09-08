"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export enum Role {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: Role[];
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const router = useRouter();

  // Get token & user from localStorage
  const authString = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
  let token: string | null = null;
  let userRole: string | null = null;

  if (authString) {
    try {
      const auth = JSON.parse(authString);
      token = auth.access_token;
      userRole = auth.user.role; // assuming your localStorage stores user object
    } catch (err) {
      console.error("Failed to parse auth from localStorage", err);
    }
  }

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    if (roles && !roles.includes(userRole as Role)) {
      router.push("/"); // redirect unauthorized
      return;
    }
  }, [token, userRole, roles, router]);

  // Immediately block rendering if not allowed
  if (!token || (roles && !roles.includes(userRole as Role))) return null;

  return <>{children}</>;
};

export default ProtectedRoute;

"use client";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react"; // Added Menu & X icons
import { TbLogout } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import ProtectedRoute, { Role } from "../components/ProtectedRoutes";

export default function AdminDashboard({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false); // for notifications
  const [show, setShow] = useState(false); // for user dropdown
  const [sidebarOpen, setSidebarOpen] = useState(false); // for drawer toggle

  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const pathname = usePathname();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out");
    router.push("/login");
  };

  const links = [
    { name: "DASHBOARD", path: "/dashboard" },
    { name: "ALL PRODUCTS", path: "/dashboard/allproducts" },
    { name: "ORDER LIST", path: "/dashboard/orderlist" },
    { name: "ALL CATEGORIES", path: "/dashboard/allcategories" },
    // { name: "ALL USERS", path: "/dashboard/allusers" },
  ];

  const isActive = (linkPath: string) => {
    const normalizedPath = pathname.replace(/\/$/, "");
    const normalizedLink = linkPath.replace(/\/$/, "");
    if (normalizedLink === "/dashboard") return normalizedPath === "/dashboard";
    return normalizedPath === normalizedLink || normalizedPath.startsWith(normalizedLink + "/");
  };

  return (
    <ProtectedRoute roles={[Role.ADMIN, Role.SUPERADMIN]}>
      <div className="flex w-full min-h-screen bg-[#E7E7E3]">
        {/* Sidebar for large screens */}
        <div
          className={`px-6 bg-[#FAFAFA] max-w-[260px] w-full border-r border-[#23232133] hidden xl:flex flex-col`}
        >
          <div className="brand py-6 text-lg font-bold">E commerce</div>
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`inline-flex items-center max-w-[212px] w-full px-4 py-2 gap-2 rounded-xl h-12 font-medium text-sm leading-[100%] tracking-[0.25px] uppercase ${
                    isActive(link.path) ? "bg-[#003F62] text-white" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Drawer Sidebar for small screens */}
        <div
          className={`fixed top-0 left-0 h-full w-[260px] bg-[#FAFAFA] border-r border-[#23232133] p-6 transform transition-transform duration-300 z-50 xl:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-bold">E commerce</span>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`inline-flex items-center max-w-[212px] w-full px-4 py-2 gap-2 rounded-xl h-12 font-medium text-sm leading-[100%] tracking-[0.25px] uppercase ${
                    isActive(link.path) ? "bg-[#003F62] text-white" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="max-w-[1280px] w-full mx-auto bg-[#E7E7E3] flex flex-col gap-6">
          {/* Header */}
          <div className="h-24 border-b w-full border-[#23232133] py-8 px-[20px] xl:px-[60px] bg-[#FAFAFA] flex justify-between items-center">
            {/* Toggle button for small screens */}
            <button
              className="xl:hidden text-black"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={28} />
            </button>

            <div className="flex gap-10 items-center ml-auto">
              <DropdownMenu open={show} onOpenChange={setShow}>
                <DropdownMenuTrigger asChild>
                  <Button className="text-[#1C1C1A] bg-transparent border border-[rgb(28,28,26)] py-2 px-4 h-10 uppercase hover:text-white">
                    {user && user.role}
                    <ChevronDown
                      className={`transition-transform duration-300 ${show ? "rotate-180" : "rotate-0"}`}
                      size={16}
                    />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  side="top"
                  align="start"
                  className="w-[233px] flex flex-col gap-4 bg-white shadow-lg rounded-md p-4 border border-[#E7E7E3] mt-4 mr-4"
                >
                  <DropdownMenuItem className="text-[#232321] text-xl font-semibold">
                    {user && user.role}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="uppercase py-2 flex items-center justify-between"
                    onClick={handleLogout}
                  >
                    Logout <TbLogout className="text-xl" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Children */}
          <div className="max-w-[1211px] mx-auto px-[20px] xl:px-[60px] w-full h-auto">{children}</div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

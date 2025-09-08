"use client";

import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { LuCircleUserRound } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import Container from "../../Container/Container";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const hideNavAndHeader = pathname.includes("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Succesfully logged out");
  };

  return (
    <>
      {!hideNavAndHeader && (
        <nav className="w-full py-4 border-b border-[#0000001A]">
          <Container className="flex items-center justify-between gap-3 relative">
            {/* Brand */}
            <div className='flex gap-2 items-center'>
               <button
              className="lg:hidden block text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
            <Link
              href="/"
              className="inline-block brandName font-bold text-2xl sm:text-[32px] text-black font-bebas"
            >
              SHOP.CO
            </Link>
            </div>

            {/* Mobile Menu Icon */}
          

            {/* Menu Items */}
            <ul
              className={`${
                menuOpen ? "flex" : "hidden"
              } lg:flex shrink-0 flex-col lg:flex-row items-center gap-6 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 shadow-md lg:shadow-none z-20`}
            >
              <li><Link href="/category">Shop</Link></li>
              <li><Link href="/onsale">On Sale</Link></li>
              <li><Link href="/new-arrivals">New Arrivals</Link></li>
            </ul>

            {/* Search Bar */}
            <div className="hidden lg:flex max-w-[577px] w-full px-4 py-3 items-center gap-3 bg-[#F0F0F0] rounded-[62px]">
              <CiSearch className="text-[#00000066] w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                className="text-base placeholder:text-[#00000066] w-full outline-none bg-transparent"
              />
            </div>

            {/* Right Icons */}
            <div className="flex items-center 2xl:gap-6 xl:gap-4 gap-3">
               
              <Link href="/cart">
                <FiShoppingCart className="h-6 w-6 text-black" />
              </Link>

              {!user ? (
                <Link href="/login">
                  <LuCircleUserRound className="h-6 w-6 text-black" />
                </Link>
              ) : (
                <button onClick={handleLogout}>
                  <FiLogOut className="h-6 w-6 text-black" />
                </button>
              )}
            </div>
          </Container>

          {/* Mobile Search Bar */}
          <div className="lg:hidden mt-3 px-4">
            <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-[62px] px-4 py-3">
              <CiSearch className="text-[#00000066] w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                className="text-base placeholder:text-[#00000066] w-full outline-none bg-transparent"
              />
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

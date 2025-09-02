"use client"
import Image from "next/image";
import Container from "../Common/Container";
import { CiBellOn } from "react-icons/ci";
import { FaCar, FaChevronDown, FaRegStar, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { DropdownMenu, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loadAuthState, logout } from "@/redux/slices/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadAuthState());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    setMobileOpen(false);
  };

  return (
    <div className={`${pathname === '/' ? 'bg-transparent absolute w-full z-30' : 'bg-[#E8EDFA]'} h-[82px]`}>
      <Container className="h-full">
        <div className="flex items-center h-full justify-between">
          {/* Logo */}
          <div className="relative w-[165px] h-[42px]">
            <Image src="/logo.png" alt="" fill />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <Link href={'/'} className={`font-lato ${pathname === '/' ? "text-white" : "text-[#2E3D83]"} text-base font-medium`}>Home</Link>
            </li>
            <li>
              <Link href={'/auction'} className={`font-lato ${pathname === '/' ? "text-white" : "text-[#545677]"} text-base font-medium`}>Car Auction</Link>
            </li>
            <li>
              <Link href={'/sellyourcar'} className={`font-lato ${pathname === '/' ? "text-white" : "text-[#545677]"} text-base font-medium`}>Sell Your Car</Link>
            </li>
            <li>
              <Link href={'/'} className={`font-lato ${pathname === '/' ? "text-white" : "text-[#545677]"} text-base font-medium`}>About us</Link>
            </li>
            <li>
              <Link href={'/'} className={`font-lato ${pathname === '/' ? "text-white" : "text-[#545677]"} text-base font-medium`}>Contact</Link>
            </li>
          </ul>

          {/* Desktop Right Section */}
          {auth.user ? (
            <div className="hidden md:flex items-center gap-6">
              <FaRegStar className="text-[#2E3D83] text-2xl font-bold" />
              <CiBellOn className="text-[#2E3D83] text-[26px] font-bold" />

              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="flex items-center gap-2 cursor-pointer">
                  <FaCar className="text-[#2E3D83] text-[26px] font-bold" />
                  <FaChevronDown className={`transition-transform duration-300 text-sm ${open ? "rotate-180" : ""}`} />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="mt-2">
                  <DropdownMenuItem>
                    <Link href={'/profile'}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-[10px]">
              <Link href={'/login'} className="font-bold text-base text-white">Sign in</Link>
              <p className="text-[#898989] font-medium">or</p>
              <Link href={'/register'} className="bg-[#2E3D83] px-[15px] py-2 rounded-[5px] font-medium text-base text-white">Register now</Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-2xl text-[#2E3D83]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-[82px] left-0 w-full bg-[#E8EDFA] shadow-md py-4 z-50">
            <ul className="flex flex-col items-center gap-4">
              <li><Link href="/" onClick={() => setMobileOpen(false)}>Home</Link></li>
              <li><Link href="/auction" onClick={() => setMobileOpen(false)}>Car Auction</Link></li>
              <li><Link href="/sellyourcar" onClick={() => setMobileOpen(false)}>Sell Your Car</Link></li>
              <li><Link href="/" onClick={() => setMobileOpen(false)}>About us</Link></li>
              <li><Link href="/" onClick={() => setMobileOpen(false)}>Contact</Link></li>
            </ul>

            <div className="mt-6 flex flex-col items-center gap-4">
              {auth.user ? (
                <>
                  <Link href="/profile" onClick={() => setMobileOpen(false)}>Profile</Link>
                  <button onClick={handleLogout} className="text-red-600">Logout</button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="font-bold text-base text-[#2E3D83]">Sign in</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="bg-[#2E3D83] px-[15px] py-2 rounded-[5px] font-medium text-base text-white">Register now</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

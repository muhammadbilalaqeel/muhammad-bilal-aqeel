"use client"
import Link from "next/link";
import Container from "../../Container/Container";
import { usePathname } from "next/navigation";

export default function AnnouncementBar(){
       const pathname = usePathname();
    
      const hideNavAndHeader = pathname.includes("dashboard");
    return (
        <>
        {
            !hideNavAndHeader ? <div className="bg-[#000000] h-[38px]">
            <Container className="h-full flex items-center justify-center">
                <p className="text-sm leading-[100%] text-white text-center">Sign up and get 20% off to your first order. <Link className="text-sm font-medium underline" href={'/register'}>Sign Up Now</Link></p>
            </Container>
        </div> : ''
        }
        </>
    )
}
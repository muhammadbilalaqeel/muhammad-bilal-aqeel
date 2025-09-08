"use client"
import Link from "next/link";
import Container from "../Container/Container";
import NewsLetter from "../Home/NewsLetter";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { usePathname } from "next/navigation";
export default function Footer(){
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
  

  
     const pathname = usePathname();
  
    const hideNavAndHeader = pathname.includes("dashboard");
    return (
       <>
       {
        !hideNavAndHeader ?  <footer className="mt-20 pt-12 bg-gray-100">
 

         <Container>
            <div className="-mt-34">
              <NewsLetter/>
            </div>
            <div>
                <div className="max-w-7xl  mx-auto py-12  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
   
    <div className="flex flex-col gap-5">
      <h3 className="font-bold text-[33.45px] text-black">Shop.co</h3>
      <p className="text-[#00000099] text-sm">
        We have clothes that suits your style and which you’re proud to wear. From women to men.
      </p>
      <div className="flex gap-3 mt-4">
        <Link href="#" className="border border-[#00000033] inline-flex items-center justify-center h-7 w-7 rounded-full bg-white hover:bg-black group transition-all duration-150"><FaTwitter className="text-sm transition-all duration-150 group-hover:text-white"/></Link>
         <Link href="#" className="border border-[#00000033] inline-flex items-center justify-center h-7 w-7 rounded-full bg-white hover:bg-black group transition-all duration-150"><FaFacebookF className="text-sm transition-all duration-150 group-hover:text-white"/></Link>
            <Link href="#" className="border border-[#00000033] inline-flex items-center justify-center h-7 w-7 rounded-full bg-white hover:bg-black group transition-all duration-150"><FaInstagram className="text-sm transition-all duration-150 group-hover:text-white"/></Link>
               <Link href="#" className="border border-[#00000033] inline-flex items-center justify-center h-7 w-7 rounded-full bg-white hover:bg-black group transition-all duration-150"><FaGithub className="text-sm transition-all duration-150 group-hover:text-white"/></Link>
      </div>
    </div>

    
    <div className="flex flex-col gap-5">
      <h4 className="font-medium text-black uppercase ">Company</h4>
      <ul className="text-[#00000099] space-y-3">
        <li>About</li>
        <li>Features</li>
        <li>Works</li>
        <li>Career</li>
      </ul>
    </div>

    <div className="flex flex-col gap-5">
      <h4 className="font-medium text-black uppercase ">Help</h4>
      <ul className="text-[#00000099] space-y-3">
        <li>Customer Support</li>
        <li>Delivery Details</li>
        <li>Terms & Conditions</li>
        <li>Privacy Policy</li>
      </ul>
    </div>

    <div className="flex flex-col gap-5">
      <h4 className="font-medium text-black uppercase ">FAQ</h4>
      <ul className="text-[#00000099] space-y-3">
        <li>Account</li>
        <li>Manage Deliveries</li>
        <li>Orders</li>
        <li>Payments</li>
      </ul>
    </div>

   
    <div className="flex flex-col gap-5">
      <h4 className="font-medium text-black uppercase ">Resources</h4>
      <ul className="text-[#00000099] space-y-3">
        <li>Free eBooks</li>
        <li>Development Tutorial</li>
        <li>How to - Blog</li>
        <li>Youtube Playlist</li>
      </ul>
    </div>
  </div>

 
  <div className="border-t border-gray-300 py-6  flex flex-col md:flex-row justify-between items-center text-[#00000099] text-sm">
    <p className="text-sm">Shop.co © 2000-2023, All Rights Reserved</p>
    <div className="flex gap-3 mt-3 md:mt-0">
       <div className="w-[46px] h-[30px] rounded-[5px] border-[0.2px] border-[#D6DCE5] bg-[#FFFFFF]  ">
          
       </div>

       <div className="w-[46px] h-[30px] rounded-[5px] border-[0.2px] border-[#D6DCE5] bg-[#FFFFFF]  ">
          
       </div>

       <div className="w-[46px] h-[30px] rounded-[5px] border-[0.2px] border-[#D6DCE5] bg-[#FFFFFF]  ">
          
       </div>

       <div className="w-[46px] h-[30px] rounded-[5px] border-[0.2px] border-[#D6DCE5] bg-[#FFFFFF]  ">
          
       </div>

       <div className="w-[46px] h-[30px] rounded-[5px] border-[0.2px] border-[#D6DCE5] bg-[#FFFFFF]  ">
          
       </div>
    </div>
  </div>
                </div> 
         </Container>
  
      
        </footer> : ''
       }
       </>

    )
}
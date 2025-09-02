import Link from "next/link";
import Container from "../Common/Container";
import { MdOutlineEmail } from "react-icons/md";
export default function Header(){
    return(
        <div className="w-full  bg-[#2e3d83] text-white h-[50px] font-lato">
           <Container className="h-full">
             <div className="flex h-full items-center justify-between">
                <div className="flex items-center gap-5 font-lato">
                <p className="text-base font-lato font-medium">Call Us</p>
                <p><Link href="tel:+5706944002" className="text-base font-lato font-medium">570-694-4002</Link></p>
             </div>
            <div className="flex items-center gap-5 font-lato">
                <MdOutlineEmail className="text-2xl"/>
                <p className="text-base font-lato font-medium">Email Id : <Link href={'mailto:info@cardeposit.com'}>info@cardeposit.com</Link></p>
            </div>
             </div>
           </Container>
        </div>
    )
}
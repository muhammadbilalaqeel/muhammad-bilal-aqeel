import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Container from "../Components/Common/Container";
import Link from "next/link";
import LoginForm from "../Components/Forms/LoginForm";

export default function Login(){
    return(
        <div>
            <div className="h-[240px] w-full bg-[#c6d8f9] relative">
                <Container>
                    <h1 className="text-[64px] pt-6 font-semibold text-[#2E3D83] text-center font-josefin">Login</h1>
                    <p className="text-lg font-medium text-[#545677] text-center">Lorem ipsum dolor sit amet consectetur. At in pretium semper vitae eu eu mus.</p>
                 <div className="w-full flex justify-center absolute bottom-0 left-0">
                       <Breadcrumb className="px-3 py-2 bg-[#BBD0F6] rounded-x-[3px]">
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/" className="text-[#545677]">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-[#000000]"/>
                         <BreadcrumbItem>
                          <BreadcrumbLink className="text-[#2E3D83]">Login</BreadcrumbLink>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                 </div>
                </Container>
            </div>


           <section className=" py-14">
             <div className="w-[294px] h-[60px]
             mx-auto  border flex border-black rounded-[50px]">
                <p className="w-[162px] h-full flex items-center justify-center text-black rounded-[50px] text-xl font-medium text-center "><Link href={'/register'}>Register</Link></p>
                <p className="h-full mx-auto flex items-center justify-center  rounded-[50px] text-xl font-medium text-center bg-[#2E3D83] text-white w-[138px]">Login</p>
            </div>

            <div className="mt-20 w-full flex justify-center"><LoginForm/></div>
           </section>
        </div>
    )
}
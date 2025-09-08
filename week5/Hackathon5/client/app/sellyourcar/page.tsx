"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Container from "../Components/Common/Container";
import YourInfoForm from "../Components/Forms/SellCar/YourInfoForm";
import CarDetailsForm from "../Components/Forms/SellCar/CarDetailsForm";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateAuctionMutation } from "@/redux/api/auctionApiSlice";
import ButtonSpinner from "../Components/Spinners/ButtonSpinner";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function SellYourCar(){
      const router = useRouter()
      const methods = useForm();
      const [createAuction,{isLoading,isSuccess,error}] = useCreateAuctionMutation()
    const onSubmit =async (data: any) => {
        console.log("Final Data: ", data);
        try {
            const res = await createAuction(data).unwrap()
            console.log(res)
            alert(res.message)
            router.push('/auction')
        } catch (err) {
            alert(error.data.error)
            console.log(error)
        }
  };
  
    return (
        <div>
            <div className="h-[240px] w-full bg-[#c6d8f9] relative">
                <Container>
                    <h1 className="text-[64px] pt-6 font-semibold text-[#2E3D83] text-center font-josefin">Sell Your Car</h1>
                    <p className="text-lg font-medium text-[#545677] text-center">Lorem ipsum dolor sit amet consectetur. At in pretium semper vitae eu eu mus.</p>
                 <div className="w-full flex justify-center absolute bottom-0 left-0">
                       <Breadcrumb className="px-3 py-2 bg-[#BBD0F6] rounded-x-[3px]">
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/" className="text-[#545677]">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-[#000000]"/>
                         <BreadcrumbItem>
                          <BreadcrumbLink className="text-[#2E3D83]">Sell Your Car</BreadcrumbLink>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                 </div>
                </Container>
            </div>

            <section className="py-14 max-w-[796px] mx-auto">
                <div className="flex flex-col gap-10">
                    <h2 className="text-[48px] font-bold text-black">Tell us about your car</h2>
                    <p className="text-lg text-[#535353] leading-[100%]">Please give us some basics about yourself and car you’d like to sell . We’ll also need details about the car’s title status as well as 50 photos that highlight the car’s exterior and interior condition.</p>
                    <p className="text-lg text-[#535353] leading-[100%]">We’ll respond to your application within a business day, and we work with you to build a custom and professional listing and get the auction live.</p>
                </div>


                <div className="mt-10">
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <YourInfoForm/>
                            <CarDetailsForm isLoading={isLoading}/>
                              {/* Submit */}    
                        </form>
                    </FormProvider>
                </div>
            </section>
        </div>
    )
}
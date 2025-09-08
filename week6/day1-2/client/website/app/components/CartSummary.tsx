"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type CartSummaryProps = {
    total : number
    totalDiscount : number
    subtotal : number
}


export default function CartSummary({total,totalDiscount,subtotal}:CartSummaryProps){
    const router = useRouter()
    const handleCheckout = ()=>{
    router.push('/checkout')
}
    return (
        <div className="border border-[#0000001A] flex flex-col gap-6 py-5 px-6 rounded-[20px] w-[505px] h-[458px]">
            <h3 className="font-bold text-2xl text-black">Order Summary</h3>
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                 <p className="text-[#00000099] text-xl">Subtotal</p>
                 <p className="text-xl font-bold text-black">${subtotal}</p>
              </div>
              <div className="flex justify-between items-center">
                 <p className="text-[#00000099] text-xl">Discount </p>
                 <p className="text-xl font-bold text-[#FF3333]">-${totalDiscount}</p>
              </div>
              <div className="flex justify-between items-center">
                 <p className="text-[#00000099] text-xl">Delivery Fee</p>
                 <p className="text-xl font-bold text-black">$5</p>
              </div>
            <div className="w-full border border-[#0000001A]"></div>
             <div className="flex justify-between items-center">
                 <p className="text-[#000000] text-xl">Total</p>
                 <p className="text-2xl font-bold text-black">${total}</p>
              </div>
            </div>
{/* 
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full bg-[#F0F0F0] py-3 px-4 rounded-[62px]">
                    <div>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.0766 10.4857L11.7653 1.17444C11.5917 0.999696 11.3851 0.861152 11.1576 0.766846C10.93 0.672541 10.686 0.62435 10.4397 0.625069H1.75001C1.45164 0.625069 1.16549 0.743595 0.954513 0.954574C0.743534 1.16555 0.625008 1.4517 0.625008 1.75007V10.4398C0.624289 10.6861 0.67248 10.9301 0.766785 11.1576C0.861091 11.3852 0.999635 11.5918 1.17438 11.7654L10.4856 21.0766C10.8372 21.4281 11.3141 21.6256 11.8113 21.6256C12.3084 21.6256 12.7853 21.4281 13.1369 21.0766L21.0766 13.1369C21.4281 12.7853 21.6255 12.3085 21.6255 11.8113C21.6255 11.3141 21.4281 10.8373 21.0766 10.4857ZM11.8113 19.2204L2.87501 10.2813V2.87507H10.2813L19.2175 11.8113L11.8113 19.2204ZM7.37501 5.87507C7.37501 6.17174 7.28703 6.46175 7.12221 6.70842C6.95739 6.9551 6.72312 7.14736 6.44903 7.26089C6.17494 7.37442 5.87334 7.40412 5.58237 7.34625C5.2914 7.28837 5.02413 7.14551 4.81435 6.93573C4.60457 6.72595 4.46171 6.45868 4.40383 6.1677C4.34595 5.87673 4.37566 5.57513 4.48919 5.30104C4.60272 5.02695 4.79498 4.79269 5.04165 4.62786C5.28833 4.46304 5.57834 4.37507 5.87501 4.37507C6.27283 4.37507 6.65436 4.5331 6.93567 4.81441C7.21697 5.09571 7.37501 5.47724 7.37501 5.87507Z" fill="black" fillOpacity="0.4"/>
</svg>

                    </div>
                    <input type="text" placeholder="Add promo code" className="placeholder:text-[#00000066] outline-none w-full" />
                </div>
                <Button className="bg-black text-white py-3 px-4 rounded-[62px] w-[119px] h-12 font-medium">
                     Apply
                </Button>

            </div> */}
            <Button onClick={handleCheckout} className="py-4 px-[54px] rounded-[62px] bg-black text-white w-full h-[60px]">
                Go to Checkout
                <div><svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.7959 0.454104L18.5459 7.2041C18.6508 7.30862 18.734 7.43281 18.7908 7.56956C18.8476 7.7063 18.8768 7.85291 18.8768 8.00098C18.8768 8.14904 18.8476 8.29565 18.7908 8.4324C18.734 8.56915 18.6508 8.69334 18.5459 8.79785L11.7959 15.5479C11.5846 15.7592 11.2979 15.8779 10.9991 15.8779C10.7002 15.8779 10.4135 15.7592 10.2022 15.5479C9.99084 15.3365 9.87211 15.0499 9.87211 14.751C9.87211 14.4521 9.99084 14.1654 10.2022 13.9541L15.0313 9.12504L1.25 9.12504C0.951632 9.12504 0.665483 9.00651 0.454505 8.79554C0.243527 8.58456 0.125 8.29841 0.125 8.00004C0.125 7.70167 0.243527 7.41552 0.454505 7.20455C0.665483 6.99357 0.951632 6.87504 1.25 6.87504L15.0313 6.87504L10.2013 2.04598C9.98991 1.83463 9.87117 1.54799 9.87117 1.2491C9.87117 0.950218 9.98991 0.663574 10.2013 0.45223C10.4126 0.240885 10.6992 0.122151 10.9981 0.122151C11.297 0.122151 11.5837 0.240885 11.795 0.45223L11.7959 0.454104Z" fill="white"/>
</svg>
</div>
            </Button>
        </div>
    )
}
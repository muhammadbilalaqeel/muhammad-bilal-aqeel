"use client"
import { Button } from "@/components/ui/button";
import { Order } from "@/types/order.types";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";
type OrderDetailBoxProps = {
    order : Order
    purpose ?: string
}

export default function OrderDetailBox({order,purpose}:OrderDetailBoxProps){
    return (
        <div className="py-4 px-6 border border-[#E7E7E3] rounded-2xl min-w-[348px] w-full flex flex-col gap-4">
            <div className="flex gap-4">
               <div className="bg-[#232321] rounded-xl p-4 flex items-center justify-center h-14 w-14">
                  {
                    purpose === 'customer' ?<FaRegUser className="text-2xl text-white"/> : <RiShoppingBag4Line className="text-2xl text-white"/>                  
                  }
               </div>
               <div className="flex flex-col gap-2">
                  <h4 className="font-semibold text-xl text-[#232321]">{purpose === 'customer' ? 'Customer' : purpose === 'order-info' ? 'Order Info' : 'Deliver To'}</h4>
                  {
                    purpose=== 'customer' ?  <div className="flex flex-col gap-2">
                 <p className="text-[#70706E] font-semibold">
  Full Name: {order?.user?.username || 'no username'}
</p>
<p className="text-[#70706E] font-semibold">
  Email: {order?.user?.email || 'no email'}
</p>
<p className="text-[#70706E] font-semibold">
  Phone: {order?.shippingAddress?.phone && order?.shippingAddress?.phone.trim()?.length > 0 ? order.shippingAddress.phone : 'No phone number'}
</p>

                  </div> : purpose === 'order-info' ?  <div className="flex flex-col gap-2">
                    <p className="text-[#70706E] font-semibold capitalize">
  Payment Method: {order?.paymentInfo?.method || "N/A"}
</p>
<p className="text-[#70706E] font-semibold">
  Amount: ${order?.totalAmount || 0}
</p>
<p className="text-[#70706E] font-semibold">
  Status: {order?.paymentInfo?.status || "N/A"}
</p>

                  </div> :  <div className="flex flex-col gap-2">
                    <p className="text-[#70706E] font-semibold">Address: {order?.shippingAddress?.street},{order?.shippingAddress?.city}, {order?.shippingAddress?.country}</p>
                    {/* <p className="text-[#70706E] font-semibold">Email: shristi@gmail.com</p>
                    <p className="text-[#70706E] font-semibold">Phone: +91 904 231 1212</p> */}
                  </div>
                  }
               </div>
            </div>


            {/* <Button className="w-full bg-[#003F62] font-medium text-sm text-white rounded-xl h-8 py-2 px-4">
                   View profile 
            </Button> */}
        </div>
    )
}
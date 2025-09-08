"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import OrderDetailBox from "./components/OrderDetailBox";
import { IoCalendarOutline } from "react-icons/io5";
import { useParams } from "next/navigation";
import { useGetDashboardStatsQuery, useGetOrderByIdQuery, useGetOrdersStatsQuery, useUpdateOrderStatusMutation } from "@/redux/api/orderApi";
import { FaRegUser } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";
import OrderProductTable from "../../components/Tables/OrderProductTable";
import { Order } from "@/types/order.types";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRef } from "react";
// Validation Schema
const statusSchema = z.object({
  status: z.string().min(1, "Status is required"),
});
type StatusFormValues = z.infer<typeof statusSchema>;
export default function OrderDetails(){
    const params = useParams();
    const orderId = params.id?.toString();
const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      // Replace page content with the order info for printing
      document.body.innerHTML = printContents;
      window.print();

      // Restore original page after printing
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore React state
    }
  };
    const {data,isLoading} = useGetOrderByIdQuery(orderId!)
    const [updateStatus,{isLoading:updateStatusLoading}] = useUpdateOrderStatusMutation()
    const {refetch:dashboardStats} = useGetDashboardStatsQuery();
    const {refetch} = useGetOrdersStatsQuery()
    console.log(data)
const { subtotal, discountAmount, discountPercent, total, originalTotal } = calculateOrderSummary(data!);
      const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<StatusFormValues>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: data?.status,
    },
  });

  const onSubmit = async (d: StatusFormValues) => {
     const update = {
        ...d,
        orderId: data?._id
     }
    
     try {
         const res = await updateStatus(update).unwrap();

         console.log(res)
         toast.success('Status updated succesfully')
         dashboardStats();
         refetch();
     } catch (error) {
                 console.log(error)

                 toast.error('Status not updated succesfully')
     }
     
  };
    return (
        <div className="pb-10 flex flex-col gap-6">
            <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-[#232321] text-2xl font-semibold">Dashboard</h2>
                            <Breadcrumb>
                             <BreadcrumbList>
                               <BreadcrumbItem>
                                 <BreadcrumbLink href="/dashboard" className="font-semibold text-black">Home</BreadcrumbLink>
                               </BreadcrumbItem>
                               <BreadcrumbSeparator className="text-black"/>
                               <BreadcrumbItem>
                                 <BreadcrumbLink href="/dashboard/orderlist" className="font-semibold text-black">Order List</BreadcrumbLink>
                               </BreadcrumbItem>
                               <BreadcrumbSeparator className="text-black"/>
                               <BreadcrumbItem>
                                 <BreadcrumbPage className="font-semibold text-black">Order Details</BreadcrumbPage>
                               </BreadcrumbItem>
                             </BreadcrumbList>
                            </Breadcrumb>
                        </div>
            </div>

            <div className="w-full bg-white py-6 px-4 rounded-2xl flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-6 items-center">
                        <h4 className="text-[#232321] font-semibold text-xl">Orders ID: #{data?._id.slice(-5)}</h4>
                        <div className="bg-[#FFA52FCC] rounded-xl p-2 flex items-center justify-center text-[12px] font-semibold">{data?.status}</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex gap-2">
                            <IoCalendarOutline className="text-2xl"/>
                            <p className="font-semibold text-black">{ new Date(data?.createdAt!).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}</p>
                        </div>
                        <form className="flex gap-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex flex-col gap-3 h-full'>
<Controller
  name="status"
  control={control}
  render={({ field }) => (
    <Select
      onValueChange={field.onChange}
      value={field.value || data?.status || ""} // <-- Default status set here
    >
      <SelectTrigger
        className="bg-[#F4F2F2] rounded-xl p-4 w-[219px] text-[#232321] text-sm font-semibold flex items-center !h-[52px] !min-h-[52px]"
      >
        <SelectValue placeholder="Change Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="confirmed">Confirmed</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
        <SelectItem value="shipped">Shipped</SelectItem>
        <SelectItem value="delivered">Delivered</SelectItem>
      </SelectContent>
    </Select>
  )}
/>
      {/* {errors.status && (
        <p className="text-red-500 text-xs">{errors.status.message}</p>
      )} */}
                            </div>

                            <div className="bg-[#F4F2F2] py-2 px-4 rounded-xl h-[52px] flex items-center justify-center" onClick={handlePrint}>
                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 2.25C5 1.65326 5.23705 1.08097 5.65901 0.65901C6.08097 0.237053 6.65326 0 7.25 0H14.75C15.3467 0 15.919 0.237053 16.341 0.65901C16.7629 1.08097 17 1.65326 17 2.25V3H18.5C19.2956 3 20.0587 3.31607 20.6213 3.87868C21.1839 4.44129 21.5 5.20435 21.5 6V12.75C21.5 13.3467 21.2629 13.919 20.841 14.341C20.419 14.7629 19.8467 15 19.25 15H17.15V15.75C17.15 16.3467 16.9129 16.919 16.491 17.341C16.069 17.7629 15.4967 18 14.9 18H7.25C6.65326 18 6.08097 17.7629 5.65901 17.341C5.23705 16.919 5 16.3467 5 15.75V15H2.75C2.15326 15 1.58097 14.7629 1.15901 14.341C0.737053 13.919 0.5 13.3467 0.5 12.75V6C0.5 5.20435 0.816071 4.44129 1.37868 3.87868C1.94129 3.31607 2.70435 3 3.5 3H5V2.25ZM15.5 3V2.25C15.5 2.05109 15.421 1.86032 15.2803 1.71967C15.1397 1.57902 14.9489 1.5 14.75 1.5H7.25C7.05109 1.5 6.86032 1.57902 6.71967 1.71967C6.57902 1.86032 6.5 2.05109 6.5 2.25V3H15.5ZM5 4.5H3.5C3.10218 4.5 2.72064 4.65804 2.43934 4.93934C2.15804 5.22064 2 5.60218 2 6V12.75C2 12.9489 2.07902 13.1397 2.21967 13.2803C2.36032 13.421 2.55109 13.5 2.75 13.5H5V12.75C5 12.1533 5.23705 11.581 5.65901 11.159C6.08097 10.7371 6.65326 10.5 7.25 10.5H14.9C15.4967 10.5 16.069 10.7371 16.491 11.159C16.9129 11.581 17.15 12.1533 17.15 12.75V13.5H19.25C19.4489 13.5 19.6397 13.421 19.7803 13.2803C19.921 13.1397 20 12.9489 20 12.75V6C20 5.60218 19.842 5.22064 19.5607 4.93934C19.2794 4.65804 18.8978 4.5 18.5 4.5H5ZM7.25 12C7.05109 12 6.86032 12.079 6.71967 12.2197C6.57902 12.3603 6.5 12.5511 6.5 12.75V15.75C6.5 15.9489 6.57902 16.1397 6.71967 16.2803C6.86032 16.421 7.05109 16.5 7.25 16.5H14.9C15.0989 16.5 15.2897 16.421 15.4303 16.2803C15.571 16.1397 15.65 15.9489 15.65 15.75V12.75C15.65 12.5511 15.571 12.3603 15.4303 12.2197C15.2897 12.079 15.0989 12 14.9 12H7.25Z" fill="#232321"/>
</svg>

                            </div>

                            <Button type='submit' className="hover:text-white bg-[#F4F2F2] h-[52px] py-2 px-4 rounded-xl flex items-center justify-center text-[#232321] text-sm font-semibold">
                                Save
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="flex gap-4 w-full">
                    <OrderDetailBox order={data!} purpose="customer"/>
                    <OrderDetailBox order={data!} purpose="order-info"/>
                    <OrderDetailBox order={data!} purpose="deliver"/>
                </div>
            </div>


              <div className="w-full bg-white py-6 px-4 rounded-2xl flex flex-col gap-6">
                <OrderProductTable orderProducts={data?.products!} isLoading={isLoading}/>
                <div className="flex w-full items-end flex-col gap-4">
                    <div className="flex items-center gap-10">
                       <span className="text-[#232321] font-semibold">Subtotal</span>
                       <span className="text-[#232321] font-semibold">${subtotal}</span>
                    </div>

                     <div className="flex items-center gap-10">
                       <span className="text-[#232321] font-semibold">Discount</span>
                       <span className="text-[#232321] font-semibold">${discountAmount}</span>
                    </div>

                     <div className="flex items-center gap-10">
                       <span className="text-[#232321] font-semibold">Discount %</span>
                       <span className="text-[#232321] font-semibold">{discountPercent}%</span>
                    </div>

                     <div className="flex items-center gap-10">
                       <span className="text-[#232321] font-semibold">Shipping Rate</span>
                       <span className="text-[#232321] font-semibold">$0</span>
                    </div>

                     <div className="flex items-center gap-10">
                       <span className="text-[#232321] font-semibold text-2xl">Total</span>
                       <span className="text-[#232321] font-semibold">${total}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const calculateOrderSummary = (order: Order) => {
  if (!order?.products?.length) {
    return { subtotal: 0, discountAmount: 0, discountPercent: 0, total: 0, originalTotal: 0 };
  }

  let originalTotal = 0; 
  let subtotal = 0;      

  for (const item of order.products) {
    const qty = Number(item.quantity) || 0;

    
    const unitFinal = Number(item.price) || 0;


    const unitOriginal = Number(item.product?.price ?? unitFinal);

    originalTotal += unitOriginal * qty;
    subtotal += unitFinal * qty;
  }

  const discountAmount = Math.max(0, originalTotal - subtotal);
  const discountPercent = originalTotal > 0 ? +(discountAmount / originalTotal * 100).toFixed(2) : 0;

  const total = typeof order.totalAmount === 'number' ? order.totalAmount : subtotal;

  return { subtotal, discountAmount, discountPercent, total, originalTotal };
};


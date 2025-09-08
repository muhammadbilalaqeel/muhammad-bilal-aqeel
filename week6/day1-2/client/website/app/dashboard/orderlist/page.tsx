import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { IoCalendarOutline } from "react-icons/io5";
import OrderListTable from "../components/Tables/OrderListTable";

export default function OrderList(){
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
                                 <BreadcrumbPage className="font-semibold text-black">Order List</BreadcrumbPage>
                               </BreadcrumbItem>
                             </BreadcrumbList>
                            </Breadcrumb>
                        </div>
        
                        <div className="flex items-center gap-2">
                            <IoCalendarOutline className="text-2xl"/>
                           <p className="font-semibold">Oct 11,2023 - Nov 11,2022</p>
                        </div>
              </div>

              <div className = 'w-full'>
                 <OrderListTable/>
              </div>
        </div>
    )
}
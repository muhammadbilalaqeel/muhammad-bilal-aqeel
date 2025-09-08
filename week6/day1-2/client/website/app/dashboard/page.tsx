"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import DashInfoBox from "./components/DashInfoBox/DashInfoBox";
import DasboardGraph from "./components/DasboardGraph/DasboardGraph";
import BestSellerBox from "./components/BestSellerBox/BestSellerBox";
import OrdersTable from "./components/Tables/OrdersTable";
import { useGetOrdersStatsQuery } from "@/redux/api/orderApi";
import DashInfoBoxSkeleton from "../components/Skeletons/DashInfoBoxSkeleton";

export default function DashHome(){
    const {data : orderStats,isLoading:statsLoading} = useGetOrdersStatsQuery()
  console.log(orderStats)
  return (
    <div className="pb-10">
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
                         <BreadcrumbPage className="font-semibold text-black">Dashboard</BreadcrumbPage>
                       </BreadcrumbItem>
                     </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* <div className="flex items-center gap-1">
                   <p className="font-semibold">Oct 11,2023 - Nov 11,2022</p>
                </div> */}
      </div>

    <div className="flex flex-col gap-6">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-3.5 mt-6">
          {
            statsLoading ? [1,2,3,4].map((item,index)=>{
              return <DashInfoBoxSkeleton key={index}/>
            }) : <>
              <DashInfoBox title={'Total Orders'} amount={orderStats?.totalOrders}/>
        <DashInfoBox title={'Active Orders'} amount={orderStats?.activeOrdersCount}/>
        <DashInfoBox title={'Completed Orders'} amount={orderStats?.totalCompletedOrders}/>
        <DashInfoBox title={'Total Completed Amount'} amount={orderStats?.totalCompletedAmount}/>
            </>
          }
      
      </div>

    <div className="grid lg:grid-cols-[1fr_360px] gap-3.5">
      <DasboardGraph />
      <BestSellerBox />
    </div>



      <div>
        <OrdersTable/>
      </div>
    </div>
    </div>
  )
}
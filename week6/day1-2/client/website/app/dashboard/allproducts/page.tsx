"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { useGetAllProductsQuery } from "@/redux/api/productApi"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AllProducts(){
    const router = useRouter()
    const handleAddProductBtn = ()=>{
        router.push('/dashboard/allproducts/addproduct')
    }
      const [filters, setFilters] = useState<{
        category?: string;
        colors?: string[];
        sizes?: string[];
        minPrice?: number;
        maxPrice?: number;
      }>({}) 
    const {data,isLoading:productsLoading} = useGetAllProductsQuery(Object.keys(filters).length ? filters : {})

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#232321] text-2xl font-semibold">All Products</h2>
                    <Breadcrumb>
                     <BreadcrumbList>
                       <BreadcrumbItem>
                         <BreadcrumbLink href="/dashboard" className="font-semibold text-black">Home</BreadcrumbLink>
                       </BreadcrumbItem>
                       <BreadcrumbSeparator className="text-black"/>
                       <BreadcrumbItem>
                         <BreadcrumbPage className="font-semibold text-black">All Products</BreadcrumbPage>
                       </BreadcrumbItem>
                     </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Button onClick={handleAddProductBtn} className="w-[212px] h-[48px] px-4 py-2 inline-flex gap-2 bg-[#232321] text-sm leading-[100%] tracking-[0.25px] uppercase font-medium">
                    ADD NEW PRODUCT
                </Button>
            </div>
            {
                productsLoading ? <div className="flex justify-center py-6">
                    Loading
                </div> : <div className="py-6 grid xl:grid-cols-3 md:grid-cols-2  gap-6">
                {
                    data && data.length > 0 ? 
                    data.map((item,index)=>{
                        return <Link key={index} href={`/dashboard/allproducts/${item._id}`}>
                        <div className="min-w-[360px] min-h-[298px] h-auto bg-[#FAFAFA] rounded-2xl flex flex-col gap-4 p-4">
                        <div className="flex gap-4">
                        <div className="h-[84px] w-[84px] relative overflow-hidden">
                            <Image src={item.variants[0].images[0]} alt={`${item.name}`} width={84} height={76} className="object-cover object-center" />
                        </div>
                        <div className="flex flex-col gap-4">
                        <div className="flex flex-col ">
                            <h4 className="font-semibold text-[#232321]">{item.name}</h4>
                            <p className="font-semibold text-sm opacity-60 text-black">{item.category.name}</p>
                        </div>
                        <h5 className="text-[#232321] text-sm font-semibold">${item.price}</h5>
                     </div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-[#232321]">Description</h5>
                    <p className="text-[#232321] text-sm opacity-60">{item.description}</p>
                  </div>
                  <div className="rounded-xl p-4 flex flex-col gap-2 border-[0.75px] w-full border-[#2323214D]">
                     <div className="flex justify-between">
                        <p className="font-semibold text-sm opacity-80">Sales</p>
                        <div></div>
                     </div>
                     <div className="w-full border-[0.5px] opacity-40 border-[#232321]"></div>
                     <div className="flex items-center justify-between">
                        <p className="font-semibold text-sm opacity-80">Remaining Products</p>
                        <div className="font-semibold text-sm opacity-80">{item.stock}</div>
                     </div>
                  </div>
                </div>
                    </Link>
                    }) : <p>No Product Found</p>
                }
            </div>
            }
        </div>
    )
}
"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useGetProductByIdQuery } from "@/redux/api/productApi";
import { useParams } from "next/navigation";
import EditProductForm from "./components/EditForm";

export default function ProductById(){
     const params = useParams(); 
  const productId = params.id;
  console.log(productId)
  if (!productId || Array.isArray(productId)) {
    return <p>Invalid product ID</p>;
  }
    const {data , isLoading : singleProductLoading} = useGetProductByIdQuery(productId);
    console.log(data)
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
                         <BreadcrumbLink href="/dashboard/allproducts" className="font-semibold text-black">All Products</BreadcrumbLink>
                       </BreadcrumbItem>
                       <BreadcrumbSeparator className="text-black"/>
                       <BreadcrumbItem>
                         <BreadcrumbPage className="font-semibold text-black">{data?.name}</BreadcrumbPage>
                       </BreadcrumbItem>
                     </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className="py-6">
              <EditProductForm product={data}/>
            </div>
        </div>
    )
}
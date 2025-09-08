import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import AddProductForm from "../../components/AddProductForm/AddProductForm";

export default function AddProduct(){
    return (
         <div className="w-full">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#232321] text-2xl font-semibold">Product Details</h2>
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
                         <BreadcrumbPage className="font-semibold text-black">Add Product</BreadcrumbPage>
                       </BreadcrumbItem>
                     </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>

            <div className="w-full py-6">
                <AddProductForm/>
            </div>
        </div>
    )
}
"use client"


import { Button } from "@/components/ui/button"
import Container from "../../Container/Container"
import ProductCard from "./ProductCard"
import { Product, useGetAllProductsQuery } from "@/redux/api/productApi"
import ContentSpinner from "../../Spinners/ContentSpinner"
import { useState } from "react"
import { useRouter } from "next/navigation"
import ProductCardSkeleton from "../../Skeletons/ProductCardSkeleton"

export type ProductSectionProps = {
  title : string,
  product ?: Product[],
  type ?: string
}

export default function ProductSection({title,product,type}:ProductSectionProps){
     const [filters, setFilters] = useState<{
    category?: string;
    colors?: string[];
    sizes?: string[];
    minPrice?: number;
    maxPrice?: number;
  }>({}) 
   const { data: products, isLoading : productsLoading, error } = useGetAllProductsQuery(
    Object.keys(filters).length ? filters : {} // always pass an object
  );

  const router = useRouter()
  const handleClick = ()=>{
    if(title == 'NEW ARRIVALS'){
      router.push('/new-arrivals')
    }
    else{
      router.push('/category')
    }
  }
 
    return (
       <Container className="py-14 border-b border-[#0000001A]">
                <h2 className="text-center font-bold text-5xl text-black uppercase">{title}</h2>

           {
            !productsLoading ? <>
              <div className="py-10 grid grid-cols-[repeat(auto-fit,minmax(295px,1fr))] gap-6">
                {
                  products && products.slice(0,3).map((product,index)=>{
                     return <ProductCard product={product} key={index}/>
                  })
                }
             </div>
            <div className="flex w-full justify-center">
                 <Button  onClick={handleClick} className="border hover:text-white border-[#0000001A] w-[218px] h-[52px] rounded-[62px] py-4 px-[54px] font-medium text-black bg-transparent mx-auto">
                View All
             </Button>
            </div>
            </>

            : <div className="py-10 grid grid-cols-[repeat(auto-fit,minmax(295px,1fr))] gap-6">
                {
                  [1,2,3,4,5,6].map((index)=>{
                     return <ProductCardSkeleton key={index}/>
                  })
                }
             </div>
           }
             </Container>
    )
}
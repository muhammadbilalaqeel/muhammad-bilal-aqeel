"use client"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Container from "../components/Container/Container";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CartCard from "../components/CartCard";
import CartSummary from "../components/CartSummary";
import { useGetCartQuery } from "@/redux/api/cartApi";
import { CartItem } from "@/types/cart.types";

export default function Cart(){
    const {data} = useGetCartQuery()
    const cartItems = data?.cart.items;
     const { subtotal, totalDiscount, total } = cartItems
    ? calculateCartTotals(cartItems)
    : { subtotal: 0, totalDiscount: 0, total: 0 };
    console.log(cartItems)
    return (
         <div className="py-8">
      <Container>
        {/* Breadcrumb */}
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-[#00000099]" href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#00000099]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-base text-black capitalize">
                  Cart
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>


        <div className="py-8">
            <h2 className="text-black font-bold text-[40px] uppercase">Your cart</h2>
            <div className="mt-6 flex justify-between gap-4">
                {
                    cartItems && cartItems?.length > 0 ? <div className="max-w-[715px] h-fit w-full rounded-[20px]  px-6 flex flex-col border border-[#0000001A]">
                    {
                        cartItems && cartItems.map((item,index)=>{
                            return <CartCard item={item} key={index}/>
                        })
                    }
                </div> : <p>No items in cart</p>
                }

                <div>
                    <CartSummary subtotal={subtotal} total ={total} totalDiscount={totalDiscount} />
                </div>
            </div>
        </div>
        </Container>
        </div>
    )
}


export function calculateCartTotals(cartItems : CartItem[]) {
  let subtotal = 0;
  let totalDiscount = 0;

  cartItems.forEach((item) => {
    const price = item.product.price; // original price
    const quantity = item.quantity;
    const discount = item.product.onSale
      ? (price * item.product.discountPercentage!) / 100
      : 0;

    subtotal += price * quantity;
    totalDiscount += discount * quantity;
  });

  const total = subtotal - totalDiscount;

  return { subtotal, totalDiscount, total };
}

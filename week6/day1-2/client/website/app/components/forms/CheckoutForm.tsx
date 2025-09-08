"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetCartQuery } from "@/redux/api/cartApi";
import { calculateCartTotals } from "@/app/cart/page";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import Container from "../Container/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useGetLoyaltyPointsQuery, useGetUpdateLoyaltyPointsMutation } from "@/redux/api/authApi";


const paymentMethodEnum = z.enum(["card", "cash"] as const, {
  message: "Please select a payment method",
});

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().optional(),

  paymentMethod: paymentMethodEnum,

  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardHolder: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "card") {
    if (!data.cardHolder) ctx.addIssue({ code: "custom", path: ["cardHolder"], message: "Name is required" });
    if (!data.cardNumber) ctx.addIssue({ code: "custom", path: ["cardNumber"], message: "Number is required" });
    if (!data.expiryDate) ctx.addIssue({ code: "custom", path: ["expiryDate"], message: "Date is required" });
    if (!data.cvv) ctx.addIssue({ code: "custom", path: ["cvv"], message: "CVV is required" });
  }
});


type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutPageProps {
  cartItems?: {
    product: {
      _id: string;
      name: string;
      images: string[];
    };
    variant: string;
    size: string;
    quantity: number;
    price: number;
  }[];
}

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("cash");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [placedOrder,{isLoading:placedOrderLoading}] = useCreateOrderMutation()
      const {data,refetch} = useGetCartQuery()
const [loyaltyPoints, setLoyaltyPoints] = useState(0);
const [loyaltyDiscount, setLoyaltyDiscount] = useState(0);
// const [availablePoints, setAvailablePoints] = useState(0);
const [loyaltyError, setLoyaltyError] = useState("");
const [updatePoints] = useGetUpdateLoyaltyPointsMutation()
const {data: points} = useGetLoyaltyPointsQuery()
const availablePoints = points?.loyaltyPoints!
const handleLoyaltyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const points = Number(e.target.value);

  if (points > availablePoints) {
    setLoyaltyError(`You only have ${availablePoints} points`);
    setLoyaltyPoints(points);
    setLoyaltyDiscount(0);
    return;
  }

  setLoyaltyError("");
  setLoyaltyPoints(points);

  const discountPercent = points / 100;
  const discountValue = (total * discountPercent) / 100;
  setLoyaltyDiscount(discountValue);
};


      const cartItems = data?.cart.items;
      console.log(cartItems)
       const { subtotal, totalDiscount, total } = cartItems
      ? calculateCartTotals(cartItems)
      : { subtotal: 0, totalDiscount: 0, total: 0 };
      const cartItemsWithPrice = cartItems && cartItems.map(item => {
  const discountedPrice = item.product.onSale
    ? Math.round(item.product.price - (item.product.price * (item.product.discountPercentage ?? 0)) / 100)
    : Math.round(item.product.price);

  return {
    ...item,
    discountedPrice, 
  };
});

const { register, handleSubmit, setError, formState: { errors }, setValue } = useForm<CheckoutFormValues>({
  resolver: zodResolver(checkoutSchema),
  mode: "onChange",
  defaultValues: {
    paymentMethod: "cash",  // ✅ Default value for form
  },
});






 const onSubmit = async (data: CheckoutFormValues) => {
  setIsLoading(true);
  if (paymentMethod === "card") {
  if (!data.cardHolder) {
    setError("cardHolder", { message: "Card holder name is required" });
    return;
  }
  if (!data.cardNumber) {
    setError("cardNumber", { message: "Card number is required" });
    return;
  }
  if (!data.expiryDate) {
    setError("expiryDate", { message: "Expiry date is required" });
    return;
  }
  if (!data.cvv) {
    setError("cvv", { message: "CVV is required" });
    return;
  }
}


  try {
    const orderData = {
      products: cartItemsWithPrice?.map(item => ({
        product: item.product._id,
        variant: item.variant.color,
        size: item.variant.size,
        quantity: item.quantity,
        price: item.discountedPrice,
      })),
      totalAmount: total - loyaltyDiscount,
      shippingAddress: {
        fullName: data.fullName,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        country: data.country,
        phone: data.phone,
      },
      paymentInfo: {
        method: data.paymentMethod,
        status: "pending",
      },
    };

    // Create the order first
    const res = await placedOrder(orderData).unwrap();
    toast.success("Order placed successfully!");

    // Deduct loyalty points if used
    console.log(loyaltyPoints)
    if (loyaltyPoints > 0) {
     const res = await updatePoints({ points: loyaltyPoints }).unwrap();
     console.log(res)
    }

    // Refresh cart and loyalty points after order
    refetch();
    router.push("/");
  } catch (err: any) {
    if ("data" in err) {
      toast.error(err.data?.message || "Order failed!");
    } else {
      toast.error(err.message || "Something went wrong!");
    }
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen  py-10">
      <Container>
           <div>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink className="text-[#00000099]" href="/">Home</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-[#00000099]" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-base text-black capitalize">
                          Checkout
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
      </Container>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
            
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Checkout
          </h1>
          <p className="text-center text-gray-600">Complete your order</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipping & Payment Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-[#F0F0F0] border border-gray-300 shadow-2xl rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="text-gray-700 font-medium">
                          Full Name
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Enter full name"
                          className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          {...register("fullName")}
                        />
                        {errors.fullName && (
                          <p className="text-red-500 text-sm font-medium">
                            {errors.fullName.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 font-medium">
                          Phone (Optional)
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter phone number"
                          className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          {...register("phone")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="street" className="text-gray-700 font-medium">
                        Street Address
                      </Label>
                      <Input
                        id="street"
                        type="text"
                        placeholder="Enter street address"
                        className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        {...register("street")}
                      />
                      {errors.street && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.street.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700 font-medium">
                          City
                        </Label>
                        <Input
                          id="city"
                          type="text"
                          placeholder="Enter city"
                          className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          {...register("city")}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm font-medium">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-gray-700 font-medium">
                          State
                        </Label>
                        <Input
                          id="state"
                          type="text"
                          placeholder="Enter state"
                          className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          {...register("state")}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm font-medium">
                            {errors.state.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zip" className="text-gray-700 font-medium">
                          ZIP Code
                        </Label>
                        <Input
                          id="zip"
                          type="text"
                          placeholder="Enter ZIP code"
                          className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                          {...register("zip")}
                        />
                        {errors.zip && (
                          <p className="text-red-500 text-sm font-medium">
                            {errors.zip.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-gray-700 font-medium">
                        Country
                      </Label>
                      <Input
                        id="country"
                        type="text"
                        placeholder="Enter country"
                        className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                        {...register("country")}
                      />
                      {errors.country && (
                        <p className="text-red-500 text-sm font-medium">
                          {errors.country.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-[#F0F0F0] border border-gray-300 shadow-2xl rounded-2xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod" className="text-gray-700 font-medium">
                        Payment Method
                      </Label>
<Select
  onValueChange={(value: "card" | "cash") => {
    setPaymentMethod(value);
    setValue("paymentMethod", value, { shouldValidate: true }); // ✅ Force validation when changing method
  }}
  defaultValue="cash"
>


                        <SelectTrigger className="bg-white border-gray-300 text-gray-800 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="cash">Cash on Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardHolder" className="text-gray-700 font-medium">
                            Card Holder Name
                          </Label>
                          <Input
                            id="cardHolder"
                            type="text"
                            placeholder="Enter card holder name"
                            className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            {...register("cardHolder")}
                          />
                          {errors.cardHolder && (
                            <p className="text-red-500 text-sm font-medium">
                              {errors.cardHolder.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cardNumber" className="text-gray-700 font-medium">
                            Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                            {...register("cardNumber")}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm font-medium">
                              {errors.cardNumber.message}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate" className="text-gray-700 font-medium">
                              Expiry Date
                            </Label>
                            <Input
                              id="expiryDate"
                              type="text"
                              placeholder="MM/YY"
                              className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                              {...register("expiryDate")}
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-sm font-medium">
                                {errors.expiryDate.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cvv" className="text-gray-700 font-medium">
                              CVV
                            </Label>
                            <Input
                              id="cvv"
                              type="text"
                              placeholder="123"
                              className="bg-white border-gray-300 text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
                              {...register("cvv")}
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-sm font-medium">
                                {errors.cvv.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-[#F0F0F0] border border-gray-300 shadow-2xl rounded-2xl sticky top-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-6">
                  <div className="space-y-4">
  {cartItemsWithPrice && cartItemsWithPrice.length > 0 ? (
    <>
      {cartItemsWithPrice.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-2 border-b border-gray-200"
        >
          <div className="flex-1">
            <h4 className="font-medium text-gray-800">{item.product.name}</h4>
            <p className="text-sm text-gray-600">
              {item.variant.color} • {item.variant.size} • Qty: {item.quantity}
            </p>
          </div>
          <p className="font-semibold text-gray-800">
            ${item.discountedPrice * item.quantity}
          </p>
        </div>
      ))}
{/* Loyalty Points Input */}
{availablePoints > 0 && (
  <div className="pt-4">
    <Label className="text-gray-700 font-medium">
      Apply Loyalty Points (You have {availablePoints} points)
    </Label>
    <Input
      type="number"
      value={loyaltyPoints}
      onChange={handleLoyaltyChange}
      placeholder="Enter loyalty points"
      className={`bg-white border ${
        loyaltyError ? "border-red-500" : "border-gray-300"
      } text-gray-800 placeholder-gray-500 h-11 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 mt-2`}
    />
    {loyaltyError && (
      <p className="text-sm text-red-600 mt-1">{loyaltyError}</p>
    )}
    {!loyaltyError && loyaltyPoints > 0 && (
      <p className="text-sm text-green-600 mt-1">
        Discount: -${loyaltyDiscount.toFixed(2)}
      </p>
    )}
  </div>
)}


      {/* Total Price After Discount */}
      <div className="pt-4 border-t-2 border-gray-300">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-800">Total:</p>
          <p className="text-xl font-bold text-gray-800">
            ${(total - loyaltyDiscount).toFixed(2)}
          </p>
        </div>
      </div>
    </>
  ) : (
    <p className="text-gray-600 text-center py-8">No items in cart</p>
  )}

  <Button
    type="submit"
    onClick={handleSubmit(onSubmit)}
    disabled={isLoading || (cartItems && cartItems.length === 0)}
    className="w-full bg-[#000000] hover:bg-gray-800 text-white font-semibold py-3 h-12 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-[1.02] mt-6"
  >
    {isLoading
      ? "Processing..."
      : `Place Order - $${(total - loyaltyDiscount).toFixed(2)}`}
  </Button>
</div>

                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";

import Button from "../shared/buttons/button";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
} from "../../services/cartServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDecreaseQuantityMutation, useGetCartProductsQuery, useIncreaseQuantityMutation, useRemoveItemFromCartMutation } from "../../redux/apiSlice";

const CartItems = ({subtotal,cartProducts}) => {
  const { isLoading } = useGetCartProductsQuery();
  const [increaseQuantity] = useIncreaseQuantityMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const [removeItem] = useRemoveItemFromCartMutation();
  const handleIncrease = async (id) => {
    let result = await increaseQuantity(id);
    if (result?.data?.success) toast.success(result.data.message);
  };

  const handleDecrease = async (id) => {
    let result = await decreaseQuantity(id);
    if (result?.data?.success) toast.success(result.data.message);
  };

  const handleRemove = async (id) => {
    let result = await removeItem(id);
    if (result?.data?.success) toast.success(result.data.message);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="sm:w-[455px] font-montserrat mb-12">
      {cartProducts.length > 0 ? (
        cartProducts.map((product) => (
          <div
            key={product.cartItemId}
            className="flex items-center gap-2 sm:gap-4 w-full py-3"
          >
            <div className="w-12 h-12 sm:w-[71px] sm:h-[71px]">
              <img
                src={`${product.image}`}
                className="h-full w-full object-cover rounded"
              />
            </div>
            <div className="flex flex-col sm:gap-3 justify-between w-full">
              <div className="flex justify-between w-full">
                <p className="text-[8px] sm:text-sm w-[100px] sm:w-[200px]">
                  {product.name} - {product.variant}
                </p>
                <div className="flex items-center justify-between w-[50px] sm:w-[70px]">
                  <span
                    className="cursor-pointer"
                    onClick={() => handleDecrease(product.cartItemId)}
                  >
                    <FaMinus size={14} />
                  </span>
                  <span className="text-sm sm:text-xl">{product.quantity}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => handleIncrease(product.cartItemId)}
                  >
                    <FaPlus size={14} />
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <button
                  onClick={() => handleRemove(product.cartItemId)}
                  className="uppercase cursor-pointer text-[10px] sm:text-sm text-gray-600 hover:text-red-600"
                >
                  remove
                </button>
                <span className="text-[12px] sm:text-sm">€{product.price}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No Item in cart</p>
      )}

      <div className="border-b border-[#A0A0A0] mt-4 mx-6"></div>

      <div className="flex items-center justify-between py-8 w-full">
        <span>subtotal</span>
        <span className="font-medium">€{subtotal}</span>
      </div>
      <div className="flex items-center justify-center w-full">
        <Button className="border">back to shopping</Button>
      </div>
    </div>
  );
};

export default React.memo(CartItems);

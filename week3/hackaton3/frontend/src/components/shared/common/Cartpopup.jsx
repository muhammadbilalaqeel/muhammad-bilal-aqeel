import { useEffect, useState } from "react";
import Button from "../buttons/button";
import {
  useGetCartProductsQuery,
  useIncreaseQuantityMutation,
  useDecreaseQuantityMutation,
  useRemoveItemFromCartMutation,
} from "../../../redux/apiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { X } from "lucide-react";

const CartPopup = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [delivery] = useState(3.5);
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useGetCartProductsQuery();
  const cartProducts = data?.data || [];

  const [increaseQuantity] = useIncreaseQuantityMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const [removeItemFromCart] = useRemoveItemFromCartMutation();

  const subtotal = cartProducts.reduce(
    (total, current) => total + (current.total || 0),
    0
  );
  const total = subtotal + (cartProducts.length > 0 ? delivery : 0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const handlePurchaseBtn = () => {
    navigate("/cart");
    handleClose();
  };

  const handleIncreaseQuantity = async (id) => {
    try {
      const result = await increaseQuantity(id).unwrap();
      toast.success(result?.message);
      // refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleDecreaseQuantity = async (id) => {
    try {
      const result = await decreaseQuantity(id).unwrap();
      toast.success(result?.message);
      // refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  const handleRemoveBtn = async (id) => {
    try {
      const result = await removeItemFromCart(id).unwrap();
      toast.success(result?.message);
  
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    // overlay
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-end z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* popup drawer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-[261px] sm:w-[500px] h-screen flex flex-col shadow-xl py-6 sm:py-11 px-3 sm:px-6 font-sans transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* cart items */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between pb-6">
            <h2 className="text-xl capitalize">my bag</h2>
            <button onClick={handleClose} className="cursor-pointer">
              <X />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
              </div>
            ) : cartProducts.length > 0 ? (
              cartProducts.map((product) => (
                <div
                  key={product.cartItemId}
                  className="flex items-center gap-2 sm:gap-4 w-full py-3"
                >
                  {/* image - left*/}
                  <div className="w-12 h-12 sm:w-[71px] sm:h-[71px]">
                    <img
                      src={
                        `${
                          product.image
                        }` || "/placeholder.svg"
                      }
                      className="h-full w-full object-cover rounded"
                    />
                  </div>
                  {/* right */}
                  <div className="flex flex-col sm:gap-3 justify-between w-full">
                    {/* description + items btn */}
                    <div className="flex justify-between w-full">
                      <p className="text-[8px] sm:text-sm w-[100px] sm:w-[200px]">
                        {product.name} - {product?.variant}
                      </p>
                      <div className="flex items-center justify-between w-[50px] sm:w-[70px]">
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            handleDecreaseQuantity(product.cartItemId)
                          }
                        >
                          <FaMinus size={14} />
                        </span>
                        <span className="text-sm sm:text-xl">
                          {product.quantity}
                        </span>
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            handleIncreaseQuantity(product.cartItemId)
                          }
                        >
                          <FaPlus size={14} />
                        </span>
                      </div>
                    </div>
                 
                    <div className="flex items-center justify-between text-sm">
                      <button
                        onClick={() => handleRemoveBtn(product.cartItemId)}
                        className="uppercase cursor-pointer text-[10px] sm:text-sm text-gray-600 hover:text-red-600"
                      >
                        remove
                      </button>
                      <span className="text-[12px] sm:text-sm">
                        €{product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Item in cart</p>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 mt-6 sm:mt-0">
          {/* divider */}
          <div className="border-b border-[#A0A0A0] hidden sm:block my-4"></div>
          {/* sub total */}
          <div className="flex items-center justify-between w-full py-2">
            <span className="text-xs sm:text-base">Subtotal</span>
            <span className="font-medium text-base">
              €{cartProducts.length > 0 ? subtotal : 0}
            </span>
          </div>
          {/* delivery */}
          <div className="flex items-center justify-between w-full pb-2 pt-2">
            <span className="text-xs sm:text-base">Delivery</span>
            <span className="font-medium text-base">
              €{cartProducts.length > 0 ? delivery : 0}
            </span>
          </div>
          {/* divider */}
          <div className="border-b border-[#A0A0A0] my-4"></div>
          {/* total */}
          <div className="flex items-center justify-between w-full pb-2">
            <span className="font-medium text-base">Total</span>
            <span className="font-medium text-xl">
              €{cartProducts.length > 0 ? total : 0}
            </span>
          </div>

          <Button
            onClick={handlePurchaseBtn}
            className="bg-[#282828] text-white w-full my-3"
          >
            purchase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;

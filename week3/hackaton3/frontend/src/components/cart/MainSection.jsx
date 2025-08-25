import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { useGetCartProductsQuery } from "../../redux/apiSlice";

const MainSection = () => {
  const { data, isLoading, refetch } = useGetCartProductsQuery();
 const cartProducts = data?.data || [];
  const delivery = 3.5;

  
  const subtotal = cartProducts.reduce(
    (total, current) => total + (current.total || 0),
    0
  );
  const total = subtotal + (cartProducts.length > 0 ? delivery : 0);

  if (isLoading) {
    return <p className="text-center py-6">Loading cart...</p>;
  }

  return (
    <div className="py-6 flex flex-col lg:flex-row items-center lg:items-start justify-between">
      <CartItems
        subtotal={subtotal}
        cartProducts={cartProducts}
        total={total}
        fetchCartProducts={refetch} 
      />
      <OrderSummary subtotal={subtotal} total={total} delivery={delivery} />
    </div>
  );
};

export default MainSection;

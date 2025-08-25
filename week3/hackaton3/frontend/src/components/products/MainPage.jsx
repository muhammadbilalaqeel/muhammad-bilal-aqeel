import Sidebar from './Sidebar'
import ProductsGrid from './ProductsGrid'
import Container from '../shared/common/Container'
import { useState } from 'react';

const MainPage = () => {
     const [products, setProducts] = useState([]);
     const [isLoading,setIsLoading] = useState(false);
     const [isError,setIsError] = useState(false)
  const handleProductsFiltered = (filtered,loading,error) => {
    setProducts(filtered);
    setIsLoading(loading);
    setIsError(error);
  };
    return (
        <div className='flex items-center justify-center py-6'>
            <Container>
                <div className='px-6 sm:px-10 lg:px-12 flex justify-between gap-20'>
                    <Sidebar  onProductsFiltered={handleProductsFiltered}/>
                    <ProductsGrid products={products} isError={isError} isLoading={isLoading} />
                </div>
            </Container>
        </div>
    )
}

export default MainPage
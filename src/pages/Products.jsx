import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { useEffect } from "react";
import { addToCart } from "../redux/cartSlice";
import Loader from "../components/Loader";
import {
  selectProducts,
  selectProductsStatus,
  selectProductsError,
  selectProductCount,
} from "../redux/productsSlice";

function Products() {
  const dispatch = useDispatch();

  const items = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);
  const productCount = useSelector(selectProductCount);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  if (status === "loading") {
    return <Loader />;
  }
  if (status === "failed") {
    return (
      <div className="text-center mt-15">
        <p className="text-xl font-bold mb-4">{error}</p>
        <button
          onClick={() => dispatch(fetchProducts())}
          className="btn-primary py-2 px-4"
        >
          Try Again
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="container mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <p className="text-gray-600 mb-4">Total Products: {productCount}</p>
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch">
          {items &&
            items.map((product) => {
              return (
                <div
                  key={product.id}
                  className="border-2 border-gray-200 rounded-sm pl-3 flex flex-col h-full"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full object-contain aspect-square rounded-sm pt-2"
                  />
                  <h3 className="font-bold text-base my-2 text-gray-900 hover:underline">
                    {product.title}
                  </h3>
                  <p className="my-2 line-clamp-4">{product.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="btn-primary py-1 px-2"
                    >
                      Add to Cart
                    </button>
                    <p className="font-bold my-2 mx-4 text-md text-gray-700">
                      {product.price}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default Products;

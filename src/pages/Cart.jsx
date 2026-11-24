import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../redux/cartSlice";

function Cart() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto mt-17 px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="bi bi-bag-x-fill mx-auto"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M6.854 8.146a.5.5 0 1 0-.708.708L7.293 10l-1.147 1.146a.5.5 0 0 0 .708.708L8 10.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 10l1.147-1.146a.5.5 0 0 0-.708-.708L8 9.293z"
            />
          </svg>
          <h1 className="text-xl mt-2">Cart is Empty</h1>
          <Link
            to="/products"
            className="btn-secondery py-1.5 px-2 font-medium text-sm"
          >
            Products
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container mx-auto mt-15 px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr className="*:font-medium *:text-gray-800">
                <th className="px-3 py-2 whitespace-nowrap">Product</th>
                <th className="px-3 py-2 whitespace-nowrap">Price</th>
                <th className="px-3 py-2 whitespace-nowrap">Quantity</th>
                <th className="px-3 py-2 whitespace-nowrap">Subtotal</th>
                <th className="px-3 py-2 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
              {cartItems.map((product) => {
                return (
                  <tr
                    key={product.id}
                    className="*:text-gray-900 *:first:font-medium"
                  >
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex gap-x-4">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="aspect-square size-20 rounded-sm object-contain"
                        />
                        <div>
                          <h1 className="font-bold text-base">
                            {product.title}
                          </h1>
                          <p className="truncate max-w-100 text-sm text-gray-500 mt-2">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {product.price}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <button
                          onClick={() => dispatch(decreaseQuantity(product.id))}
                          className="btn-secondery mx-2 px-2"
                        >
                          -
                        </button>
                        <p>{product.quantity}</p>
                        <button
                          onClick={() => dispatch(increaseQuantity(product.id))}
                          className="btn-secondery px-1.5 mx-2"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {product.quantity * product.price}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <button
                        onClick={() => dispatch(removeFromCart(product.id))}
                        className="cursor-pointer rounded-sm border border-red-600 bg-red-600 text-white py-1 px-2 font-medium text-sm hover:bg-white hover:border-red-600 hover:border-2 hover:text-red-600 active:bg-red-600/75 active:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr />
          <div className="mt-5 flex justify-between items-center">
            <button
              onClick={() => dispatch(clearCart())}
              className="btn-secondery py-1.5 px-2 font-medium text-sm mx-2"
            >
              Clear Cart
            </button>
            <h1 className="text-xl font-bold">Total: {cartTotal.toFixed(2)}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
export default Cart;

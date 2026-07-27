import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { HiOutlineTruck } from "react-icons/hi2";
import { MdDeleteOutline, MdCurrencyRupee } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loginUserContext } from "../context/AuthContext";
import CartBlock from "../components/ProductCard/CartBlock";
import { CartCountContext } from "../context/CountContext";
import CheckoutBlock from "../components/ProductCard/CheckoutBlock";
import { checkoutContext } from "../context/CheckoutContexf";

const API_URL = import.meta.env.VITE_API_URL || "";

export default function FetchCart() {
  const [cart, setCart] = useState(null);
  const {setCount} = useContext(CartCountContext)
  const {payment,setPayment}=useContext(checkoutContext)
  const { isLoggined } = useContext(loginUserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/cart`, {
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to fetch cart");
      }

      setCart(result.cart || null);
    } catch (err) {
      setCart(null);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggined) {
      setCart(null);
      setLoading(false);
      setError("");
      return;
    }

    fetchCart();
  }, [isLoggined, fetchCart]);

  async function removeItem(productId) {
    try {
      const response = await fetch(`${API_URL}/api/cart/remove`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to remove item");
      }

      fetchCart();
    } catch (err) {
      setError(err.message);
    }
  }

  const totalItems = useMemo(() => {
    if (!cart?.items) return 0;

    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    if (!cart?.items) return 0;

    return cart.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }, [cart]);

  setCount(totalItems)

  return (
    <>
      <Navbar />
      {payment&&<CheckoutBlock/>}
      {isLoggined ? (
        <main className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100 pt-24 pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <HiOutlineShoppingBag className="text-3xl text-slate-800" />

              <h1 className="text-3xl font-bold text-slate-900">
                Your Cart
              </h1>

              {totalItems > 0 && (
                <span className="ml-2 rounded-full bg-slate-900 px-3 py-1 text-sm text-white">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            )}

            {loading ? (
              <div className="py-20 text-center text-lg">Loading...</div>
            ) : !cart || cart.items.length === 0 ? (
              <EmptyCart />
            ) : (
              <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
                <div className="space-y-4">
                  {cart.items.map((item) => {
                    const product = item.product;
                    const productId =
                      product?._id || item.productId || item.product;

                    return (
                      <CartBlock
                        key={productId}
                        productId={productId}
                        image={product?.image}
                        title={product?.title}
                        price={item.price}
                        quantity={item.quantity}
                        estDelivery={product?.estDelivery}
                        onRemove={removeItem}
                      />
                    );
                  })}
                </div>

                <aside>
                  <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-lg font-semibold">
                      Order Summary
                    </h2>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal ({totalItems} items)</span>

                        <span className="flex items-center font-semibold">
                          <MdCurrencyRupee />
                          {subtotal}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Delivery</span>

                        <span className="font-semibold text-green-600">
                          FREE
                        </span>
                      </div>

                      <hr />

                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>

                        <span className="flex items-center">
                          <MdCurrencyRupee />
                          {subtotal}
                        </span>
                      </div>
                    </div>

                    <button className="mt-6 w-full rounded-xl bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600" onClick={()=>{
                      setPayment(true)
                      console.log(payment)
                     }
                      }>
                      Proceed to Checkout
                    </button>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </main>
      ) : (
        <SignInCart />
      )}

      <Footer />
    </>
  );
}

function EmptyCart() {
  return (
    <div className="rounded-2xl bg-white p-16 text-center">
      <HiOutlineShoppingBag className="mx-auto mb-6 text-6xl text-slate-400" />

      <h2 className="text-2xl font-bold">Your cart is empty</h2>

      <p className="mt-3 text-slate-500">
        Looks like you haven't added anything yet.
      </p>

      <Link
        to="/"
        className="mt-8 inline-block rounded-xl bg-slate-900 px-6 py-3 text-white"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

function SignInCart() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 pt-20">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center">
        <HiOutlineShoppingBag className="mx-auto mb-6 text-6xl text-orange-500" />

        <h1 className="text-2xl font-bold">Sign in to view your cart</h1>

        <p className="mt-3 text-slate-500">
          Login to access your shopping cart.
        </p>

        <Link
          to="/login"
          className="mt-8 block rounded-xl bg-orange-500 py-3 text-white hover:bg-orange-600"
        >
          Login
        </Link>

        <p className="mt-5 text-sm">
          New here?{" "}
          <Link to="/register" className="font-semibold text-orange-500">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
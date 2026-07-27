import { useContext } from "react";
import { checkoutContext } from "../../context/CheckoutContexf";
import { MdClose } from "react-icons/md";
import { FaCreditCard } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function CheckoutBlock() {
  const { setPayment } = useContext(checkoutContext);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Checkout
            </h1>
            <p className="text-sm text-slate-500">
              Secure payment gateway
            </p>
          </div>

          <button
            onClick={() => setPayment(false)}
            className="rounded-full p-2 transition hover:bg-slate-100"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
            <FaCreditCard className="text-5xl text-orange-500" />
          </div>

          <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
            Payment Coming Soon
          </h2>

          <p className="mt-3 text-center text-slate-500">
            Payment integration hasn't been added yet.
            This feature will be available in the next version of SuperShop.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <FaCreditCard className="text-2xl text-blue-600" />
              <div>
                <h3 className="font-semibold">
                  Credit & Debit Cards
                </h3>
                <p className="text-sm text-slate-500">
                  Visa, Mastercard & RuPay support.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <HiOutlineShoppingBag className="text-2xl text-orange-500" />
              <div>
                <h3 className="font-semibold">
                  UPI & Wallets
                </h3>
                <p className="text-sm text-slate-500">
                  Google Pay, PhonePe, Paytm and more.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <BsShieldCheck className="text-2xl text-green-600" />
              <div>
                <h3 className="font-semibold">
                  Secure Payments
                </h3>
                <p className="text-sm text-slate-500">
                  All future payments will be encrypted and secure.
                </p>
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-3">

            <button
              disabled
              className="w-full cursor-not-allowed rounded-xl bg-slate-300 py-3 font-semibold text-slate-600"
            >
              Place Order (Coming Soon)
            </button>

            <button
              onClick={() => setPayment(false)}
              className="w-full rounded-xl border border-orange-500 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Continue Shopping
            </button>

          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            🚀 Payment integration will be available soon.
          </p>

        </div>
      </div>
    </div>
  );
}
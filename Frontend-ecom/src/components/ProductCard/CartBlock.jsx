import { HiOutlineTruck } from "react-icons/hi2";
import { MdDeleteOutline, MdCurrencyRupee } from "react-icons/md";

function CartBlock({
  productId,
  image,
  title,
  price,
  quantity,
  estDelivery,
  onRemove,
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row">
      <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-100 sm:w-44">
        <img
          src={image || "/placeholder.png"}
          alt={title || "Cart product"}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
          className="h-36 object-contain"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-semibold">
          {title || "Product unavailable"}
        </h2>

        {estDelivery && (
          <div className="mt-2 flex items-center gap-2 text-green-700">
            <HiOutlineTruck />
            Delivery by {estDelivery}
          </div>
        )}

        <div className="mt-4 flex items-center text-2xl font-bold">
          <MdCurrencyRupee />
          {(price)}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span>Qty : {quantity}</span>
          <button
            type="button"
            onClick={() => {
              onRemove(productId);
            }}
            className="ml-auto flex items-center gap-2 rounded-lg px-4 py-2 text-red-600 transition hover:bg-red-600 hover:text-white"
          >
            <MdDeleteOutline />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartBlock;
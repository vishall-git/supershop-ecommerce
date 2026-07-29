import { MdCurrencyRupee } from "react-icons/md";

export default function ProductSkeleton() {
  return (
    <div
      className="inline-block h-full w-50 rounded-2xl p-1 animate-pulse
      border border-slate-200"
    >
      {/* Image */}
      <div className="h-60 w-full rounded-xl bg-slate-300"></div>

      {/* Title */}
      <div className="mt-3 h-4 w-4/5 rounded bg-slate-300"></div>
      <div className="mt-2 h-4 w-2/3 rounded bg-slate-300"></div>

      {/* Quantity */}
      <div className="mt-4 h-8 w-16 rounded bg-slate-300"></div>

      {/* Price */}
      <div className="mt-4 flex items-center gap-1">
        <MdCurrencyRupee className="text-slate-300" />
        <div className="h-4 w-20 rounded bg-slate-300"></div>
      </div>

      {/* Button */}
      <div className="mx-auto mt-6 h-10 w-40 rounded-lg bg-slate-300"></div>
    </div>
  );
}
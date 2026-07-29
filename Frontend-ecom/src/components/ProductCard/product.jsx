import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { MdCurrencyRupee } from "react-icons/md";
import { CartCountContext } from "../../context/CountContext";
import ProductSkeleton from "../skeleton/skeleton";
import { productArrayContext } from "../../context/ProductArrayContext";

export default function Products() {
  const { searched, setSearched, data, setData } = useContext(productArrayContext)
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const result = await response.json();
      setData(result.product);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  if (searched && data.length === 0) {
    return (
      <div className="text-center  py-35 h-150">
        <h2 className="text-2xl font-bold">No products found</h2>
        <p className="text-gray-500">
          Try searching with another keyword.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-5
      gap-7
      w-full
      ml-9
      pt-30"
    >
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))
        : data.map((product) => (
          <ProductBlock
            key={product._id}
            product={product._id}
            img={product.image}
            title={product.title}
            price={product.price}
          />
        ))}
    </div>
  );
}


function ProductBlock({ product, img, title, price }) {
  const navigate = useNavigate();
  const { setCount } = useContext(CartCountContext)
  const [quantity, setQuantity] = useState(1);
  async function handleCart() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            items: [{
              product: product,
              quantity: Number(quantity),
              price: price,
            }]
          })
        }
      )
      const result = await response.json()
      if (response.status === 200) {
        setCount(Number(result.cart.items.length))
      }
      if (response.status === 401) {
        navigate("/login")
        return;
      }
    } catch (err) {
      console.log(err.message)
    }
  }
  return (
    <div className="inline-block h-full p-1 w-50 items-center rounded-2xl 
        hover:shadow-2xl ">

      <div className="h-60 mb-2">
        <img src={img} alt='img' className="h-full w-full object-full rounded-xl  " />
      </div>
      <span className="p-1 pb-2 font-[poppins] w-full block ">{title}</span>
      <select className="ml-2 pr-2 shadow rounded mb-2" onChange={(e) => setQuantity(e.target.value)}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
      <div className="flex items-center p-1">
        <MdCurrencyRupee className="mt-0.5" />
        <span className="text-black  flex-row ">{price}</span>
      </div>
      <button
        className="bg-[#084F2D] w-40  text-white rounded-lg my-5 mx-auto
                flex justify-center p-2
                active:scale-110 duration-300"
        onClick={handleCart}>
        Add to cart</button>

    </div>
  )
}
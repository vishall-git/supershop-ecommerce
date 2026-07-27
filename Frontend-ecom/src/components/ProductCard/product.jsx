import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { MdCurrencyRupee } from "react-icons/md";
import { CartCountContext } from "../../context/CountContext";



export default function Products() {
    const [data, setData] = useState([]);
    const fetchProducts = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`);
        const result = await response.json();
        setData(result.product)
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="grid 
        grid-cols-1
        md:grid-cols-2 
        lg:grid-cols-5
        align-center  
        gap-7 w-full 
        ml-9 pt-30">
            {data.map((product) => (
                <ProductBlock
                    key={product._id}
                    id={product._id}
                    img={product.image}
                    title={product.title}
                    price={product.price}
                    product={product}
                />
            ))}
        </div >
    )
}


function ProductBlock({ product, img, title, price }) {
    const navigate = useNavigate();
    const { count, setCount } = useContext(CartCountContext)
    const [quantity, setQuantity] = useState(1);
    async function handleCart() {
        try {
            setCount(Number(count) + 1)
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
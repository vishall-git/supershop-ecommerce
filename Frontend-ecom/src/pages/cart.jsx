import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from './footer'
export default function Cart(){
    return(
        <div className="h-full flex flex-col pt-26">
        <Navbar/>
        <div className='p-40 pt-60 block mx-auto '>
            <h1 className='font-extrabold text-5xl mb-20 flex justify-center'>Login to see to items</h1>
            <button className="bg-[#fb641b] px-8 py-2 block mx-auto rounded-[3px]">
                <Link to="/login">
                Login
                </Link>
            </button>
        </div>
        <Footer className="bottom-0 right-0"/>
        </div>
    )
}
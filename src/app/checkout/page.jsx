'use client'
import { useState, useEffect } from 'react'

export default function Checkout() {
    const [cart, setCart] = useState([])
    const [checkout, setCheckout] = useState([])
    const [cost, setCost] = useState([])
    const [error, setError] = useState("")

    const [email, setEmail] = useState("")
    const [fullName, setFullName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [pickupTime, setPickupTime] = useState("")
    const [comments, setComments] = useState("")

    useEffect(() => {
        const fetchCart = async () => {
            // setLoading(true)
            try{
                const response = await fetch("/api/checkout", {
                    cache: "no-store",
                    method: "GET"
                });
                if(!response.ok) {
                    throw new Error(response.status)
                }
                const json = await response.json()
                setCart(json.items)
                setCost(json.total)
            } catch (e) {
                setError(e)
            } finally {
                // setLoading(false)
            }
        }
        fetchCart();
        
    }, [])

    const buyNow = async () => {
        const response = await fetch(`/api/sendOrder/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'email': email,
                'fullName': fullName,
                'startDate': startDate,
                'endDate': endDate,
                'pickupTime': pickupTime,
                'cart': cart,
                'cost': cost,
                'comments': comments
            })
        })
        .catch(error => {
            console.error(error)
        })
        const result = await response.json()
        console.log(result)
    }

    const today = new Date().toISOString().split('T')[0];


    return (
        <div className='size-full'>
            {console.log(cart)}
            <h1 className="text-center text-2xl">Checkout</h1>
            <div className='p-5 pb-0'>
                <p className="text-center">How to pay is to either E-transfer or with<br/> cash apon pick-up or drop off</p>
            </div>
            
            <div className='flex flex-col lg:flex-row'>
                    <div className='flex flex-col basis-1/4 p-5'>
                        <div className='w-full h-50 bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border-1 border-gray-200'>
                            <p>Total <br/></p>
                            <p>${cost}</p>
                            
                        </div>
                    </div>
                    <div className='flex flex-col basis-3/4 p-5'>
                        <div className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border-1 border-gray-200'>
                                {cart.map (BakedGood => (
                                    <div key={BakedGood.cartId} className='flex flex-row p-2'>
                                        <div className='h-17.5 w-13 overflow-hidden'>
                                            <img
                                            src={`/Baked_Goods/${BakedGood.item.Thumbnail}`}
                                            className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <div className='size-full flex flex-col sm:flex-row'>
                                            <div className='flex flex-col basis-2/3 sm:basis-2/3 pl-5'>
                                                <p className='text-2xl'>{BakedGood.item.Baked_Name}</p>
                                                <p>{BakedGood.item.Different_varients[BakedGood.selected].Variation_name}</p>
                                            </div>
                                            <div className='flex flex-col md:text-right pl-5 md:pl-0 basis-1/3'>
                                                <p className='text-nowrap'>Quantity: {BakedGood.quantity}</p>
                                                <p>Price: ${BakedGood.item.Different_varients[BakedGood.selected].Prices[0].Cost*BakedGood.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className='flex flex-col basis-1/4 p-5'>
                    <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border-1 border-gray-200'>
                        <div className="mb-4">
                            <label htmlFor="Email_Address" className="block text-gray-700 text-sm mb-2">Email Address</label>
                            <input
                                type="email" id="Email_Address" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                onChange={(e) => setEmail(e.target.value)}
                                value = { email }
                            /> 
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Full_Name" className="block text-gray-700 text-sm mb-2">full name</label>
                            <input 
                                type="text" id="Full_Name" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                onChange={(e) => setFullName(e.target.value)}
                                value = { fullName }
                            />
                        </div>
                        <label htmlFor="Date" className="block text-gray-700 text-sm mb-2">Pickup Date range</label>
                        <div className='flex flex-col xl:flex-row'>
                            <div className="mb-4 basis-full xl:pr-5">
                                <input 
                                    type="date" id="Date" className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  required
                                    onChange={(e) => setStartDate(e.target.value)}
                                    value = { startDate }
                                    min={today}
                                />
                            </div>
                            <div className='flex items-center'>
                                <p className='mb-4'>To</p>
                            </div>
                            
                            <div className="mb-4 basis-full xl:pl-5">
                            <input 
                                type="date" id="Date" className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  required
                                onChange={(e) => setEndDate(e.target.value)}
                                value = { endDate }
                                min={startDate || today}
                            />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="Time" className="block text-gray-700 text-sm mb-2">Pickup Time</label>
                                <input 
                                    type="time" id="Time" className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  required
                                    onChange={(e) => setPickupTime(e.target.value)}
                                    value = { pickupTime }
                                />
                        
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Comments" className="block text-gray-700 text-sm mb-2">Comments</label>
                            <textarea
                                id="Comments" placeholder='e.g. "Cookies should be gluten free"' name="message" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' rows="5" cols="30" 
                                onChange={(e) => setComments(e.target.value)}
                                value = { comments }
                            />
                        </div>
                        <div className="float-right mb-4">
                        <button
                        className='p-5 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded w-min text-nowrap'
                        onClick={(e) => {
                            e.preventDefault();
                            buyNow();
                        }}
                        >
                            Buy Now
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
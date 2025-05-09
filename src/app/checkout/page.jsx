'use client'
import { useState, useEffect } from 'react'

export default function Checkout() {
    const [cart, setCart] = useState([])
    const [checkout, setCheckout] = useState([])
    const [cost, setCost] = useState([])
    const [error, setError] = useState(null)

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
                setCart(json)
            } catch (e) {
                setError(e)
            } finally {
                // setLoading(false)
            }
        }
        fetchCart();
        
    }, [])

    const buyNow = async (order, email, recipient, pickupDate, pickupTime, comments) => {
        // cart.map (BakedGood => (

        // ))
        const response = await fetch(`/api/sendOrder/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'BakedGoodId': BakedGood._id,
                'variation': variation,
                'quantity': quantity
            })
        })
        .catch(error => {
            console.error(error)
        })
        const result = await response.json()
        console.log(result)
    }

    return (
        <div className='size-full'>
            <div className='p-5 pb-0'>
                <p>How to pay is to either E-transfer or with cash<br/> apon pick-up or drop off</p>
            </div>
            
            <div className='flex flex-row'>
                <div className='flex flex-col basis-1/4 p-5'>
                    <form className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border-1 border-gray-200'>
                        <div className="mb-4">
                            <label htmlFor="Email_Address" className="block text-gray-700 text-sm mb-2">Email Address</label>
                            <input type="email" id="Email_Address" required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' /> 
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Full_Name" className="block text-gray-700 text-sm mb-2">full name</label>
                            <input type="text" id="Full_Name" required autoFocus className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                        </div>
                        <label htmlFor="Date" className="block text-gray-700 text-sm mb-2">Pickup Date range</label>
                        <div className='flex flex-row'>
                            <div className="mb-4 basis-full pr-5">
                                <input type="date" id="Date" className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  required />
                            </div>
                            <div className='flex items-center'>
                                <p className='mb-4'>To</p>
                            </div>
                            
                            <div className="mb-4 basis-full pl-5">
                            <input type="date" id="Date" className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  required />
                            </div>
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="Time" className="block text-gray-700 text-sm mb-2">Pickup Time</label>
                                <input type="time" id="Time" className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  required />
                        
                        </div>
                        <div style={{float: "right"}} className="mb-4">
                        <button
                                    className='p-5 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded w-min text-nowrap'
                                    // onClick={() => buyNow(BakedGood, variation)}
                                    >
                                        Buy Now
                                    </button>
                        </div>
                    </form>
                </div>
                    <div className='flex flex-col basis-3/4 p-5'>
                        <div className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border-1 border-gray-200'>
                                {cart.map (BakedGood => (
                                    <div key={BakedGood.item.Different_varients[BakedGood.selected].Variation_name} className='flex flex-row p-2'>
                                        <img
                                            src={`/Baked_Goods/${BakedGood.item.Thumbnail}`}
                                            style={{height: 150, width: 105.0591833}}
                                        />
                                        <div className='flex flex-col basis-2/3 pl-5'>
                                            <p className='text-2xl'>{BakedGood.item.Baked_Name}</p>
                                            <p>{BakedGood.item.Different_varients[BakedGood.selected].Variation_name}</p>
                                        </div>
                                        <div className='flex flex-col text-right basis-1/3'>
                                            <p>Quantity: {BakedGood.quantity}</p>
                                            <p className='text-right'>Price: ${BakedGood.item.Different_varients[BakedGood.selected].Prices[0].Cost*BakedGood.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className='flex flex-col basis-1/4 p-5'>
                        <div className='w-full h-50 bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 border-1 border-gray-200'>
                            <p>Total <br/></p>
                            <p>{cart.cost}</p>
                            
                        </div>
                    </div>
            </div>
        </div>
    )
}
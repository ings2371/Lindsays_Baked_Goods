'use client'
import { useState, useEffect, useRef } from 'react'

export default function BakedGoodClientView({ BakedGood }) {
  const [variation, setVariation] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  const handleSetVariation = (value) => {
    setVariation(value)
    closeDropdown()
  }

  let menuRef = useRef(null);
  useEffect(() =>{
    let handler = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

    document.addEventListener("mousedown", handler);
  })
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleSetQuantity = (qty) => {
    setQuantity(qty)
    for (item of BakedGood.Different_varients[variation].Prices) {
      console.log(item)
    }
  }

  const handleAddToCart = async (BakedGood, variation) => {
    const response = await fetch(`/api/addToCart/`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          'BakedGood': BakedGood.Baked_Name,
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
    <div className='flex flex-row'>
        <div className='flex flex-col p-5 pt-0 sm:pt-5 basis-1/2 sm:basis-1/3'>
            <p>Allergens:</p>
            {BakedGood.Different_varients[variation].Different_Allergens.map (Allergen => (
                <p className='p-px pl-4' key={Allergen.Allergen_Name}>{Allergen.Allergen_Name}</p>
            ))}
        </div>
        <div className='basis-2/3'>
            <div className='flex flex-col sm:flex-row basis-1/2 sm:basis-auto'>
                <div className="basis-1/3 relative inline-block p-0 md:p-5 pb-5" >
                    <p>Variation</p>
                    <button
                        type="button"
                        className="px-4 py-2 text-white md:text-[10px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                        onClick={toggleDropdown}
                    >
                        {BakedGood.Different_varients[variation].Variation_name} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {isOpen && (
                        <div ref={menuRef} className="origin-top-right absolute right-0 mt-2 w-44 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                {BakedGood.Different_varients.map ((variant, index) => (
                                    <li key={variant.Variation_name}
                                    className='hover:bg-blue-300'
                                    onClick={() => handleSetVariation(index)}>
                                        {variant.Variation_name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className='flex flex-col basis-1/3 pb-5 pt-0 sm:pt-5'>
                    <div className='p-0 lg:p-5'>
                      <p className=''>${BakedGood.Different_varients[variation].Prices[0].Cost} per {BakedGood.Different_varients[variation].Prices[0].Quantity} units</p>
                      
                      <p>One unit is {BakedGood.Different_varients[variation].Unit}</p>
                    </div>
                </div>
                <div className='flex flex-col basis-1/3 pt-0 sm:pt-5'>
                <p>
                  Quantity
                </p>
                <input type="number"
                  value={quantity}
                  onChange={(e) => handleSetQuantity(e.target.value)}
                  id="quantity" name="quantity" min="1" className='max-w-17 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                </input>
                <button
                className='p-5 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded w-min text-nowrap'
                onClick={() => handleAddToCart(BakedGood, variation)}
                >
                  Add to cart
                </button>
                </div>                 
            </div>
        </div>
    </div>
  )
}

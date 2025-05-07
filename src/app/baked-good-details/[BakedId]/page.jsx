'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'




const Home = () => {
    const params = useParams()


    const [variation, setVariation] = useState(0)
    const [BakedGood, setBaked_Good] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(false);

    const handleSetVariation = (value) => {
        setVariation(value)
        closeDropdown()
    }
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleAddToCart = async (BakedGood, variation) => {
        const response = await fetch(`/api/addToCart/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'BakedGood': BakedGood.Baked_Name,
                'BakedGoodId': BakedGood._id,
                'variation': variation
            })
        })
        .catch(error => {
            console.error(error)
        })
        const result = await response.json()
        console.log(result)
    }
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const responce = await fetch(`http://localhost:3000/api/baked_good/${params.BakedId}`, {
                    cache: "no-store",
                });
                if(!responce.ok) {
                    throw new Error(responce.status)
                }
                const json = await responce.json()
                const baked_good = json.baked
                setBaked_Good(baked_good)
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])

    if (loading) {
        return <div>loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    
  return (
    <div>
      {BakedGood._id ? (
        <div style={{width: "1000px"}}>
            {console.log(BakedGood)}
            <div className="box-shadow">
                <div className='flex flex-row'>
                    <img
                    src={`/Baked_Goods/${BakedGood.Thumbnail}`}
                    style={{height: 350, width: 300}}
                    />
                    <div className='basis-full flex-col'>
                        <p style={{fontSize: "200%"}} className='p-5'>{BakedGood.Baked_Name}</p>
                        <p className='p-5'>{BakedGood.Item_Description}</p>
                    </div>
                    
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col p-5 basis-64'>
                        <p>Allergens:</p>
                        {BakedGood.Different_varients[variation].Different_Allergens.map (Allergen => (
                            <p className='p-px pl-4' key={Allergen.Allergen_Name}>{Allergen.Allergen_Name}</p>
                        ))}
                    </div>
                    <div className='basis-2/3'>
                        <div className='flex flex-row basis-auto'>
                        <div className="relative inline-block" style={{ padding: '1rem', fontSize: '1rem' }}>
                            <p>Variation</p>
                            <button
                                type="button"
                                className="px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                                onClick={toggleDropdown} style={{fontSize: '20px' }}
                            >
                                {BakedGood.Different_varients[variation].Variation_name} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            {isOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-44 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                                                      
                        </div>
                        <div className='flex flex-row basis-auto'>
                            <div className='flex flex-col basis-1/2'>
                                <div className='p-5'>
                                    <p>${BakedGood.Different_varients[variation].Prices[0].Cost} per {BakedGood.Different_varients[variation].Prices[0].Quantity} units</p>
                                    
                                    <p>One unit is {BakedGood.Different_varients[variation].Unit}</p>
                                </div>
                            </div>
                            <div className='flex flex-col basis-1/2'>
                                <button
                                className='p-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-min text-nowrap'
                                onClick={() => handleAddToCart(BakedGood, variation)}
                                >
                                    Add to cart
                                </button>
                            </div>
                            
                        </div>
                        
                    </div>

                        

                </div>
            </div>
        </div>
      ) : (
        <div>No data yet.</div>
      )} 
    </div>
          

  );
}
export default Home
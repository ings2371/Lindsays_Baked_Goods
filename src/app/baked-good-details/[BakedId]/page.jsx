'use client'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'



const Home = () => {
    const params = useParams()


    const [BakedGood, setBaked_Good] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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
                    <div className='flex flex-col p-5 basis-1/3'>
                        <p>Allergens:</p>
                        {BakedGood.Different_varients[0].Different_Allergens.map (Allergen => (
                            <p className='p-px pl-4' key={Allergen.Allergen_Name}>{Allergen.Allergen_Name}</p>
                        ))}
                    </div>
                    <div className='basis-1/3'>
                        <p>{BakedGood.Different_varients[0].Variation_name}</p>
                    </div>
                    <div className='basis-1/3'>
                        <p>Add to cart</p>
                    </div>
                </div>
                

                <p style={{textAlign: "center", fontSize: 25 }}>
                    {BakedGood.Baked_Name} <br/>
                    {BakedGood.Different_varients[0].Prices[0].Cost}
                    
                </p>
            </div>
        </div>
      ) : (
        <div>No data yet.</div>
      )} 
    </div>
          

  );
}
export default Home
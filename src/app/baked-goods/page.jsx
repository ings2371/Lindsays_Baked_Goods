'use client'
import Item from "@/app/components/card"
import { useState, useEffect } from 'react'


export default function Home() {
    const [BakedGoods, setBaked_Goods] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try{
                const responce = await fetch("http://localhost:3000/api/baked_good", {
                    cache: "no-store",
                });
                if(!responce.ok) {
                    throw new Error(responce.status)
                }
                const json = await responce.json()
                setBaked_Goods(json)
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
      {BakedGoods ? (
        <div style={{width: "1000px"}}>
        {/* maps the mock data*/}
        <div className="flex">
            {BakedGoods.map (Baked_Good => (
                <div key={Baked_Good._id} style={{padding: "16.5px"}}>
                    <Item Baked_Good={Baked_Good} />
                </div>            
            ))}
        </div>
    </div>

      ) : (
        <div>No data yet.</div>
      )} 
      {
        Baked_Good.map(goods =>
            <Item key={goods._id} Baked_Good={goods} />
        )
      }

    </div>
    

  );
}
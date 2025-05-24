'use client'
import Image from "next/image";
import Item from "@/app/components/card"
import { useState, useEffect } from 'react'

export default function Home() {
  const [BakedGoods, setBaked_Goods] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const imageList = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']

  useEffect(() => {
          const fetchData = async () => {
              setLoading(true)
              try{
                  const responce = await fetch("/api/baked_good", {
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

          const onlySeas = BakedGoods.filter(products => products.Season !== 'no season')
  return (
    <>
      <div>
        <p style={{textAlign: "center"}} className='text-sm sm:text-2xl lg:text-2xl'> Seasonal goods</p>
        {BakedGoods ? (
          <div className="flex justify-center">
            <div className="flex">
              {/* only show 3 on screen */}
                {onlySeas.slice(0, 3).map (Baked_Good => (
                    <div key={Baked_Good._id} style={{padding: "16.5px"}}>
                        <Item Baked_Good={Baked_Good} />
                    </div>
                ))}
            </div>
          </div>
          
        ) : (
          <div>No data yet.</div>
        )} 

        <h1 style={{ textAlign: "center" }} className="text-sm sm:text-2xl lg:text-2xl">Cakes</h1>
        <p className="text-sm text-center mx-auto px-4 sm:px-6">
          If you want a custom cake for an event, contact the<br></br> seller about what you want and to talk about its price.
        </p>
       <div className="flex grid grid-cols-3 xl:grid-cols-5">
          {imageList.map((filename, idx) => (
            <div key={idx} className="p-4">
              <img
                src={`/cakes/${filename}`}
                className="rounded object-cover w-18.5 h-26.5 md:h-51 md:w-35 lg:h-60 lg:w-50 lg:min-w-50"
              />
            </div>
          ))}      
        </div>  
      </div>

      
  
      
    </>
  );
}

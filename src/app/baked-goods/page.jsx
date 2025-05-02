'use client'
import Item from "@/app/components/card"
import { useState, useEffect } from 'react'

//this is some mock data
// var Baked_Goods = [
//     {
//         _id : 1,
//         thumbnail : "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg",
//         Baked_Name : "cookie",
//         Different_varients : {
//             Prices : [
//                 {
//                     Quantity : 1,
//                     Cost : 5
//                 },
//                 {
//                     Quantity : 15,
//                     cost : 50
//                 }
                    
    
//             ],
//             Unit : "6 cookies"
    
//         }
//     },
//     {
//         _id : 2,
//         thumbnail : "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg",
//         Baked_Name : "cookie",
//         Different_varients : {
//             Prices : [
//                 {
//                     Quantity : 1,
//                     Cost : 5
//                 },
//                 {
//                     Quantity : 15,
//                     cost : 50
//                 }
                    
    
//             ],
//             Unit : "6 cookies"
    
//         }
//     },
//     {
//         _id : 3,
//         thumbnail : "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg",
//         Baked_Name : "cookie",
//         Different_varients : {
//             Prices : [
//                 {
//                     Quantity : 1,
//                     Cost : 5
//                 },
//                 {
//                     Quantity : 15,
//                     cost : 50
//                 }
                    
    
//             ],
//             Unit : "6 cookies"
    
//         }
//     }
// ]

export default function Goods() {
    const [Baked_Good, setBaked_Good] = useState("")
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
                setBaked_Good(json)
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
      {Baked_Good ? (
        <pre>{JSON.stringify(Baked_Good, null, 2)}</pre>
      ) : (
        <div>No data yet.</div>
      )}
    </div>
          

  );
}
'use client'
import Item from "@/app/components/card"
import { useState, useEffect } from 'react'

//this is some mock data
var Baked_Goods = [
    {
        _id : 1,
        thumbnail : "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg",
        Baked_Name : "cookie",
        Different_varients : {
            Prices : [
                {
                    Quantity : 1,
                    Cost : 5
                },
                {
                    Quantity : 15,
                    cost : 50
                }
                    
    
            ],
            Unit : "6 cookies"
    
        }
    },
    {
        _id : 2,
        thumbnail : "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg",
        Baked_Name : "cookie",
        Different_varients : {
            Prices : [
                {
                    Quantity : 1,
                    Cost : 5
                },
                {
                    Quantity : 15,
                    cost : 50
                }
                    
    
            ],
            Unit : "6 cookies"
    
        }
    },
    {
        _id : 3,
        thumbnail : "https://upload.wikimedia.org/wikipedia/commons/f/f1/2ChocolateChipCookies.jpg",
        Baked_Name : "cookie",
        Different_varients : {
            Prices : [
                {
                    Quantity : 1,
                    Cost : 5
                },
                {
                    Quantity : 15,
                    cost : 50
                }
                    
    
            ],
            Unit : "6 cookies"
    
        }
    }
]

const getTopics = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/baked_good", {
            cache: "no-store",
        });

        if (!res.ok){
            throw new Error("failed to fetch baked_good")
        }

        return res.json();
    } catch (error) {
        console.log("Error loading goods: ", error);
    }
};

export default function Goods() {
     //const {Baked_Goods} = await getTopics();
  return (
    <div style={{width: "1000px"}}>
        {/* maps the mock data*/}
        {/* <div className="flex">
            {Baked_Goods.map (Baked_Good => (
                <div style={{padding: "16.5px"}}>
                    <Item key={Baked_Good._id} Baked_Good={Baked_Good} />
                </div>            
            ))}
        </div> */}
    </div>
          

  );
}
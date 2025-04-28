'use client'
import Item from "@/app/components/card"
import { useState, useEffect } from 'react'

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



export default function Home() {
  return (
    <div style={{width: "1000px"}}>
        

            <div className="flex">
            {Baked_Goods.map (Baked_Good => 
                <div style={{padding: "16.5px"}}>
                    <Item key={Baked_Good._id} Baked_Good={Baked_Good} />
                </div>
                

          )}
                      </div>
          </div>
          

  );
}
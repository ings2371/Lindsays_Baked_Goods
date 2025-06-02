'use client'
import React from 'react';
import { useEffect, useState } from "react";


export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("orderData");
    if (data) {
      try {
        setOrder(JSON.parse(data));
      } catch (e) {
        console.error("Failed to parse orderData", e);
      }
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  if (!order) return <p>Loading order details...</p>;

  const {
    email,
    fullName,
    startDate,
    endDate,
    pickupTime,
    cart,
    cost,
    comments,
  } = order;

  // Current date & time formatted like your second example
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${day}/${month}/${year}`;
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const currentTime = `${hours}:${minutes}:${seconds}`;

  return (
    <div>
      <div className='m-5 ml-0'>
        <button onClick={handlePrint} className='p-5 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded w-min text-nowrap'>
          Print Reciept
        </button>
        <p>Click "Print Receipt" and "Save as PDF"<br/> for a digital copy of the reciept</p>
      </div>
      
    <div style={{border: "dashed grey 2px"}}>
      <div className="wrapper" style={{ margin: "25px", fontSize: "85%"}}>
      <table>
        <tbody>
          <tr>
            <td style={{ verticalAlign: "top", width: 50 }}>
              <div style={{ width: 50, height: "100%", float: "left", display: "inline-block" }}>
                <p style={{ width: 50 }}>Sales Receipt</p>
              </div>
            </td>

            <td>
              <div style={{ width: "100%", borderTop: "2px solid #5A4FE8", display: "inline-block" }}>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>SOLD TO</td>
                      <td style={{ textAlign: "center" }}>DATE</td>
                    </tr>
                    <tr>
                      <td>{fullName}</td>
                      <td style={{ textAlign: "center" }}>{formattedDate}</td>
                    </tr>
                    <tr>
                      <td>{email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ width: "100%", borderTop: "2px solid #5A4FE8", display: "inline-block" }}>
                <p>Pickup Date: {startDate} to {endDate}</p>
                <p>Pickup Time: {pickupTime}</p>
              </div>
              <div style={{ width: "100%", borderTop: "2px solid #5A4FE8", display: "inline-block" }}>
                <p>Comments:<br />{comments}</p>
              </div>
              <table style={{ borderCollapse: "collapse", width: "100%", borderTop: "2px solid #5A4FE8" }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th style={{ textAlign: "center" }}>QTY</th>
                    <th className='text-center'>IMAGE</th>
                    <th className='text-center'>DESCRIPTION</th>
                    <th>VARIANT</th>
                    <th>PRICE PER UNIT</th>
                    <th>LINE TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((BakedGood, i) => {
                    const item = BakedGood.item;
                    const variation = item.Different_varients[BakedGood.selected];
                    const price = variation.Prices[0].Cost * BakedGood.quantity;
                    const imageUrl = `https://lindsayssweettreats.com/Baked_Goods/${item.Thumbnail}`;
                    const unit = variation.Unit;
                    const number = parseInt(unit.match(/\d+/)[0]);
                    console.log(number);

                    return (
                      <React.Fragment key={i}>
                        <tr>
                          <td colSpan="6" style={{ borderTop: "2px solid rgb(182, 217, 215)" }}></td>
                        </tr>
                        <tr>
                          <td style={{ textAlign: "center" }}>
                            <p className='p-5'>{BakedGood.quantity}</p>
                          </td>
                          <td>
                            <img className='p-5' src={imageUrl} width={25} height={35} style={{ objectFit: "cover" }} />
                          </td>
                          <td>
                            <p className='p-5'><strong>{item.Baked_Name}:</strong></p>
                          </td>
                          <td>
                            <p>{variation.Variation_name}</p>
                          </td>
                          <td>
                            <p style={{ textAlign: "center" }}>{number}</p>
                          </td>
                          <td>
                            <p style={{ textAlign: "center" }}>${price.toFixed(2)}</p>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>

              <p><strong>Total due on pickup: ${cost}</strong></p>
            </td>
          </tr>
        </tbody>
      </table>

      <style>{`
        .wrapper * {
          padding-top: 2px;
          padding-bottom: 4px;
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </div>
    </div>
    
  );
  
}

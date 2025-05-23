import { Resend } from 'resend';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, fullName, startDate, endDate, pickupTime, cart, cost } = body;

        // const resend = new Resend('re_5XLJeyLJ_5ZcDtAXUKFLuW3YRg3HujnoR');
        const resend = new Resend('re_fwLHhgka_AgTdTyqZCVpE24QAaDBo1z9o');
        
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Month is 0-indexed
        const day = currentDate.getDate();
        const formattedDate = day + "/" + month + "/" + year
        console.log(formattedDate);

        // Build each cart item as an HTML block
        const cartItems = `
                ${cart.map((BakedGood) => {
                    const item = BakedGood.item;
                    const variation = item.Different_varients[BakedGood.selected];
                    const price = variation.Prices[0].Cost * BakedGood.quantity;
                    const imageUrl = `https://lindsayssweettreats.com/Baked_Goods/${item.Thumbnail}`;

                    return `
                        <tr style="border-top: 2px solid rgb(182, 217, 215); width: 100%;">
                            <td>
                                <img src="${imageUrl}" width="25" height="35" style="object-fit: cover;" />
                            </td>
                            <td>
                                <p><strong>${item.Baked_Name}:</strong></p>
                            </td>
                            <td>
                                <p>${variation.Variation_name}</p>
                            </td>
                            <td>
                                <p>Quantity: ${BakedGood.quantity}</p>
                            <td>
                                <p>Price: $${price.toFixed(2)}</p>
                            </td>
                        </tr>
                    `;
                }).join('')}
        `;

        // Full email HTML
        const htmlContent = `
            <div style="font-size: 85%;">
            <table>
                <tr>
                    <td style="vertical-align: top;">
                        <div style="width: 50px; height: 100%; float: left; display: inline-block;">
                            <p style="width: 50px;">Sales Receipt</p>
                        </div>
                    </td>
                    <td>
                        <div style="width: 100%; border-top: 2px solid #5A4FE8; display: inline-block;">
                            <table style="width: 100%;">
                                <tr>
                                    <td>SOLD TO</td>
                                    <td>DATE</td>
                                    <td>RECEIPT #</td>
                                </tr>
                                <tr>
                                    <td>${fullName}</td>
                                    <td>${formattedDate}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>${email}</td>
                                </tr>
                            </table>
                        </div>
                        <div style="width: 100%; border-top: 2px solid #5A4FE8; display: inline-block;">
                            <p>Pickup Date: ${startDate} to ${endDate}</p>
                            <p>Pickup Time: ${pickupTime}</p>
                        </div>
                        <div style="border-collapse: collapse; width: 100%; border-top: 2px solid #5A4FE8; display: inline-block;">
                            <table style="width: 100%">
                                <tr style="text-align: left;">
                                    <th>IMAGE</th>
                                    <th>DESCRIPTION</th>
                                    <th>VARIANT</th>
                                    <th>QUANTITY</th>
                                    <th>LINE TOTAL</th>
                                </tr>
                                ${cartItems}
                            </table>
                            
                            <p><strong>Total: $${cost}</strong></p>
                        </div>
                    </div>
                    </td>
                </tr>
            </table>
                
                
        `;
        var response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'cakefordaysboy@gmail.com',
            subject: 'Order Confirmation',
            html: htmlContent,
        });
        console.log("Resend Response:", response);

        response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Order Confirmation',
            html: htmlContent,
        });

        console.log("Resend Response:", response);

        return new Response(JSON.stringify({ success: true, response }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

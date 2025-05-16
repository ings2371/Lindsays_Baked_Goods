import { Resend } from 'resend';

export async function POST(request) {
    try {
        const body = await request.json();
        const { email, fullName, startDate, endDate, pickupTime, cart } = body;

        const resend = new Resend('re_5XLJeyLJ_5ZcDtAXUKFLuW3YRg3HujnoR');

        // Build each cart item as an HTML block
        const cartItems = cart.map((BakedGood) => {
            const item = BakedGood.item;
            const variation = item.Different_varients[BakedGood.selected];
            const price = variation.Prices[0].Cost * BakedGood.quantity;
            const imageUrl = `https://lindsayssweettreats.com/Baked_Goods/${item.Thumbnail}`; // Replace with actual domain

            return `
                <div>
                    <img src="${imageUrl}" width="100" height="140" />
                    <p><strong>${item.Baked_Name}</strong></p>
                    <p>Variation: ${variation.Variation_name}</p>
                    <p>Quantity: ${BakedGood.quantity}</p>
                    <p>Price: $${price.toFixed(2)}</p>
                </div>
            `;
        }).join('');

        // Calculate total cost
        let totalCost = 0;

        for (const BakedGood of cart) {
            const variation = BakedGood.item.Different_varients[BakedGood.selected];
            totalCost += variation.Prices[0].Cost * BakedGood.quantity;
        }

        // Full email HTML
        const htmlContent = `
            <p>Order received from <strong>${fullName}</strong></p>
            <p>Email: ${email}</p>
            <p>Pickup Date: ${startDate} to ${endDate}</p>
            <p>Pickup Time: ${pickupTime}</p>
            <div>${cartItems}</div>
            <p><strong>Total: $${totalCost.toFixed(2)}</strong></p>
        `;
        console.log(cartItems)
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev', // Replace with verified sender if needed
            to: 'curtisjlbutler@gmail.com',
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

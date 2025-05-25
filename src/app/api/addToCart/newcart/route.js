import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function POST(request) {
    const { cartId } = await request.json();
    console.log(cartId)
    const cookie = await cookies()
    const rawItems = cookie.get('items')?.value;
    var items = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : []

    items = items.filter(item => item.cartId !== cartId)


    const cookieOptions = {
        httpOnly: false,
        maxAge: 99999999999999999999
    }
    
    const cookieStore = await cookies();
    cookieStore.set('items', encodeURIComponent(JSON.stringify(items)), cookieOptions)
    return NextResponse.json({ message: "removed from cart"}, {status: 200}); 
}
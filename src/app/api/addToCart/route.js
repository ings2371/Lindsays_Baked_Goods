import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function POST(request) {
    const {BakedGood, BakedGoodId, variation, quantity} = await request.json();
    const cookieOptions = {
        httpOnly: false,
        maxAge: 60*60*12
    }
    
    const cookie = await cookies()

    const rawItems = cookie.get('items')?.value;
    var items = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : []

    var cartId
    if (items.length === 0) {
        cartId = 0
    } else {
        const lastItem = items[items.length -1]
        cartId = lastItem.cartId + 1
    }

    const item = {BakedGood, BakedGoodId, variation, quantity, cartId}

    console.log("yes")
    console.log(item.cartId)
    items.push(item)

    const cookieStore = await cookies();
    cookieStore.set('items', encodeURIComponent(JSON.stringify(items)), cookieOptions)
    return NextResponse.json({ message: "added to cart"}, {status: 201});
}

export async function GET(request) {
    const cookie = await cookies()

    const rawItems = cookie.get('items')?.value;
    var items = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : []
    return NextResponse.json(items);
}
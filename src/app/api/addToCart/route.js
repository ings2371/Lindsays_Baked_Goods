import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export async function POST(request) {
    const {BakedGood, BakedGoodId, variation, quantity} = await request.json();
    const cookieOptions = {
        httpOnly: false,
        maxAge: 99999999999999999999
    }
    const item = {BakedGood, BakedGoodId, variation, quantity}
    console.log(item)
    
    const cookie = await cookies()

    const rawItems = cookie.get('items')?.value;
    var items = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : []

    items.push(item)

    const cookieStore = await cookies();
        cookieStore.set('items', encodeURIComponent(JSON.stringify(items)), cookieOptions)
    return NextResponse.json({ message: "signed in"}, {status: 201}); 
}

export async function GET(request) {
    const cookie = await cookies()

    const rawItems = cookie.get('items')?.value;
    var items = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : []
    return NextResponse.json(items);
}
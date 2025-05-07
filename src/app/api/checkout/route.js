'use server'
import { cookies } from "next/headers"
import { NextResponse } from "next/server";
import Baked_Goods from "../../../../models/bakey";


export async function GET(request) {
    const cookie = await cookies()

    const rawItems = cookie.get('items')?.value;
    var items = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : []

    var fullItems = ""

    for (var BakedGoodId of items) {
        console.log(BakedGoodId.BakedGoodId)
        const reponse = await Baked_Goods.findOne({_id: BakedGoodId.BakedGoodId});
        // console.log(reponse)
        fullItems = reponse
    }


    // console.log("yes")
    // console.log(fullItems)
    return NextResponse.json(fullItems);
}
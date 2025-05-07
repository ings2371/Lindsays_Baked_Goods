'use server'
import { cookies } from "next/headers"
import { NextResponse } from "next/server";
import Baked_Goods from "../../../../models/bakey";

export async function GET(request) {
    const cookie = await cookies()

    const rawItems = cookie.get('items')?.value;
    var items = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : []

    var fullItems = []

    for (var BakedGood of items) {
        var item = await Baked_Goods.findOne({_id: BakedGood.BakedGoodId});
        var object = {item, "selected": BakedGood.variation, "quantity": BakedGood.quantity}
        fullItems = [...fullItems, object]
    }
    return NextResponse.json(fullItems);
}
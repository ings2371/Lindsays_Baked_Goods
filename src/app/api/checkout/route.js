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
        console.log(item.selected)
        console.log(item.Different_varients[item.selected])
        var price
        // for (cost in item.Different_varients[item.variation]) {
        //     console.log("yes")
        //     console.log(cost)
        //     if (BakedGood.quantity <= cost.Quantity) {
        //         price = cost.Cost
        //         break
        //     } else {
        //         price = 9
        //     }
        // }
        var cost = price * BakedGood.quantity

        var object = {item, "selected": BakedGood.variation, "quantity": BakedGood.quantity, "cost": cost}
        fullItems = [...fullItems, object]
    }
    var total
    for (var BakedGood of items) {
        total += BakedGood.cost
    }
    var itemsTotal = {"items": fullItems, "total": total}
    return NextResponse.json(fullItems);
}
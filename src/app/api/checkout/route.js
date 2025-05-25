'use server'
import { cookies } from "next/headers"
import { NextResponse } from "next/server";
import Baked_Goods from "../../../../models/bakey";

export async function GET(request) {
    const cookie = await cookies()

    const rawItems = cookie.get('items')?.value;
    var items = rawItems ? JSON.parse(decodeURIComponent(rawItems)) : []
    console.log(items)

    var fullItems = []

    for (var BakedGood of items) {
        var item = await Baked_Goods.findOne({_id: BakedGood.BakedGoodId});
        var price
        // console.log(item.Different_varients[BakedGood.variation].Prices)
        for (cost of item.Different_varients[BakedGood.variation].Prices) {
            // console.log(cost.Cost)
            if (BakedGood.quantity < cost.Quantity) {
                break
            } else if (BakedGood.quantity >= cost.Quantity) {
                price = cost.Cost
                break
            } else {
                price = 9
            }
        }
        var cost = price * BakedGood.quantity

        var object = {item, "selected": BakedGood.variation, "quantity": BakedGood.quantity, "cost": cost, "cartId": BakedGood.cartId}
        fullItems = [...fullItems, object]
    }
    var total = 0
    for (var BakedGood of fullItems) {
        total += BakedGood.cost
    }
    // console.log(total)
    var itemsTotal = {"items": fullItems, "total": total}
    return NextResponse.json(itemsTotal);
}
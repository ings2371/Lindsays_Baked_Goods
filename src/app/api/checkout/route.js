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
        var price = 0
        var stop = 99999
        var qty = BakedGood.quantity
        const prices = item.Different_varients[BakedGood.variation].Prices
        var index = prices.length
        while (qty > 0 && stop) {
            console.log(index)
            console.log(qty)
            if (qty >= prices[index-1].Quantity) {
                price += prices[index-1].Cost
                qty -= prices[index-1].Quantity
            } else if (qty < prices[index-1].Quantity) {
                index--
            }
            
            stop--
        }
        
        var cost = price

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
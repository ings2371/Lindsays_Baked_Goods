'use server'
import { NextResponse } from "next/server";
import connectMongo from "../../../../libs/mongodb";
import Baked_Goods from "../../../../models/bakey";


//logic got from 
// https://www.youtube.com/watch?v=wNWyMsrpbz0&t=370s
export async function POST(request) {
    const {Baked_Images, Thumbnail, Baked_Name, Item_Description, Different_varients, Season, Catagory} = await request.json();
    await connectMongo();
    await Baked_Goods.create(Baked_Images, Thumbnail, Baked_Name, Item_Description, Different_varients, Season, Catagory)
    return NextResponse.json({ message: "item created"}, {status: 201});
}

export async function GET() {
    await connectMongo();
    const goods = await Baked_Goods.find();
    return NextResponse.json(goods);

}

export async function DELETE(request) {
    const id = request.NextUrl.searchParams.get("id");
    await connectMongo();
    await Baked_Goods.findByIdAndDelete(id);
    return NextResponse.json({ message: "item deleted"}, {status: 200});

}
import { NextResponse } from "next/server";
import connectMongo from "../../../../../libs/mongodb";
import Baked_Goods from "../../../../../models/bakey";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newImages: Baked_Images, newThumb: Thumbnail,newName: Baked_Name,newDescript: Item_Description,editNewVar: Different_varients, diffSeas: Season, diffCat: Catagory} = await request.json();
    
    await connectMongo();
    await Baked_Goods.findByIdAndUpdate(id, {Baked_Images, Thumbnail, Baked_Name, Item_Description, Different_varients, Season, Catagory});
    return NextResponse.json({message: "Item edited"}, { status: 200})
}

export async function GET(request, {params}) {
    const {id} = params;    
    await connectMongo();

    const baked = await Baked_Goods.findOne({_id: id});
    return NextResponse.json({baked}, { status: 200})
}


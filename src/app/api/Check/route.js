'use server'
import { NextResponse } from "next/server";
import connectMongo from "../../../../libs/mongodb";
import CheckOut from "../../../../models/check";

//this only adds the order to a db and doesn't send them there receipt yet
export async function POST(request) {
    const {Name, Email, Date, pickUp, OrderItems, Comments, Total} = await request.json();
    await connectMongo();
    await CheckOut.create({Name, Email, Date, pickUp, OrderItems, Comments, Total})
    return NextResponse.json({ message: "order request is sent to db"}, {status: 201});
}


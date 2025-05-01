'use server'
import { NextResponse } from "next/server";
import connectMongo from "../../../../libs/mongodb";[]
import Contact from "../../../../models/contact";


//this only adds the order to a db and doesn't send them there receipt yet
export async function POST(request) {
    const {FirstName, LastName, City, Email, Comments} = await request.json();
    await connectMongo();
    await Contact.create({FirstName, LastName, City, Email, Comments})
    return NextResponse.json({ message: "order request is sent to db"}, {status: 201});
}
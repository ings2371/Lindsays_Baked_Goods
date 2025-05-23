'use server'
import { cookies } from "next/headers"
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function GET(request) {
    const cookie = await cookies()

    const token = cookie.get('signedIn')?.value;
    let signed;
    if(token){
        try{
            signed = jwt.verify(token, process.env.JWTSEC)
        } catch (e){
            signed = null;
            console.error('JWT verification failed:', e);

            
            cookie.set('signedIn', '', {
                path: '/',
                maxAge: 0, //tells browser to delete
            })
        }
    }

    console.log(signed)

    var object = {signed}
    console.log(object)
    return NextResponse.json(object);
}
'use server'
import { NextResponse } from "next/server";
import { cookies } from "next/headers"
const jwt = require('jsonwebtoken')

//this is a work in progress
//endpoint to login
export async function POST(request) {
    try{
      const {UserName, Password} = await request.json();
    
        //validate the username and password are present
        if (!UserName || !Password){
            return NextResponse.json({ message: "UserName and Password are required"}, {status: 400});
        }

        //compairs username and password
        if (UserName != process.env.LindsUSER || Password != process.env.LindsPASSWORD){
            return NextResponse.json({ message: "UserName or Password is wrong"}, {status: 400});
        }

            // Generate a JWT token
        //const token = jwt.sign({user: UserName, password: Password}, process.env.JWTSEC, {expiresIn: '2h'})

        const token =  jwt.sign({user: "new-Item"}, process.env.JWTSEC, {expiresIn: '2h'})
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 2 * 60 * 60 * 1000 //2h
        }

        //store token
        //https://nextjs.org/docs/app/api-reference/functions/cookies
        const cookieStore = await cookies();
        cookieStore.set('signedIn', token, cookieOptions)

        //successful login
        return NextResponse.json({ message: "signed in"}, {status: 201});  
    } catch(error){
        //sends generic error
        return NextResponse.json({ message: error}, {status: 500});  
    }
    
}
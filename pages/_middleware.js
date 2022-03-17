import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

//request comes in through middleware if certain condititons met send them through, otherwise redirect them to login screen
export async function middleware(req){
    const token = await getToken({req, secret: process.env.JWT_SECRET})
    const url = req.nextUrl.clone()

    
    // Allow requests if the following is true:
    // The token exists
    if (url.pathname.includes( '/api/auth') || token){
        // if the request includes these things, continue on
        return NextResponse.next()
    } 
    if (!token && url.pathname !== '/Login'){
        return NextResponse.redirect('http://localhost:3000/Login');
    }
}
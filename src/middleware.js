import { NextResponse } from 'next/server'

// This function can be marked `async` if using `await` inside
export  function middleware(request) {

    console.log("middleware executed kk");
    const loginToken=request.cookies.get("loginToken")?.value;

    if(request.nextUrl.pathname === "/api/login" || request.nextUrl.pathname === "/api/users" ){
        return
    }



    const loggedInUserNotAccessPaths=request.nextUrl.pathname==="/signin"
        || request.nextUrl.pathname ==='/signup' || request.nextUrl.pathname ==='' || request.nextUrl.pathname ==='/' ;

    if(loggedInUserNotAccessPaths){
        if(loginToken){

           return NextResponse.redirect(new URL('/AddTask',request.url));
        }

    }
    else{
        if(!loginToken){

            if(request.nextUrl.pathname.startsWith("/api")){
                return  NextResponse.json({
                    message:"Access Denied!!!",
                    success:false,
                },{
                    status:401
                })
            }
            return NextResponse.redirect(new URL('/signin',request.url));
        }

    }
    console.log(loginToken);
}

// See "Matching Paths" below to learn more
export const config = {
    matcher:
        ['/','/signin','/signup','/add-task','/ShowTask','/profile/:path*',
        '/api/:path*',]
}
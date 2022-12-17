// middleware.ts
import { NextResponse } from 'next/server'
import PocketBase from 'pocketbase';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {

    // console.log(`[Middleware] intercept ${request.nextUrl}`)

    // const response = NextResponse.next()
    // const pb = new PocketBase('http://127.0.0.1:8090');

    // // console.log(request.headers.get('cookie'))

    // // load the store data from the request cookie string
    // pb.authStore.loadFromCookie(request?.headers?.get('cookie') || '');

    // // send back the default 'pb_auth' cookie to the client with the latest store state
    // pb.authStore.onChange(() => {
    //     response.set('set-cookie', pb.authStore.exportToCookie());
    // });

    // // console.log(pb.authStore.isValid ? 'Logged in' : 'Not logged in')

    // if (pb.authStore.isValid) {
    //     if (request.nextUrl.pathname.includes('/auth/login')) {
    //         return NextResponse.redirect(new URL('/config', request.url))
    //     } 
    // } else {
    //     if (request.nextUrl.pathname.includes('/config')) {
    //         return NextResponse.redirect(new URL('/auth/login', request.url))
    //     } 
    // }


}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/config/:path*',
        '/auth/:path*'
    ],
}

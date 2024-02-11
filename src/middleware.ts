import { withAuth } from "next-auth/middleware";

export default withAuth({
callbacks :{
    authorized: ({ req, token }) => {
        if (req.nextUrl.pathname === '/admin'){
            return token?.role === 'ADMIN'
        }
        return Boolean(token)
    }
}
})
// export { default } from "next-auth/middleware"
export const config = { matcher: ["/postpage/:path*",] };



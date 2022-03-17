import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"
//google nextauth token rotation

async function refreshAccessToken(token){
    try{
        // try to set token and refresh token
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const {body: refreshedToken} = await (spotifyApi.refreshAccessToken())
        console.log('REFRESHED TOKEN IS', refreshedToken)
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshedToken: refreshedToken.refresh_token ?? token.refresh
        }

    } catch(error) {
        console.error(error)
        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }

    }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    })],
    // encrypt JWT tokens passed back from spotify
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, account, user}){
            // initial sign in
            if (account && user ){
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    userName: account.providerAccountId,
                    // when auth token expires in milis (seconds * 1000 = milis)
                    accessTokenExpires: account.expires_at * 1000
                }
            }
            if (Date.now() < token.accessTokenExpires){
                // if current time is less than token time (an hour ahead) return token
                console.log('EXISTING TOKEN VALID')
                return token
            }
            console.log('token expired')
            //retry setting access token (see top of page)
            return await refreshAccessToken(token)

        },
        async session({session, token}){
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.username = token.username

            return session
        }
    }
})

//Notes: 1:18:45
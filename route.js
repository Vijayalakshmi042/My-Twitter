import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { DBconnection } from "@/app/utils/config/db";
import UserModel from "@/app/utils/userModel/usersModel"

export const {auth,signIn,signOut,handlers:{GET,POST}}=NextAuth({
providers: [
    CredentialsProvider({
     name: 'Credentials',
     credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
        try {
            await DBconnection();
            console.log("connected to DB............")

            const user = await UserModel.findOne({ email: credentials.email });

            if (!user) {
              console.log("User not found:", credentials.email);
              return null;
            }

            const isValid = await bcrypt.compare(credentials.password || '', user.password);
            if (!isValid) 
              {
                console.log("Invalid password for user:", credentials.email);
                console.log("JWT_SECRET:", process.env.JWT_SECRET);

                throw new Error("Invalid credentials");
              }

        
            return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            };
            
        } catch (error) {
          console.error("Auth error:", error);
          return null;  
        }
        
      },
    }),
  ],
    session: {
        strategy: "jwt", 
    },
    callbacks: {
        async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.name = user.name;
            token.email = user.email;
        }
        return token;
        },
        async session({ session, token }) {
        if (token) {
            session.user.id = token.id;
        }
        return session;
        },
    },
    secret: process.env.JWT_SECRET,
});

//const handler  = NextAuth(authOptions);

//export { handler as GET, handler as POST };
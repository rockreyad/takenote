import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { DefaultSession, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import { env } from '@/env.mjs';
import { Role } from '@prisma/client';
import { JWT_EXPIRY } from './constant';
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      role: Role;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string
    // }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // TODO: Add logic here to look up the user from the credentials supplied
        const user = { id: '1', email: 'admin@gmail.com', password: 'admin' };

        if (
          credentials?.email == user.email &&
          credentials.password == user.password
        ) {
          return {
            ...user,
            customKey: 'Our Custom key'
          };
        } else {
          return null;
        }
      }
      // async authorize(credentials) {
      //   if (!credentials?.email || !credentials.password) {
      //     return null;
      //   }

      //   const user = await prisma.user.findUnique({
      //     where: {
      //       email: credentials.email,
      //     },
      //   });

      //   if (!user || !(await compare(credentials.password, user.password))) {
      //     return null;
      //   }

      //   return {
      //     id: user.id,
      //     email: user.email,
      //     name: user.name,
      //     randomKey: "Hey cool",
      //   };
      // },
    })
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          token: token.jti
        }
      };
    }
  },
  pages: {
    signIn: '/auth/signin'
    // signOut: '/auth/signout',
    // error: '/auth/error',
    // newUser: '/auth/newuser'
  },
  session: {
    strategy: 'jwt',
    maxAge: JWT_EXPIRY
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  }
};

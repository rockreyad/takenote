import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import { env } from '@/env.mjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    CredentialsProvider({
      name: 'Sign in',
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
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey
        }
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey
        };
      }
      return token;
    }
  },
  // pages: {
  //   signIn: '/auth/signin'
  //   // signOut: '/auth/signout',
  //   // error: '/auth/error',
  //   // newUser: '/auth/newuser'
  // },
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  }
};

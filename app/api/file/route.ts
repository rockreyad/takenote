import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'UnAuthenticated', status: 401 });
  }
  // Fetch data from prisma

  return NextResponse.json({ message: 'You are logged in.', status: 200, id });
}

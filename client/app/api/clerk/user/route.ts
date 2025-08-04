import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user data from Clerk
    console.log("userId==>",userId,process.env.CLERK_API_URL,"secret:",process.env.CLERK_SECRET_KEY);
    const response = await fetch(`${process.env.CLERK_API_URL}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });
  console.log("response==>",response)
    if (!response.ok) {
      throw new Error('Failed to fetch user from Clerk');
    }

    const user = await response.json();
    
    return NextResponse.json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      emailAddresses: user.email_addresses,
      imageUrl: user.image_url,
      createdAt: user.created_at,
    });
  } catch (error) {
    console.error('Error fetching Clerk user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
} 
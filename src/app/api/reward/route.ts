// app/api/credits/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { auth } from "@/auth";

const sql = neon(process.env.DATABASE_URL!);



// GET /api/credits?email=test@example.com
export async function GET() {
    const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const email = session.user?.email;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    const result = await sql`SELECT * FROM credits WHERE email = ${email}`;
    if (result.length === 0) {
      return NextResponse.json({ error: 'No credits found' }, { status: 404 });
    }
    return NextResponse.json({ email, credits: result[0].credits, linkedin: result[0].linkedin, github: result[0].github, x: result[0].x, share: result[0].share });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch credits', details: err }, { status: 500 });
  }
}

// POST /api/credits
// Body: { "email": "test@example.com", "credits": 20 }
export async function POST(req: NextRequest) {

    const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const email = session.user?.email;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const body = await req.json();
  const { credits } = body;

  if (!email || typeof credits !== 'number') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    await sql`
      INSERT INTO credits (email, credits)
      VALUES (${email}, ${credits})
      ON CONFLICT (email) DO UPDATE SET credits = EXCLUDED.credits
    `;
    return NextResponse.json({ message: 'Credits updated', email, credits });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update credits', details: err }, { status: 500 });
  }
}

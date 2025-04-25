import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { auth } from "@/auth";

const sql = neon(process.env.DATABASE_URL!);

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
  const { credits, githubFollowed, twitterFollowed, linkedinFollowed, shared } = body;
  

  if (!email || typeof credits !== 'number' || typeof linkedinFollowed != 'boolean' || typeof twitterFollowed != 'boolean' || typeof shared != 'boolean' || typeof githubFollowed != 'boolean') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    await sql`
  INSERT INTO credits (email, credits, linkedin, github, x, share)
  VALUES (${email}, ${credits}, ${linkedinFollowed}, ${githubFollowed}, ${twitterFollowed}, ${shared})
  ON CONFLICT (email) DO UPDATE SET
    credits = EXCLUDED.credits,
    linkedin = EXCLUDED.linkedin,
    github = EXCLUDED.github,
    x = EXCLUDED.x,
    share = EXCLUDED.share
`;

    return NextResponse.json({ message: 'Credits updated', email, credits });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update credits', details: err }, { status: 500 });
  }
}

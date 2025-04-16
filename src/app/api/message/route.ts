// src/app/api/conversation/route.ts

import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@/auth";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json([], { status: 401 });

  const email = session.user?.email;

  const result = await sql`
    SELECT messages
    FROM conversations
    WHERE email = ${email} AND jsonb_array_length(messages) > 0
  `;

  return NextResponse.json(result[0]?.messages ?? []);
}

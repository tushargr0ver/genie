import { neon } from '@neondatabase/serverless';
import { auth } from "@/auth";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const email = session.user?.email;
  const { messages } = await req.json();

  
  

  try {
    await sql`
      UPDATE conversations
      SET messages = ${JSON.stringify(messages)}::jsonb
      WHERE email = ${email}
    `;
    
    return new Response("Messages updated", { status: 200 });
  } catch (error) {
    console.error("DB update error:", error);
    return new Response("Failed to update messages", { status: 500 });
  }
}

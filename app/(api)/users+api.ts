import { neon } from "@neondatabase/serverless";
const DATABASE_URL = `${process.env.DATABASE_URL}`;

const sql = neon(DATABASE_URL);

export async function POST(request: Request) {
  const { email, username, clerkId } = await request.json();
  if (!email || !username || !clerkId)
    return Response.json(
      {
        message: "Missing required Field",
      },
      { status: 400 }
    );
  try {
    const response = await sql`
       INSERT INTO users (
        username,
        email,
        clerk_id
    )
    VALUES(
  ${username},
  ${email},
  ${clerkId}
    )`;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

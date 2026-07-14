import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { isAuthenticated, userId } = await auth();

  if (!isAuthenticated) {
    return NextResponse.json({ "message": "Unauthorized" }, {status: 401})
  }

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "repo read:user",
    redirect_uri: `${process.env.NEXT_PUBLIC_API_URL!}/github/callback`,
    state: userId!
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params}`,
  );
}

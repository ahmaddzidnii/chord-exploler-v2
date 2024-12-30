import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  console.log((await cookies()).get("jwt-token"));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};

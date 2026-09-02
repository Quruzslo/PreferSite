"use server";

import { cookies } from "next/headers";

export async function setConsentCookie() {
  const cookieStore = await cookies();

  cookieStore.set("cookie-consent", "true", {
    maxAge: 31536000,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
}

// Ez most használaton kívül van

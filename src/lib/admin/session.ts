import { cookies } from "next/headers";
import { sealData, unsealData } from "iron-session";

export type AdminSession = {
  role: "admin";
  user: string;
};

const COOKIE_NAME = "admin_session";

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "Missing SESSION_SECRET (min 16 chars). Add it to your .env file."
    );
  }
  return secret;
}

export async function setAdminSession(session: AdminSession) {
  const sealed = await sealData(session, {
    password: getSecret(),
  });

  const jar = await cookies();
  jar.set({
    name: COOKIE_NAME,
    value: sealed,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return null;
  }

  try {
    const data = (await unsealData(raw, {
      password: secret,
    })) as AdminSession;

    if (!data || data.role !== "admin" || !data.user) return null;
    return data;
  } catch {
    return null;
  }
}

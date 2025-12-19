import { cookies } from "next/headers";
import { sealData, unsealData } from "iron-session";

export type CrmSession = {
  userId: string;
  role: "admin" | "sales";
};

const COOKIE_NAME = "crm_session";

function getSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "Missing SESSION_SECRET (min 16 chars). Add it to your .env file."
    );
  }
  return secret;
}

export async function setCrmSession(session: CrmSession) {
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

export async function clearCrmSession() {
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

export async function getCrmSession(): Promise<CrmSession | null> {
  const jar = await cookies();
  const raw = jar.get(COOKIE_NAME)?.value;
  if (!raw) return null;

  try {
    const data = (await unsealData(raw, {
      password: getSecret(),
    })) as CrmSession;

    if (!data?.userId || (data.role !== "admin" && data.role !== "sales")) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

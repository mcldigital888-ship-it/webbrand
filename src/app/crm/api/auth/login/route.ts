import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { setCrmSession } from "@/lib/crm/session";

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";

  let parsed: z.infer<typeof BodySchema>;
  try {
    const json = (await req.json()) as unknown;
    parsed = BodySchema.parse(json);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const email = parsed.email.toLowerCase();

  const recentAttempts = await prisma.loginAttempt.count({
    where: {
      email,
      createdAt: { gte: new Date(Date.now() - 60_000) },
      success: false,
    },
  });

  if (recentAttempts >= 10) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  const ok =
    !!user &&
    user.active &&
    (await bcrypt.compare(parsed.password, user.passwordHash));

  await prisma.loginAttempt.create({
    data: {
      email,
      ip,
      success: ok,
    },
  });

  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials" },
      { status: 401 }
    );
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  await setCrmSession({ userId: user.id, role: user.role });

  return NextResponse.json({ ok: true }, { status: 200 });
}

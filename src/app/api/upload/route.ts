import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Arquivo não enviado" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${session.user.email}.jpg`;
  const filePath = path.join(process.cwd(), "public/uploads/profile/", fileName);

  await writeFile(filePath, buffer);

  const url = `/uploads/profile/${fileName}`;

  // Atualiza no banco
  await prisma.usuarios.update({
    where: { email: session.user.email },
    data: { foto: url },
  });

  return NextResponse.json({ url });
}

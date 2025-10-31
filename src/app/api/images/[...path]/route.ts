import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path: imagePaths } = await params;
    const imagePath = imagePaths.join("/");
    const filePath = path.join(process.cwd(), "public", imagePath);

    const imageBuffer = await readFile(filePath);

    const ext = path.extname(filePath).toLowerCase();
    const contentType =
      {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
      }[ext] || "image/jpeg";

    return new NextResponse(imageBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Erro ao servir imagem:", error);
    return new NextResponse("Imagem não encontrada", { status: 404 });
  }
}

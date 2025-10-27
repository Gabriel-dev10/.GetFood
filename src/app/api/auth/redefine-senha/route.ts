import { prisma } from "@/lib/prisma"; // Verifique o caminho
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req:NextRequest) {
    try{
        const { token, password, passwordConfirmation } = await req.json();

        console.log("RECEBIDO DO FRONT (token puro):", token);

        if (password !== passwordConfirmation){
            return NextResponse.json({ error: "As senhas não coincidem" }, { status:400 });
        }

        if (!token || !password){
            return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        console.log("BUSCANDO NO DB (token hash):", hashedToken);

        const user = await prisma.usuarios.findFirst({
            where: {
                tokenSenha: hashedToken,
                dataSenha: {
                    gt: new Date(),
                },
            },
        });
        
        if (!user) {
            return NextResponse.json({ error: "Token inválido ou expirado."}, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.usuarios.update({
            where: {id:user.id},
            data: {
                senha: hashedPassword,
                tokenSenha: null,
                dataSenha: null,
            },
        });
        return NextResponse.json({ message: "Senha redefinida com sucesso!"}, { status: 200});
    } catch (error) {
        console.error("Erro ao redefinir a senha: ", error);
        return NextResponse.json({ error: "Ocorreu um erro no servidor."}, {status: 500});
    }
}

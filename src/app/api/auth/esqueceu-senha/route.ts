import prisma from "@/lib/prisma";
import { NextRequest,NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest){
    try{
        const {email} = await req.json();

        if (!email){
            return NextResponse.json({ error: "E-mail é onbrigatório" }, { status: 400 });
        }

        const user = await prisma.User.findUnique({
            where: { email },
        });

        if (!user){
            return NextResponse.json({ message: "Se um usuário com este e-mail existir, um link de redefinição será enviado."}, { status: 200 });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const passwordResetToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        console.log("SALVANDO NO DB (token hash):", passwordResetToken);

        const passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000)

        await prisma.User.update({
            where: { email },
            data: {
                tokenSenha: passwordResetToken,
                dataSenha: passwordResetExpires,
            },
        });

        const resetURL = `${process.env.NEXTAUTH_URL}/login/redefinir-senha?token=${resetToken}`;

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_SERVER_HOST,
            port: Number(process.env.EMAIL_SERVER_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        console.log(email)
        const info = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Redefinição de Senha - .GetFood",
            html: `
            <p>Você solicitou uma redefinição de senha. Clique no link abaixo para criar uma nova senha:</p>
            <p><a href="${resetURL}">${resetURL}</a></p>
            <p>Este link expira em 10 minutos.</p>`,
        });
        console.log(info)
        return NextResponse.json({ message: "E-mail de redefinição enviado com sucesso." }, { status: 200 });

    } catch (error) {
        console.error("Erro ao solicitar redefinição de senha: ", error);
        return NextResponse.json({ error: "Ocorreu um erro no servidor"}, { status: 500});
    }
}

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const resp = await fetch('https://zenquotes.io/api/random')

        if (!resp.ok) {
            throw new Error("Erro na API externa")
        }

        const data = await resp.json()

        return NextResponse.json(data)
    } catch {
        return NextResponse.json(
            [
                {
                    q: "Limite atingido: você pode gerar até 5 frases a cada 30 segundos.",
                    a: "Sistema"
                }
            ],
            { status: 200 }
        )
    }
}
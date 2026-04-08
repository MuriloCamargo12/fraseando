import { NextResponse } from "next/server";

export async function GET() {
    try {
        const resp = await fetch('https://zenquotes.io/api/random')

        if (!resp.ok) {
            throw new Error("Erro na API externa")
        }

        const data = await resp.json()

        return NextResponse.json(data)
    } catch (error) {
        console.error("Erro na API:", error)

        return NextResponse.json(
            [
                {
                    q: "Não foi possível carregar a frase.",
                    a: "Sistema"
                }
            ],
            { status: 200 }
        )
    }
}
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  try {
    const { text } = await req.json();
    const res = await fetch("https://api.langbly.com/language/translate/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.translate,
      },
      
      body: JSON.stringify({
        q: text,
        target: "pt",
      }),
    });

    const data = await res.json();

    return NextResponse.json(data);

  } catch (erro) {

    return NextResponse.json(
      { error: `Erro ao traduzir ${erro}` },
      { status: 500 },
    );
  }
}

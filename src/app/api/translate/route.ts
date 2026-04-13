export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const res = await fetch("https://api.langbly.com/language/translate/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.TRANSLATE as string,
      },

      body: JSON.stringify({
        q: text,
        target: "pt",
      }),
    });

    if (!res.ok) {
      throw new Error("Erro na API externa");
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
  return Response.json(
    {
      data: {
        translations: [
          {
            translatedText: "Não foi possível traduzir a frase",
          },
        ],
      },
    },
    { status: 500 }
  );
  }
}

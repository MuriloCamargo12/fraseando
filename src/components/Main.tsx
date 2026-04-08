'use client'

import { ConfigContext } from "@/app/context/ConfigContext"
import { favoritosContext } from "@/app/context/FavoritosContext"
import { useContext, useEffect, useRef, useState } from "react"

export default function Main() {
    const { traducao } = useContext(ConfigContext)!
    const { adicionarFavorito } = useContext(favoritosContext)!
    const [frase, setFrase] = useState("")
    const [autor, setAutor] = useState("")
    const [loading, setLoading] = useState(true)
    const [ativo, setAtivo] = useState(false)

    function handleSalvar() {
        setAtivo(true)

        setTimeout(() => {
            setAtivo(false)
        }, 2000)
    }

    const hasFetched = useRef(false)

    function favoritar() {
        if (frase == '' && autor == '') {
            return
        } else {
            adicionarFavorito({ frase, autor })
        }
    }

    function compartilharMsg(frase: string, autor: string) {
        const msg = `"${frase}"\n\n— ${autor}`
        const url = `https://wa.me/?text=${encodeURIComponent(msg)}`

        window.open(url, "_blank")
    }


    useEffect(() => {
        if (hasFetched.current) return
        hasFetched.current = true

        async function Esperar() {
            await gerarTexto()
        }
        Esperar()
    }, [])

    async function gerarTexto() {
        try {
            setLoading(true)

            const resp = await fetch('api/quotes')
            if (!resp.ok) {
                throw new Error('Erro ao gerar frase. Tente novamente!')
            }

            const data = await resp.json()

            if (traducao) {
                const respTranslate = await fetch("api/translate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text: data[0].q,
                    }),
                });
                const fraseTraduzida = await respTranslate.json()

                setFrase(fraseTraduzida.data.translations[0].translatedText)
                setAutor(data[0].a)

            } else {
                setFrase(data[0].q)
                setAutor(data[0].a)
            }


        } catch (error) {
            return `Ocorreu um erro ${error}`

        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex justify-center items-center flex-col gap-5">
            <div className="flex flex-col md:w-2/5 w-full h-52 bg-gray-200 shadow-lg justify-start md:justify-center p-10 rounded-md text-blue-900 gap-3 overflow-y-auto overflow-x-hidden min-h-0">
                {loading ? (
                    <div className="flex justify-center items-center w-full h-full">
                        <div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div>
                            <p className="text-2xl wrap-break-word">
                                {`"${frase}"`}
                            </p>
                        </div>

                        <div className="flex justify-end">
                            <p className="wrap-break-word">
                                - {autor !== 'Unknown' ? autor : 'Desconhecido'}.
                            </p>
                        </div>
                    </>
                )}
            </div>
            <div className="flex md:w-2/5 flex-col">
                <div className="flex justify-around w-full gap-2">
                    <button onClick={() => gerarTexto()} className="bg-blue-900 md:w-28 w-23 py-2 rounded-md cursor-pointer text-sm">Nova Frase</button>
                    <button onClick={() => {
                        favoritar()
                        handleSalvar()
                    }} className="bg-blue-900 md:w-28 w-23  py-2 rounded-md cursor-pointer text-sm">
                        Favoritar
                    </button>
                    <button onClick={() => compartilharMsg(frase, autor)} className="bg-blue-900 md:w-28 w-23  py-2 rounded-md cursor-pointer text-sm">Compartilhar</button>
                </div>
                <div className="full flex justify-center items-center">
                    {ativo ? (
                        <span
                            className={`text-green-600 mt-2 transition-all duration-300 ${ativo ? "opacity-100 translate-y-0 text-sm" : "opacity-0 -translate-y-2"
                                }`}
                        >
                            Adicionado!
                        </span>
                    ) : ''}
                </div>
            </div>
        </main>
    )
}
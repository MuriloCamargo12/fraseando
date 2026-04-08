'use client'

import { useContext } from "react"
import { favoritosContext } from "../context/FavoritosContext"

export default function Favoritos() {
    const { favoritos, removerFavorito } = useContext(favoritosContext)!

    function compartilharMsg(frase: string, autor: string) {
        const msg = `"${frase}"\n\n— ${autor}`
        const url = `https://wa.me/?text=${encodeURIComponent(msg)}`

        window.open(url, "_blank")
    }

    return (
        <main className="flex flex-col flex-1 items-center justify-center">
            <div className="flex flex-col md:w-2/5 w-full h-52 bg-gray-200 shadow-lg justify-start p-4 rounded-md text-blue-900 gap-3 overflow-y-auto overflow-x-hidden min-h-0">
                {favoritos.length > 0 ? (
                    favoritos.map((item, index) => (
                        <div
                            key={index}
                            className="text-blue-900 p-3 flex flex-col gap-2 border-b last:border-b-0"
                        >
                            <p className="wrap-break-word">
                                "{item.frase}"
                            </p>

                            <div className="flex justify-end">
                                <span className="wrap-break-word">
                                    - {item.autor}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <button
                                        className="cursor-pointer bg-red-500 px-2 py-1 text-sm rounded-2xl text-white"
                                        onClick={() => removerFavorito(item.frase)}
                                    >
                                        Remover
                                    </button>

                                    <button
                                        className="cursor-pointer bg-green-500 px-2 py-1 text-sm rounded-2xl text-white"
                                        onClick={() => compartilharMsg(item.frase, item.autor)}
                                    >
                                        Compartilhar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500 text-center">
                            Nenhuma frase favorita ainda.
                        </p>
                    </div>
                )}
            </div>
        </main>
    )
}
'use client'
import { useContext, useState } from "react"
import { ConfigContext } from "../context/ConfigContext"

export default function Config() {
    const { traducao, setTraducao } = useContext(ConfigContext)!
    const [ativo, setAtivo] = useState(traducao)
    const [salvo, setSalvo] = useState(false)

    function handleSalvar() {
        setSalvo(true)

        setTimeout(() => {
            setSalvo(false)
        }, 2000)
    }

    return (
        <main className="flex flex-col flex-1 items-center justify-center">
            <div className="w-2/5 flex flex-col justify-center items-center gap-10">
                <h1 className="text-3xl font-bold">Configurações</h1>
                <div className="flex flex-col gap-2">
                    <span>Tradução automática</span>
                    <div className="bg-gray-200 shadow-lg rounded-md">
                        <div className="flex justify-between gap-10 py-2 px-5 md:w-80 w-full text-blue-900">
                            Português (PT-BR)
                            <input type="checkbox" checked={ativo} onChange={() => setAtivo(!ativo)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <button className="bg-blue-900 p-2 rounded-md cursor-pointer" onClick={() => {
                        setTraducao(ativo)
                        handleSalvar()
                    }}>
                    Salvar Configurações
                    </button>
                    {salvo ? (
                        <span
                            className={`text-green-600 mt-2 transition-all duration-300 ${salvo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                                }`}
                        >
                            Configurações salvas!
                        </span>
                    ): ''}
                </div>
            </div>
        </main>
    )
}
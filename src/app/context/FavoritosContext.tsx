'use client'

import { createContext, ReactNode, useEffect, useState } from "react"

interface Favorito {
    frase: string
    autor: string
}

interface FavoritosContext {
    favoritos: Favorito[]
    adicionarFavorito: (item: Favorito) => void
    removerFavorito: (frase: string) => void
}

export const favoritosContext = createContext<FavoritosContext | null>(null)

export default function FavoritosProvider({ children }: { children: ReactNode }) {
    const [favoritos, setFavoritos] = useState<Favorito[]>(() => {
        try {
            const salvo = localStorage.getItem("favoritos")
            return salvo ? JSON.parse(salvo) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos))
    }, [favoritos])

    function removerFavorito(frase: string) {
        setFavoritos((prev) => {
            return prev.filter((item) => item.frase !== frase)
        })
    }

    function adicionarFavorito(item: Favorito) {
        setFavoritos((prev) => {

            if (item.frase === 'Não foi possível carregar a frase.') return prev

            const existe = prev.some(f => f.frase === item.frase)

            if (existe) return prev


            return [...prev, item]
        })
    }

    return (
        <favoritosContext.Provider value={{ favoritos, adicionarFavorito, removerFavorito }}>
            {children}
        </favoritosContext.Provider>
    )
}
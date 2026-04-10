'use client'

import { createContext, ReactNode, useEffect, useState } from "react"

interface TraducaoContextType {
    traducao: boolean
    setTraducao: (value: boolean) => void
}

export const ConfigContext = createContext<TraducaoContextType | null>(null)


export default function ConfigProvider({ children }: { children: ReactNode }) {
    
    const [traducao, setTraducao] = useState(() => {
        try {
            const salvo = localStorage.getItem("traducao")
            return salvo !== null ? JSON.parse(salvo) : false
        } catch {
            return false
        }
    })

    useEffect(() => {
        localStorage.setItem("traducao", JSON.stringify(traducao))
    }, [traducao])


    return (
        <ConfigContext.Provider value={{ traducao, setTraducao }}>
            {children}
        </ConfigContext.Provider>
    )
}
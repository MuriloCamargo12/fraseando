'use client'

import { createContext, ReactNode, useState } from "react"

interface TraducaoContextType {
    traducao: boolean
    setTraducao: (value: boolean) => void
}

export const ConfigContext = createContext<TraducaoContextType | null>(null)


export default function ConfigProvider({children}: {children: ReactNode}) {
    const [traducao, setTraducao] = useState(false)

    return (
        <ConfigContext.Provider value={{traducao, setTraducao}}>
            {children}
        </ConfigContext.Provider>
    )
}
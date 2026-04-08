'use client'
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [ativo, setAtivo] = useState(false)
    return (
        <header className="shadow-lg bg-transparent py-5 backdrop-blur-md flex flex-col items-center justify-center gap-5">
            <div className="flex justify-between w-full px-5 lg:px-0 lg:w-3/5 items-center">
                <div className="text-4xl text-blue-800 font-bold">
                    <Link href={'/'} className="cursor-pointer">
                        Fraseando
                    </Link>
                </div>
                <div className="hidden md:flex gap-10 text-blue-800 font-bold ">
                    <button>
                        <Link href={'/favoritos'}>
                            Favoritos
                        </Link>
                    </button>
                    <button>
                        <Link href={'/config'}>
                            Configurações
                        </Link>
                    </button>
                </div>
                {ativo ? (
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setAtivo(!ativo)}>
                            <IconX size={40} className="text-blue-800" />
                        </button>
                    </div>
                ) : (
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setAtivo(!ativo)} className="cursor-pointer">
                            <IconMenu2 size={40} className="text-blue-800" />
                        </button>
                    </div>
                )}
            </div>
            {ativo ? (
                <div className="text-blue-800 flex flex-col gap-2">
                    <button>
                        <Link href={'/favoritos'}>
                            Favoritos
                        </Link>
                    </button>
                    <button>
                        <Link href={'/config'}>
                            Configurações
                        </Link>
                    </button>
                </div>
            ) : ''}
        </header>
    )
}
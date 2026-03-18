import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/iconSistal.png";
import SupportBox from "../../features/auth/components/SupportBox";

const ListAside = {
    items: [
        {
            title: "Gestión integral de solicitudes",
            description: "Control completo de uniformes y prendas corporativas",
        },
        {
            title: "Seguimiento en tiempo real",
            description: "Rastrea el estado de tus despachos y entregas",
        },
        {
            title: "Servicio postventa integrado",
            description: "Cambios de talla, reposiciones y más",
        },
    ],
};

export default function AuthLayout() {
    return (
        <div className="flex">
            <aside
                className="
          hidden sm:flex flex-col
          relative overflow-hidden
          h-screen w-[500px]
          px-[48px] pt-[48px]
          gap-10
          bg-gradient-to-r from-[#1C398E]/95 via-[#193CB8]/90 to-[#1C398E]/95
        "
            >
                <div className="flex flex-col gap-5 flex-1 min-h-0">
                    <div className="flex flex-col gap-5">
                        <header className="flex gap-4">
                            <div className="container-logo bg-white rounded-2xl">
                                <img src={logo} alt="Support"/>
                            </div>

                            <div>
                                <h3 className="text-white">SISTAL</h3>
                                <p className="text-white"></p>
                            </div>
                        </header>

                        <div className="flex flex-col gap-6">
                            <h1 className="text-white">Sistema de Gestión de Uniformes</h1>
                            <p className="text-white">
                                Administra solicitudes, despachos y postventa de uniformes
                                corporativos desde un solo lugar.
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 flex flex-col justify-between">
                        <div className="flex flex-col gap-6 overflow-y-auto pr-1 flex-1 justify-center">
                            {ListAside.items.map((item, index) => (
                                <div key={index} className="text-white flex gap-2">
                                    <BlueOrb size="24px"/>
                                    <div className="flex flex-col gap-2">
                                        <h5 className="font-bold">{item.title}</h5>
                                        <p className="text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <SupportBox/>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex-1 h-screen">
                <div className="w-full max-w-md min-h-full mx-auto flex flex-col justify-center space-y-6 px-6">
                    <Outlet/>
                </div>
            </main>

        </div>
    );
}

export function BlueOrb({size = 64}) {
    return (
        <div className="relative rounded-full" style={{width: size, height: size}}>
            <div
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,#2F7CF2_0%,#1F5FE8_38%,#0B2E9E_100%)]" />
            <div className="absolute left-1/2 top-1/2 h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8CC7FF]" />
        </div>
    );
}

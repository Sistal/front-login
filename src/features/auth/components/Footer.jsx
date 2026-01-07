import React from "react";
import {QuestionIcon, MailIcon, PhoneIcon} from "./Icons.jsx";
export default function Footer() {
  return (
      <>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                  <div
                      className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                      <QuestionIcon/>
                  </div>

                  <div className="min-w-0 flex flex-col gap-2">
                      <h6 className="text-sm font-semibold text-zinc-900">¿Problemas para acceder?</h6>
                      <p className="mt-1 text-xs text-zinc-600">
                          Contacta al área de soporte o recursos humanos para asistencia
                      </p>

                      <div className="mt-3 space-y-2 text-xs text-zinc-700">
                          <div className="flex items-center gap-2">
                              <MailIcon/>
                              <span className="truncate">soporte.sistal@empresa.cl</span>
                          </div>
                          <div className="flex items-center gap-2">
                              <PhoneIcon/>
                              <span>+56 2 2345 6789 (Anexo 4521)</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="pt-2 text-center text-xs text-zinc-500">
              <div>© 2025 SISTAL — Sistema de Gestión de Uniformes</div>
              <div className="mt-1 text-zinc-400">Todos los derechos reservados</div>
          </div>
      </>
  );
}

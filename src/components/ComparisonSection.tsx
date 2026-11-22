"use client";

import React from "react";
import { Check, X } from "lucide-react";

export function ComparisonSection() {
  const comparisons = [
    {
      label: "Visão dos Extratos",
      traditional: "Extratos espalhados e linhas genéricas sem detalhamento de origem.",
      arcv: "Visão consolidada multi-bancos com rastreabilidade de cada centavo.",
    },
    {
      label: "Conferência de Taxas",
      traditional: "Confiança cega no que os bancos e provedores descontam do saldo.",
      arcv: "Recálculo automático de cada taxa contratada e tarifas bancárias.",
    },
    {
      label: "Fechamento de Caixa",
      traditional: "Dias inteiros perdidos no fim do mês baixando planilhas manuais.",
      arcv: "Livro-caixa conciliado continuamente no piloto automático.",
    },
    {
      label: "Histórico Contábil",
      traditional: "Portais que expiram relatórios após 90 dias, apagando a memória.",
      arcv: "Livro Razão imutável: o histórico financeiro pertence à sua empresa para sempre.",
    },
  ];

  return (
    <section id="comparativo" className="py-24 bg-[#141414] text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-[#F0FD63]/5 blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#F0FD63] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/15">
            <span>Comparativo Direto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            O fim da conciliação no escuro
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Veja a diferença entre o caos das planilhas e a precisão do livro razão:
          </p>
        </div>

        {/* Desktop View: Clean 3-Column Table */}
        <div className="hidden md:block bg-[#1D1D1D] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-xl">
          <div className="grid grid-cols-12 gap-3 pb-3.5 border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <div className="col-span-4 px-2">Critério</div>
            <div className="col-span-4 px-2 text-red-400">Sem o Arcv</div>
            <div className="col-span-4 px-2 text-[#F0FD63]">Com o Arcv</div>
          </div>

          <div className="divide-y divide-white/5 text-xs sm:text-sm">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-3 py-4 items-center hover:bg-white/[0.03] rounded-lg px-2 transition-colors"
              >
                <div className="col-span-4 font-bold text-white text-xs sm:text-sm">
                  {item.label}
                </div>
                <div className="col-span-4 text-gray-400 flex items-start gap-1.5 text-xs">
                  <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item.traditional}</span>
                </div>
                <div className="col-span-4 text-[#1D1D1D] font-bold flex items-start gap-1.5 text-xs bg-[#F0FD63] p-3 rounded-xl border border-[#E2EF4E]">
                  <Check className="w-3.5 h-3.5 text-[#1D1D1D] shrink-0 mt-0.5 stroke-[3]" />
                  <span>{item.arcv}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View: High-Clarity Card Layout (Eliminates Text Cramping) */}
        <div className="md:hidden space-y-4">
          {comparisons.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1D1D1D] rounded-2xl p-4.5 sm:p-5 border border-white/10 shadow-lg space-y-3"
            >
              <div className="font-bold text-white text-base pb-2 border-b border-white/10 flex items-center justify-between">
                <span>{item.label}</span>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded">
                  0{idx + 1}
                </span>
              </div>

              {/* Sem o Arcv */}
              <div className="bg-black/40 rounded-xl p-3 border border-red-500/20 text-xs text-gray-300 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                  <X className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block mb-0.5">
                    Sem o Arcv
                  </span>
                  <span className="leading-relaxed block text-gray-300 text-xs">
                    {item.traditional}
                  </span>
                </div>
              </div>

              {/* Com o Arcv */}
              <div className="bg-[#F0FD63] text-[#1D1D1D] rounded-xl p-3.5 border border-[#E2EF4E] shadow-sm flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#1D1D1D] text-[#F0FD63] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D1D1D]/75 block mb-0.5">
                    Com o Arcv
                  </span>
                  <span className="font-bold text-xs sm:text-sm leading-relaxed text-[#1D1D1D] block">
                    {item.arcv}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

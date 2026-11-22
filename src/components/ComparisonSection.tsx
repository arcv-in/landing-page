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
        <div className="text-center max-w-xl mx-auto mb-14">
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

        {/* Minimal Comparison Table (Dark Card Container #1D1D1D) */}
        <div className="bg-[#1D1D1D] rounded-2xl p-5 sm:p-7 border border-white/10 shadow-xl">
          <div className="grid grid-cols-12 gap-3 pb-3.5 border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <div className="col-span-4 px-2">Critério</div>
            <div className="col-span-4 px-2 text-red-400">Sem o Arcv</div>
            <div className="col-span-4 px-2 text-[#F0FD63]">Com o Arcv</div>
          </div>

          <div className="divide-y divide-white/5 text-xs sm:text-sm">
            {comparisons.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 gap-3 py-3.5 items-center hover:bg-white/[0.03] rounded-lg px-2 transition-colors"
              >
                <div className="col-span-4 font-bold text-white text-xs sm:text-sm">
                  {item.label}
                </div>
                <div className="col-span-4 text-gray-400 flex items-start gap-1.5 text-xs">
                  <X className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>{item.traditional}</span>
                </div>
                <div className="col-span-4 text-[#1D1D1D] font-bold flex items-start gap-1.5 text-xs bg-[#F0FD63] p-2.5 rounded-xl border border-[#E2EF4E]">
                  <Check className="w-3.5 h-3.5 text-[#1D1D1D] shrink-0 mt-0.5 stroke-[3]" />
                  <span>{item.arcv}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

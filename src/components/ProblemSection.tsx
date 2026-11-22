"use client";

import React from "react";
import { Split, Clock, RefreshCcw } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: Split,
      title: "Múltiplos bancos e canais",
      description:
        "Pix, boletos, TEDs e maquininhas espalhados em contas diferentes. O Arcv centraliza todos os extratos em um único fluxo.",
    },
    {
      icon: RefreshCcw,
      title: "Divergências de caixa",
      description:
        "Valores que entram ou saem sem identificação clara de origem. O Arcv casa cada lançamento bancário com a transação real.",
    },
    {
      icon: Clock,
      title: "Fim das planilhas manuais",
      description:
        "Chega de perder horas no final do mês cruzando extratos e relatórios em PDF. Seu livro-caixa fecha no piloto automático.",
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#141414] text-white border-t border-white/10 relative overflow-hidden">
      {/* Ambient Neon Accent Glow in Dark */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#F0FD63]/10 blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#F0FD63] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/15">
            <span>Sem Complicação</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            O fim do caos financeiro
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Três gargalos que drenam o tempo e o lucro da sua empresa resolvidos de forma definitiva:
          </p>
        </div>

        {/* 3 Dark Cards (High Contrast #1D1D1D with Neon #F0FD63 Icons) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#1D1D1D] rounded-2xl p-7 border border-white/10 shadow-lg hover:border-[#F0FD63]/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#F0FD63] text-[#1D1D1D] flex items-center justify-center font-bold mb-5 shadow-sm group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-[#1D1D1D]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

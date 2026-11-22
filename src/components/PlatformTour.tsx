"use client";

import React from "react";
import { IsoPillarAsset, PillarAssetVariant } from "./IsometricAssets";

export function PlatformTour() {
  const pillars: {
    variant: PillarAssetVariant;
    tag: string;
    title: string;
    description: string;
  }[] = [
    {
      variant: "cloud",
      tag: "Conexão Multi-Canal",
      title: "Conectividade Universal",
      description:
        "Conecte contas bancárias PJ, gateways de pagamento, maquininhas e seu ERP em minutos. Todos os canais em um só lugar.",
    },
    {
      variant: "server",
      tag: "Matcher Inteligente",
      title: "Conciliação em 3 Vias",
      description:
        "Cruzamento matemático entre a venda, a confirmação do provedor e o extrato bancário oficial. Sem saldos fantasmas.",
    },
    {
      variant: "hologram",
      tag: "Auditoria Contratual",
      title: "Auditoria de Tarifas",
      description:
        "Validação de taxas cobradas vs. contratadas. Identifique custos ocultos e divergências de centavos automaticamente.",
    },
    {
      variant: "ledger",
      tag: "Partidas Dobradas",
      title: "Livro Razão Soberano",
      description:
        "Cada movimentação arquivada em partidas dobradas definitivas. O histórico financeiro pertence à sua empresa para sempre.",
    },
  ];

  return (
    <section id="pilares" className="py-24 bg-[#F3F3F3] border-t border-gray-200/80 relative overflow-hidden">
      {/* Ambient Yellow/Lime Glow (#F0FD63) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 pointer-events-none -z-0">
        <div className="absolute top-0 left-1/3 w-80 h-80 rounded-full bg-[#F0FD63]/30 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          {/* Pill Badge in Signature Neon #F0FD63 */}
          <div className="inline-flex items-center gap-1.5 bg-[#F0FD63] text-[#1D1D1D] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-[#E2EF4E] shadow-xs">
            <span>Pilares da Plataforma</span>
          </div>

          {/* Heading with Neon Marker Accent */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1D1D1D] tracking-tight mt-3">
            Como o Arcv{" "}
            <span className="relative inline-block">
              <span className="relative z-10">protege o seu caixa</span>
              <span
                className="absolute left-0 bottom-1 w-full h-3 bg-[#F0FD63] -z-0 rounded-sm"
                style={{ transform: "rotate(-1deg)" }}
              />
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Quatro camadas integradas para garantir que cada entrada e saída seja devidamente auditada.
          </p>
        </div>

        {/* 4 Cards with Bespoke Micro 3D Isometric Assets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs hover:border-[#F0FD63] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Micro 3D Isometric Animated Asset */}
                <div className="mb-3 -ml-2">
                  <IsoPillarAsset variant={item.variant} />
                </div>

                <span className="inline-block text-[10px] font-bold text-[#1D1D1D] bg-[#F0FD63]/30 border border-[#F0FD63]/60 px-2 py-0.5 rounded-full mb-2">
                  {item.tag}
                </span>

                <h3 className="font-bold text-base text-[#1D1D1D] mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

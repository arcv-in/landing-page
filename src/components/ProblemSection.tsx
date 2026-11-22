"use client";

import React from "react";
import Image from "next/image";
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

  const acquirers = [
    { name: "Cielo", logo: "/logos/acquirers/cielo.png" },
    { name: "Rede", logo: "/logos/acquirers/rede.png" },
    { name: "Stone", logo: "/logos/acquirers/stone.png" },
    { name: "PagBank", logo: "/logos/acquirers/pagbank.png" },
    { name: "Getnet", logo: "/logos/acquirers/getnet.png" },
    { name: "Mercado Pago", logo: "/logos/acquirers/mercadopago.png" },
    { name: "InfinitePay", logo: "/logos/acquirers/infinitepay.png" },
    { name: "SafraPay", logo: "/logos/acquirers/safrapay.png" },
    { name: "Asaas", logo: "/logos/acquirers/asaas.png" },
    { name: "Adyen", logo: "/logos/acquirers/adyen.png" },
    { name: "EBANX", logo: "/logos/acquirers/ebanx.png" },
  ];

  const banks = [
    { name: "Itaú Empresas", logo: "/logos/banks/itau.png" },
    { name: "Bradesco Empresas", logo: "/logos/banks/bradesco.png" },
    { name: "Banco do Brasil", logo: "/logos/banks/bb.png" },
    { name: "Santander Empresas", logo: "/logos/banks/santander.png" },
    { name: "Nubank PJ", logo: "/logos/banks/nubank.png" },
    { name: "Inter Empresas", logo: "/logos/banks/inter.png" },
    { name: "C6 Bank Empresas", logo: "/logos/banks/c6.png" },
    { name: "BTG Pactual Empresas", logo: "/logos/banks/btg.png" },
    { name: "Cora PJ", logo: "/logos/banks/cora.png" },
    { name: "Sicoob", logo: "/logos/banks/sicoob.png" },
    { name: "Sicredi", logo: "/logos/banks/sicredi.png" },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-[#141414] text-white border-t border-white/10 relative overflow-hidden scroll-mt-20">
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

      {/* Dual Infinite Carousels: Acquirers (rotating right) & Banks/Fintechs PJ (rotating left) */}
      <div className="mt-20 pt-14 border-t border-white/10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/5 text-[#F0FD63] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F0FD63]" />
            <span>Conectividade Multi-Canais</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Auditoria contínua em todos os seus provedores
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
            Conciliação em tempo real com as principais credenciadoras, gateways de cartão, bancos tradicionais e fintechs PJ do Brasil.
          </p>
        </div>

        <div className="space-y-6">
          {/* Top Marquee: Adquirentes (girando para a direita) */}
          <div className="space-y-2">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F0FD63]" />
                Adquirentes & Gateways de Cartão
              </span>
              <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">
                Liquidações & Taxas MDR
              </span>
            </div>

            <div className="relative w-full overflow-hidden py-1">
              {/* Fade masks */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#141414] to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#141414] to-transparent z-10" />

              <div className="animate-marquee-right flex gap-3 sm:gap-4 items-center">
                {[...acquirers, ...acquirers].map((item, idx) => (
                  <div
                    key={`acq-${idx}`}
                    className="w-36 sm:w-44 h-16 sm:h-18 rounded-2xl bg-[#1D1D1D]/90 hover:bg-[#252525] border border-white/10 hover:border-[#F0FD63]/40 transition-all flex items-center justify-center p-3 shrink-0 shadow-sm group cursor-default"
                    title={item.name}
                  >
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={140}
                      height={48}
                      className="max-h-9 sm:max-h-10 max-w-[115px] sm:max-w-[135px] w-auto h-auto object-contain filter group-hover:scale-105 group-hover:brightness-110 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Marquee: Bancos e Fintechs PJ (girando para a esquerda) */}
          <div className="space-y-2">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-gray-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Bancos Tradicionais & Contas PJ
              </span>
              <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">
                Open Finance Oficial & Extratos OFX/API
              </span>
            </div>

            <div className="relative w-full overflow-hidden py-1">
              {/* Fade masks */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#141414] to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#141414] to-transparent z-10" />

              <div className="animate-marquee-left flex gap-3 sm:gap-4 items-center">
                {[...banks, ...banks].map((item, idx) => (
                  <div
                    key={`bank-${idx}`}
                    className="w-36 sm:w-44 h-16 sm:h-18 rounded-2xl bg-[#1D1D1D]/90 hover:bg-[#252525] border border-white/10 hover:border-[#F0FD63]/40 transition-all flex items-center justify-center p-3 shrink-0 shadow-sm group cursor-default"
                    title={item.name}
                  >
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={140}
                      height={48}
                      className="max-h-9 sm:max-h-10 max-w-[115px] sm:max-w-[135px] w-auto h-auto object-contain filter group-hover:scale-105 group-hover:brightness-110 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

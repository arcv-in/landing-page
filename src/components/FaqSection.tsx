"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "O Arcv substitui o meu ERP financeiro?",
      answer:
        "Não, ele potencializa o seu ERP. O Arcv faz todo o trabalho pesado de conciliação multi-bancos e entrega os lançamentos limpos e validados para o seu sistema contábil ou ERP.",
    },
    {
      question: "Quais bancos e canais de pagamento são suportados?",
      answer:
        "Integramos via Open Finance oficial com todos os grandes bancos (Itaú, Bradesco, Banco do Brasil, Santander, Inter, Nubank PJ, etc.) além das principais credenciadoras e gateways de pagamento do país.",
    },
    {
      question: "Como o Arcv impede saldos duplicados nos meus relatórios?",
      answer:
        "O Arcv reconhece a natureza contábil de cada operação: créditos bancários que correspondem a liquidações são tratados como baixa de ativos existentes, garantindo que seu saldo real nunca seja inflado.",
    },
    {
      question: "Dá muito trabalho para configurar na minha empresa?",
      answer:
        "Leva menos de 10 minutos. Você só precisa conectar suas contas bancárias e canais com autorização segura. O sistema começa a auditar no mesmo dia.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#141414] text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 text-[#F0FD63] px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-white/15">
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
            Perguntas Frequentes
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Tudo o que você precisa saber sobre a segurança e operação do Arcv.
          </p>
        </div>

        {/* Taller, more spacious accordion rows with smooth touch targets */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#1D1D1D] overflow-hidden transition-all hover:border-white/20"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-5 sm:px-8 py-5 sm:py-6.5 min-h-[72px] sm:min-h-[82px] text-left font-bold text-sm sm:text-lg text-white flex items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 sm:w-5 h-4 sm:h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#F0FD63]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-8 pb-6 pt-4 text-xs sm:text-base text-gray-300 leading-relaxed border-t border-white/10 bg-[#171717]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
